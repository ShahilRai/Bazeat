import mongoose from 'mongoose';
import PurchaseOrder from '../models/purchaseorder';
import  RatingAndReview from '../models/ratingandreview'
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  rating_and_review_id: { type: Schema.Types.ObjectId, required: true },
  review: { type: String, required: true },
  rating: { type: Number },
  reviewed_by: { type: Schema.Types.ObjectId, ref: 'User' },
  _purhase_order: { type: Schema.Types.ObjectId, ref: 'PurchaseOrder' },
  comment: { type: Schema.ObjectId, ref: 'Comment'},
  is_reviewed: { type: Boolean, default: false },
  unread: { type: Boolean, default: true },
  is_commented: { type: Boolean, default: false },
  reviewed_for: { type: Schema.Types.ObjectId, ref: 'User' }},
  { timestamps: true }
);

reviewSchema.post('save', function(review) {
  RatingAndReview.findByIdAndUpdate(review.rating_and_review_id, {$set: {_review: review._id}} , function(err, model) {
  })
  PurchaseOrder.findByIdAndUpdate(review._purhase_order, {$set: {is_reviewed: true}} , function(err, model) {
  })
});
module.exports = mongoose.model('Review', reviewSchema);
