import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderitemSchema = new Schema({
  weight: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  qty: Number,
  _product: { type: ObjectId, ref: 'Product' },
  _buyer: { type: ObjectId, ref: 'User' },
  _order: { type: ObjectId, ref: 'Order' },
  cuid: { type: 'String', required: true },
});

export default mongoose.model('OrderItem', orderitemSchema);
