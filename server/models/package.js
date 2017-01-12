import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
import Order from '../models/order'




const shippingdata = new Schema({
  package_no: { type: 'String' },
  shippment_no: { type: 'String' },
  already_delivered: { type: 'Boolean', default: false },
  notify_to_customer: { type: 'Boolean', default: false }
});

const packageSchema = new Schema({
  qty_packed: { type: 'Number', default: 0 },
  qty_shipped: { type: 'Number', default: 0 },
  delivery_method: String,
  shippment: { type: shippingdata},
  _order: { type: Schema.ObjectId, ref: 'Order' },
  _orderitem: { type: Schema.ObjectId, ref: 'OrderItem' }
});


packageSchema.post('save', function(packag) {
  Order.findByIdAndUpdate(packag._order, {$push: {packages: packag}} , function(err, model) {
  })
});
export default mongoose.model('Package', packageSchema);
