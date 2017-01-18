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
              select: 'full_name photo'
            })
            .populate({
              path: 'reviewed_for',
              select: 'full_name photo'
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
                console.log('reviewsfullReviews')
                console.log(fullReviews)
                return res.status(200).json({fullReviews });
              }
            });
        });
    });
  });
}


export function getReview(req, res, next) {
  Review.find({ rating_and_review_id: req.query.review_id })
    .select('createdAt comment rating reviewed_by reviewed_for')
    .sort('-createdAt')
    .populate({
      path: 'reviewed_by',
      select: 'full_name photo'
    })
    .populate({
      path: 'reviewed_for',
      select: 'full_name photo'
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
      return res.json({ reviews: reviews });
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
      console.log('newRatingAndReview')
      console.log(newRatingAndReview)
      const review = new Review({
        rating_and_review_id: newRatingAndReview._id,
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
        return res.json({ review: newReview });
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
        Review.findOneAndUpdate({ _id: req.body.review_id }, {$set: {is_replied: true, comment: comment._id}}, {new: true}).exec((err, review) => {
          if (err){
            return res.status(500).send(err);
          }
          else{
          return res.json({ comment: newComment });
          }
        });
      }
    });
  })
}
