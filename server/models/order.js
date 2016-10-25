import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// const orderItems = new Schema({
//   price: Number,
//   qty: Number,
//   productId: [{ type: ObjectId, ref: 'Product' }],
// });

const orderSchema = new Schema({
  orderStatus: { type: 'String' },
  orderDate: { type: 'Date' },
  _buyer: ObjectId,
  cuid: { type: 'String', required: true },
  deliveryMethod: { type: 'String' },
  shipmentPrice: { type: 'String' },
  orderSum: { type: 'String' },
  deliveryDate: { type: 'Date' },
  orderitems: [{ type: Schema.ObjectId, ref: 'OrderItem' }],
  status: { type: Number, default: 0 }
});

export default mongoose.model('Order', orderSchema);
