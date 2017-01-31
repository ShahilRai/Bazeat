import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import User from '../models/user';

const ratingandreviewSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User'}]},
  { timestamps: true }
);

export default mongoose.model('RatingAndReview', ratingandreviewSchema);
