import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
import Product from '../models/product';
import OrderItem from '../models/orderitem';
import autoIncrement from 'mongoose-auto-increment';

// delivery_method = ['Hentemat', 'Sendemat', 'Budmat']

// const orderItems = new Schema({
//   price: Number,
//   qty: Number,
//   productId: [{ type: ObjectId, ref: 'Product' }],
// });

const slotSchema = new Schema({
  start_time: { type: 'String', required: true },
  end_time: { type: 'String', required: true },
  start_day: { type: 'String', required: true },
  end_day: String
});

const orderSchema = new Schema({
  _buyer: { type: Schema.ObjectId, ref: 'User' },
  cuid: { type: 'String', required: true },
  delivery_method: { type: 'String' },
  shipment_price: { type: Number },
  amount: { type: 'String' },
  delivery_date: { type: 'Date' },
  orderitems: [{ type: Schema.ObjectId, ref: 'OrderItem' }],
  products: [{ type: Schema.ObjectId, ref: 'Product' }],
  purchase_order: { type: Schema.ObjectId, ref: 'PurchaseOrder' },
  // payment: { type: Schema.ObjectId, ref: 'Payment' },
  total_weight: { type: Number, default: 0 },
  total_qty: { type: Number, default: 0 },
  total_amount: { type: Number, default: 0 },
  food_vat_value: { type: Number, default: 0 },
  shipment_vat_value: { type: Number, default: 0 },
  price_with_ship: { type: Number, default: 0 },
  vat: { type: Number, default: 0 },
  address: {
    email: { type: 'String' },
    first_name: { type: 'String' },
    last_name: { type: 'String' },
    co: { type: 'String' },
    postal_code: { type: 'String' },
    city: { type: 'String' },
    line1: { type: 'String' },
    country: { type: 'String' },
    phone_num: { type: 'String' }
  },
  payment_status: { type: 'String' },
  after_payment_status: { type: 'String',default: 'Received' },
  packages: [{ type: Schema.ObjectId, ref: 'Package' }],
  payment_transaction_id: { type: 'String' },
  charge_id: { type: 'String' },
  timeslot: [slotSchema]
});

import serverConfig from '../config';
const connection = mongoose.createConnection(serverConfig.mongoURL);

autoIncrement.initialize(connection);

orderSchema.plugin(autoIncrement.plugin, {
    model: 'Order',
    field: 'orderId',
    startAt: 100000
});

orderSchema.post('save', function(order) {
  Product.update({_id: {"$in": order.products }}, { $pushAll: {orders: [order] }}, {multi: true}, function(err) {
  });
});

export default mongoose.model('Order', orderSchema);
