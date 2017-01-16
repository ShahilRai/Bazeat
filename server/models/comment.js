import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  comment: { type: String},
  review: { type: Schema.ObjectId, ref: 'Review' }},
  {
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
  }
);

module.exports = mongoose.model('Comment', commentSchema);
