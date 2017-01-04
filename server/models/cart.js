import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const cartitems = new Schema({
  product_id: { type: ObjectId, ref: 'Product' },
  product_amt: {type: 'Number', default: 0},
  qty: Number
});


const cartSchema = new Schema({
  user: { type: ObjectId, ref: 'User' },
  cuid: { type: 'String', required: true },
  total_price: {type: 'Number', default: 0},
  total_qty: {type: 'Number', default: 0},
  total_weight: {type: 'Number', default: 0},
  cartitems: [cartitems]
});

export default mongoose.model('Cart', cartSchema);
