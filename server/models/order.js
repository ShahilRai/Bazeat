import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
import Product from '../models/product';
import OrderItem from '../models/orderitem';

// delivery_method = ['Hentemat', 'Sendemat', 'Budmat']

// const orderItems = new Schema({
//   price: Number,
//   qty: Number,
//   productId: [{ type: ObjectId, ref: 'Product' }],
// });

const orderSchema = new Schema({
  _buyer: ObjectId,
  cuid: { type: 'String', required: true },
  delivery_method: { type: 'String' },
  shipment_price: { type: 'String' },
  amount: { type: 'String' },
  delivery_date: { type: 'Date' },
  orderitems: [{ type: Schema.ObjectId, ref: 'OrderItem' }],
  products: [{ type: Schema.ObjectId, ref: 'Product' }],
  purchase_order: { type: Schema.ObjectId, ref: 'PurchaseOrder' },
  // payment: { type: Schema.ObjectId, ref: 'Payment' },
  total_weight: { type: Number, default: 0 },
  total_amount: { type: Number, default: 0 },
  vat: { type: Number, default: 0 },
  address: {
    email: { type: 'String' },
    first_name: { type: 'String' },
    last_name: { type: 'String' },
    co: { type: 'String' },
    post_code: { type: 'String' },
    city: { type: 'String' },
    line1: { type: 'String' },
    country: { type: 'String' },
    phone_num: { type: 'String' }
  },
  payment_status: { type: 'String' }
});




orderSchema.post('save', function(order) {
  Product.update({_id: {"$in": order.products }}, { $pushAll: {orders: [order] }}, {multi: true}, function(err) {
  });
//   OrderItem.find(
//  { _order: order._id, total_products: { $sum: "$price" } }
//  ,

//  // OrderItem.aggregate(
//  //  { $project: {
//  //    _order: order._id
//  //  }},
//  //  { $group: {
//  //      _id: '$_order',
//  //      total: { $sum: "$price" }
//  //    }
//  //  },
//  function (err, res) {
//  // if (err) return handleError(err);
//  console.log(res);
//  }
// );

});

export default mongoose.model('Order', orderSchema);
