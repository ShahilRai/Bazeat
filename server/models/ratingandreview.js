import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import User from '../models/user';
import Review from '../models/review';

const ratingandreviewSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  _review: { type: Schema.Types.ObjectId, ref: 'Review'}},
  { timestamps: true }
);

export default mongoose.model('RatingAndReview', ratingandreviewSchema);
