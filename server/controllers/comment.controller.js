import  RatingAndReview from '../models/ratingandreview'
import  Review from '../models/review'
import  Comment from '../models/comment'
import  User from '../models/user'


export function allReviews(req, res, next) {
  User.findOne({ email: req.query.email }).exec((err, user) => {
    RatingAndReview.find({ participants: user._id })
      .select('_id')
      .exec(function(err, reviews) {
        if (err) {
          res.send({ error: err });
          return next(err);
        }
        // Set up empty array to hold conversations + most recent message
        let fullReviews = [];
        reviews.forEach(function(review) {
          Review.find({ 'rating_and_review_id': review._id })
            .sort('-createdAt')
            .populate({
              path: 'reviewed_by',
              select: 'full_name'
            })
            .populate({
              path: 'reviewed_for',
              select: 'full_name'
            })
            .populate({
              path: 'comment',
              select: 'comment'
            })
            .exec(function(err, review1) {
              if (err) {
                res.send({ error: err });
                return next(err);
              }
              fullReviews.push(review1);
              if(fullReviews.length === reviews.length) {
                return res.status(200).json({ reviews: fullReviews });
              }
            });
        });
    });
  });
}


export function getReview(req, res, next) {
  Review.find({ rating_and_review_id: req.params.review_id })
    .select('createdAt comment rating reviewed_by reviewed_for')
    .sort('-createdAt')
    .populate({
      path: 'reviewed_by',
      select: 'full_name'
    })
    .populate({
      path: 'reviewed_for',
      select: 'full_name'
    })
    .populate({
      path: 'comment',
      select: 'comment'
    })
    .exec(function(err, reviews) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }
      res.status(200).json({reviews });
    });
}


export function newReview(req, res, next) {
   if(!req.params.reviewed_for) {
    res.status(422).send({ error: 'Please choose a valid recipient for your message.' });
    return next();
  }
  if(!req.body.review_body) {
    res.status(422).send({ error: 'Please enter a comment.' });
    return next();
  }
  User.findOne({ email: req.body.email }).exec((err, user) => {
    const rating_and_review = new RatingAndReview({
      participants: [user._id, req.params.reviewed_for]
    });
    rating_and_review.save(function(err, newRatingAndReview) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }
      const review = new Review({
        conversation_id: newRatingAndReview._id,
        review: req.body.review_body,
        reviewed_by: user._id,
        reviewed_for: req.params.reviewed_for,
        rating: req.body.rating
      });

      review.save(function(err, newReview) {
        if (err) {
          res.send({ error: err });
          return next(err);
        }

        res.status(200).json({ message: 'Review submitted'});
        return next();
      });
    });
  });
}

export function sendReply(req, res, next) {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    const comment = new Comment({
      comment: req.body.comment_body,
      review: req.body.review_id ,
    });
    comment.save(function(err, newComment) {
      if (err) {
        res.send({ error: err });
      }
      else{
        Review.findOneAndUpdate({ _id: req.body.review_id }, {$set: {is_replied: true, comment: comment._id}}, {new: true}).exec((err, comment) => {
          if (err){
            return res.status(500).send(err);
          }
          else{
            res.status(200).json({ comment });
          }
        });
      }
    });
  })
}
