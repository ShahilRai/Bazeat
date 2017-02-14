import mongoose from 'mongoose';
import User from '../models/user';
import Product from '../models/product';
import Order from '../models/order';
import Review from '../models/review';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const purchaseorderSchema = new Schema({
  _producer: { type: ObjectId, ref: 'User' },
  _buyer: { type: ObjectId, ref: 'User' },
  _order: { type: ObjectId, ref: 'Order' },
  _review: { type: ObjectId, ref: 'Review' },
  is_reviewed: { type: Boolean, default: false }},
  { timestamps: true }
);


purchaseorderSchema.post('save', function(purchaseorder) {
  Order.findOne({_id: purchaseorder._order}).exec((err,order) => {
    User.findByIdAndUpdate(purchaseorder._buyer , {$pushAll: {purchased_products: order.products }}, {multi: true}, function(err) {
    });
    Product.update({_id: {"$in": order.products }}, { $pushAll: {buyers: [order._buyer] }}, {multi: true}, function(err) {
    });
  })
});

export default mongoose.model('PurchaseOrder', purchaseorderSchema);


