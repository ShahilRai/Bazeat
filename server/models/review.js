import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  rating_and_review_id: { type: Schema.Types.ObjectId, required: true },
  review: { type: String, required: true },
  rating: { type: Number },
  reviewed_by: { type: Schema.Types.ObjectId, ref: 'User' },
  comment: { type: Schema.ObjectId, ref: 'Comment' },
  is_replied: { type: Boolean, default: false },
  reviewed_for: { type: Schema.Types.ObjectId, ref: 'User' }},
  {
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
  }
);
module.exports = mongoose.model('Review', reviewSchema);