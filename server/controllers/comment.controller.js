import  RatingAndReview from '../models/ratingandreview'
import  Review from '../models/review'
import  Comment from '../models/comment'
import  User from '../models/user'


export function allReviews(req, res, next) {
  let per_page = parseInt(req.query.per_page, 5);
  let off_set = parseInt(req.query.off_set, 5);
  User.findOne({ email: req.query.email }).exec((err, user) => {
    Review.find({reviewed_for: user._id}).exec(function(err,reviews){
      Review.find({reviewed_for: user._id})
        .sort("-createdAt").limit(per_page).skip(off_set)
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
      .exec(function(err, review1){
        if (err) {
          return res.status(500).send(err);
        }
        return res.json({reviews: review1, total_count: reviews.length  });
        ;
      });
    })
  });
}


export function getReview(req, res, next) {
  if(!req.params.review_id) {
    res.status(422).send({ error: 'Send valid review id.' });
    return next();
  }
  Review.find({ rating_and_review_id: req.params.review_id })
    .select('createdAt comment rating reviewed_by reviewed_for')
    .sort('-createdAt')
    .limit(2)
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
   if(!req.query.reviewed_for) {
    res.status(422).send({ error: 'Please choose a valid recipient for your message.' });
    return next();
  }
  if(!req.body.review_body) {
    res.status(422).send({ error: 'Please enter a comment.' });
    return next();
  }
  User.findOne({ email: req.body.email }).exec((err, user) => {
    const rating_and_review = new RatingAndReview({
      participants: [user._id, req.query.reviewed_for]
    });
    rating_and_review.save(function(err, newRatingAndReview) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }
      const review = new Review({
        rating_and_review_id: newRatingAndReview._id,
        review: req.body.review_body,
        reviewed_by: user._id,
        reviewed_for: req.query.reviewed_for,
        rating: req.body.rating
      });
      review.save(function(err, newReview) {
        if (err) {
          res.send({ error: err });
          return next(err);
        }
         Review.find({reviewed_for: newReview.reviewed_for}, function(err, model) {
          let total_count = model.length
          let reviews = model
          avg_ratings(reviews, null, total_count, res)
        })
      });
    });
  });
}


export function avg_ratings(reviews, next, total_count, res){
  let total_rating = 0
  reviews.forEach(function(item, index) {
      let avg_rating = 0
      total_rating += item.rating
      avg_rating = (total_rating/total_count)
      User.findOneAndUpdate({_id: item.reviewed_for}, {$set: {'avg_ratings': avg_rating}}, {new: true}).
      exec(function(err) {
        if (reviews.length == index+1){
          return res.status(200).json({ message: 'Rating Submitted'});
        }
      })
  })
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
