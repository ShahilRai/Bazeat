import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// const orderItems = new Schema({
//   price: Number,
//   qty: Number,
//   productId: [{ type: ObjectId, ref: 'Product' }],
// });

const orderSchema = new Schema({
  order_status: { type: 'String' },
  order_date: { type: 'Date' },
  _buyer: ObjectId,
  cuid: { type: 'String', required: true },
  delivery_method: { type: 'String' },
  shipment_price: { type: 'String' },
  order_sum: { type: 'String' },
  delivery_date: { type: 'Date' },
  orderitems: [{ type: Schema.ObjectId, ref: 'OrderItem' }],
  status: { type: Number, default: 0 },
  total_weight: { type: Number, default: 0 },
  vat: { type: Number, default: 0 }
});

export default mongoose.model('Order', orderSchema);
