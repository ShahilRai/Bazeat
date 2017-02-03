import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
import Order from '../models/order'
import OrderItem from '../models/orderitem'
import PackageItem from '../models/packageitem'
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

packageSchema.post('remove', function(packg) {
  let pkg_items
  let ship_qty = 0;
  let pack_qty = 0;
  pkg_items = packg.packageitems
  pkg_items.forEach(function(pitem, index){
    PackageItem.findOne({_id: pitem}).exec((err, pkgitem) => {
      OrderItem.findOne({ _id: pkgitem._orderitem }).exec((err, orderitem) => {
        orderitem.packed_qty = (orderitem.packed_qty - pkgitem.packed_qty)
        orderitem.shipped_qty = (orderitem.shipped_qty - pkgitem.shipped_qty)
        orderitem.save()
        OrderItem.update({ _id: pkgitem._orderitem }, {$pull: {packageitems: pitem}}, { safe: true, multi: true }, function(err, model) {
        })
      })
    })
    if(pkg_items.length == index+1){
      Order.update({ _id: packg._order }, { $pullAll: { packages : [packg._id] }},
     { safe: true, multi: true },
     function removeConnectionsCB(err, obj) {
     });
    }
  })
});
export default mongoose.model('Package', packageSchema);
