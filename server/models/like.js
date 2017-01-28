import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import User from '../models/user';
import Product from '../models/product';

const likeSchema = new Schema({
  _product: { type: Schema.ObjectId, ref: 'Product' },
  _liker: { type: Schema.ObjectId, ref: 'User' },
  cuid: { type: 'String' }
}, {
    timestamps: true
  }
);

export default mongoose.model('Like', likeSchema);
