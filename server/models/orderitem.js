import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderitemSchema = new Schema({
  product_weight: { type: Number, default: 0 },
  product_price: { type: Number, default: 0 },
  product_qty:   { type: Number },
  _product: { type: ObjectId, ref: 'Product' },
  _buyer: { type: ObjectId, ref: 'User' },
  _order: { type: ObjectId, ref: 'Order' },
  cuid: { type: 'String', required: true },
  packages: [{ type: Schema.ObjectId, ref: 'Package' }],
  packed_qty: { type: 'Number', default: 0 }
});

export default mongoose.model('OrderItem', orderitemSchema);
