import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderItems = new Schema({
  price: Number,
  qty: Number,
  productId: ObjectId,
  authorId: ObjectId
});

const orderSchema = new Schema({
  orderStatus: { type: 'String' },
  orderDate: { type: 'Date' },
  userId: ObjectId,
  cuid: { type: 'String', required: true },
  deliveryMethod: { type: 'String' },
  shipmentPrice: { type: 'String' },
  orderSum: { type: 'String' },
  deliveryDate: { type: 'Date' },
  orderitems: [orderItems],
  // meta: { price: 'String', quantity: 'Number'},
});

export default mongoose.model('Order', orderSchema);
