import  RatingAndReview from '../models/ratingandreview'
import  Review from '../models/review'
import  Comment from '../models/comment'
import  User from '../models/user'

export function allReviews(req, res, next) {
  // console.log(req.query)
  // console.log(req.query)
  User.findOne({ email: req.query.email }).exec((err, user) => {
    RatingAndReview.find({ participants: user._id })
    .select('_id')
    .exec(function(err, reviews) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }
      else{
        if(reviews.length > 0){
          let fullReviews = [];
          reviews.forEach(function(review) {
            Review.find({ 'rating_and_review_id': review._id })
              .sort('-createdAt')
              .limit(5)
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
                  return res.status(200).json({fullReviews });
                }
              });
          });
        }
        else{
          return res.status(200).json({msg: "No reviews to show" });
        }
      }
    });
  });
}



export function getReview(req, res, next) {
  let per_page = parseInt(req.query.per_page);
  let off_set = (parseInt(req.query.off_set) * per_page) ;
  User.findOne({ email: req.query.email }).exec((err, user) => {
    Review.find({reviewed_for: user._id}).exec(function(err,reviews){
      Review.find({reviewed_for: user._id})
        .sort("-createdAt").limit(per_page).skip(off_set)
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
      .exec(function(err, review1){
        if (err) {
          return res.status(422).send(err);
        }
        return res.json({reviews: review1, total_count: reviews.length  });
        ;
      });
    })
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
      console.log('newRatingAndReview')
      console.log(newRatingAndReview)
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
          avg_ratings(reviews, newReview, null, total_count, res)
        })
      });
    });
  });
}


export function avg_ratings(reviews, newReview, next, total_count, res){
  let total_rating = 0
  reviews.forEach(function(item, index) {
      let avg_rating = 0
      total_rating += item.rating
      avg_rating = (total_rating/total_count)
      console.log('avg_rating')
      console.log(avg_rating)
      User.findOneAndUpdate({_id: item.reviewed_for}, {$set: {'avg_ratings': avg_rating}}, {new: true}).
      exec(function(err, model) {
        if (reviews.length == index+1){
          return res.status(200).json({newReview});
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
        Review.findOneAndUpdate({ _id: req.body.review_id }, {$set: {is_replied: true, comment: comment._id}}, {new: true}).exec((err, review) => {
          if (err){
            return res.status(422).send(err);
          }
          else{
          return res.json({ comment: newComment });
          }
        });
      }
    });
  })
}
