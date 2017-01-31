import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
import Order from '../models/order'
import OrderItem from '../models/orderitem'
import autoIncrement from 'mongoose-auto-increment';
import serverConfig from '../config';
const connection = mongoose.createConnection(serverConfig.mongoURL);
autoIncrement.initialize(connection);

const packageSchema = new Schema({
  qty_packed: { type: 'Number', default: 0 },
  qty_shipped: { type: 'Number', default: 0 },
  delivery_method: String,
  status:{type: 'String', default: "Not Shipped"},
  _order: { type: Schema.ObjectId, ref: 'Order' },
  pkg_status: {type: 'String', default: null},
  pkg_date: {type: 'Date'},
  shippingdata: {
    already_delivered: { type: 'Boolean', default: false },
    ship_date: { type: 'Date'},
    status: { type: 'String'},
    notify_to_customer: { type: 'Boolean', default: false }
  }},
  { timestamps: true }
);

packageSchema.plugin(autoIncrement.plugin, {
    model: 'Package',
    field: 'pkgId',
    startAt: 100000
});

packageSchema.plugin(autoIncrement.plugin, {
    model: 'Package',
    field: 'shpId',
    startAt: 100000
});


// packageSchema.post('save', function(packag) {
//   // Order.findByIdAndUpdate({_id: packag._order}, {$pushAll: {packages: [packag]}} , function(err, model) {
//   // })
//   // Order.update({_id: packag._order}, {$set: {after_payment_status: "Confirmed"}},function(err) {
//   // });

// });
export default mongoose.model('Package', packageSchema);
