import  RatingAndReview from '../models/ratingandreview'
import  Review from '../models/review'
import  Comment from '../models/comment'
import  User from '../models/user'
import  Order from '../models/order'
import  Product from '../models/product'
import * as MailService from '../services/mailer';
import * as MessageService from '../services/twillio';

export function allReviews(req, res, next) {
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
                select: 'full_name photo cuid'
              })
              .populate({
                path: 'reviewed_for',
                select: 'full_name photo cuid'
              })
              .populate({
                path: 'comment',
                select: 'comment is_commented'
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
  let data = {};
  if(req.query.cuid) {
    data.cuid = req.query.cuid;
  }
  if(req.query.email) {
    data.email = req.query.email;
  }
  User.findOne(data).exec((err, user) => {
    Review.find({reviewed_for: user._id}).exec(function(err,reviews){
      Review.find({reviewed_for: user._id})
        .sort("-createdAt").limit(per_page).skip(off_set)
        .populate({
          path: 'reviewed_by',
          select: 'full_name photo cuid'
        })
        .populate({
          path: 'reviewed_for',
          select: 'full_name photo cuid'
        })
        .populate({
          path: 'comment',
          select: 'comment is_commented'
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
      const review = new Review({
        rating_and_review_id: newRatingAndReview._id,
        body: req.body.review_body,
        reviewed_by: user._id,
        reviewed_for: req.query.reviewed_for,
        is_reviewed: req.body.is_reviewed,
        rating: req.body.rating
      });
      review.save(function(err, newReview) {
        if (err) {
          res.send({ error: err });
          return next(err);
        }
        MailService.review_email(newReview, user)
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
  let avg_rating = 0
  reviews.forEach(function(item, index) {
      total_rating += item.rating
      avg_rating = (total_rating/total_count)
      User.findOneAndUpdate({_id: item.reviewed_for}, {$set: {'avg_rating': avg_rating}}, {new: true}).
      exec(function(err, user) {
        if (reviews.length == index+1){
          user.reviews_count = total_count
          user.save();
          return res.status(200).json({newReview});
        }
      })
  })
}


export function sendReply(req, res, next) {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    const comment = new Comment({
      body: req.body.comment_body,
      review: req.body.review_id ,
      is_commented: req.body.is_commented
    });
    comment.save(function(err, newComment) {
      if (err) {
        res.send({ error: err });
      }
      else{

        Review.findOneAndUpdate({_id: req.body.review_id}, {$set: {'comment': comment._id, is_commented: req.body.is_commented}}, {new: true}).
        exec(function(err, model) {
        MailService.replied_review_mail(newComment, model, user)
      })
        return res.json({ comment: newComment });
      }
    });
  })
}

export function reviewUserList(req, res){
  User.findOne({ email: req.query.email }).exec((err, user) => {
    Order.find({_buyer: user._id}).select("products").exec((err, products) => {
      let products_arr = []
      let producer_arr = []
      products.forEach(function(item, index1) {
        products_arr.push(item.products[0])
        if(products.length == index1+1){
          Product.find({_id: {"$in": products_arr }}).populate("_producer").exec((err, producer)=>{
            if(producer){
              producer.forEach(function(item, index) {
                Review.find({reviewed_for: item._producer._id, is_reviewed: true}).exec((err,review) =>{
                  if(review.length == 0){
                    producer_arr.push(item._producer)
                  }
                  if(producer.length == index+1){
                    return res.json({producer_arr});
                  }
                })
              })
            }
          })
        }
      })
    });
  });
}

export function reviewsCount(req,res){
  User.findOne({ email: req.query.email }).exec((err, user) => {
    RatingAndReview.find({ participants: user._id })
      .sort('-updatedAt')
      .limit(2)
      .select('_id')
      .exec(function(err, ratingreviews) {
        if (err) {
          res.send({ error: err });
          return next(err);
        }
        let fullReviews = [];
        ratingreviews.forEach(function(ratingreview, index) {
          Review.find({ 'rating_and_review_id': ratingreview._id, reviewed_for: user._id, is_reviewed: true})
            .sort('-createdAt')
            .limit(1)
            .populate({
              path: 'reviewed_by',
              select: 'full_name photo cuid'
            })
            .populate({
              path: 'reviewed_for',
              select: 'full_name photo cuid'
            })
            .populate({
              path: 'comment',
              select: 'comment is_commented'
            })
            .exec(function(err, review) {
              if (err) {
                res.send({ error: err });
                return next(err);
              }if(review.length>0){
                fullReviews.push(review);
              }
              if(index+1 === ratingreviews.length) {
                return res.status(200).json({ reviews: fullReviews });
              }
            });
        });
    });
  });
}
