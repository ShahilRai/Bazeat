import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
import Order from '../models/order'
import OrderItem from '../models/orderitem'




const shippingdata = new Schema({
  package_no: { type: 'String' },
  shippment_no: { type: 'String' },
  already_delivered: { type: 'Boolean', default: false },
  ship_date: { type: 'Date', default: Date.now },
  notify_to_customer: { type: 'Boolean', default: false }
});

const packageSchema = new Schema({
  qty_packed: { type: 'Number', default: 0 },
  qty_shipped: { type: 'Number', default: 0 },
  delivery_method: String,
  status:{type: 'String', default: "Not Shipped"},
  shippment: { type: shippingdata},
  _order: { type: Schema.ObjectId, ref: 'Order' },
  // _orderitem: { type: Schema.ObjectId, ref: 'OrderItem' }
});


packageSchema.post('save', function(packag) {
  Order.findByIdAndUpdate({_id: packag._order}, {$pushAll: {packages: [packag]}} , function(err, model) {
  })
  Order.update({_id: packag._order}, {$set: {after_payment_status: "Confirmed"}},function(err) {
  });

});
export default mongoose.model('Package', packageSchema);
