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
    delivery_method: String,
    status:{type: 'String', default: "Not Shipped"},
    _order: { type: Schema.ObjectId, ref: 'Order' },
    packageitems: [{ type: Schema.ObjectId, ref: 'PackageItem' }],
    pkg_status: {type: 'String', default: null},
    pkg_date: {type: 'Date'},
    shippingdata: {
      already_delivered: { type: 'Boolean', default: false },
      ship_date: { type: 'Date'},
      status: { type: 'String'},
      notify_to_customer: { type: 'Boolean', default: false }
    }
  },
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


packageSchema.post('remove', function(packg) {
  // ProductCategory.update({ _products: product._id }, {$pullAll: {_products: [product._id]}}, { safe: true, multi: true }, function(err, model) {
  //   })
  // Allergen.update({ _products: product._id }, { $pullAll: { _products : [product._id] }},
  //   { safe: true, multi: true },
  //   function removeConnectionsCB(err, obj) {
  //   });
  // Ingredient.update({ _products: product._id }, { $pullAll: { _products : [product._id] }},
  //   { safe: true, multi: true },
  //   function removeConnectionsCB(err, obj) {
  //   });
  // User.update({ products: product._id }, { $pullAll: { products : [product._id] }},
  //   { safe: true, multi: true },
  //   function removeConnectionsCB(err, obj) {
  //   });
});
export default mongoose.model('Package', packageSchema);
