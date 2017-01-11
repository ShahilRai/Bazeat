import PurchaseOrder from '../models/purchaseorder';
import Order from '../models/order'
import User from '../models/user'
import Product from '../models/product'
import OrderItem from '../models/orderitem'
import Package from '../models/package'


export function getpurchaseOrders(req, res) {
  User.findOne({email: req.query.email}).select("products -_id").exec((err, producer)=>{
      if (err) {
        return res.json(500, err);
      }
      Product.findOne({ _id: {"$in": producer.products }}).select("orders -_id").exec((err, products)=>{
        if (err) {
          return res.json(500, err);
        }
        Order.find({ _id: {"$in": products.orders }, payment_status: "succeeded"}).populate("orderitems").exec((err, orders)=>{
          if (err) {
            return res.json(500, err);
          }
          else{
            return res.json(orders);
          }
        })
      })
  })
}


export function getpurchaseOrder(req, res) {
  Order.findOne({cuid: req.query.cuid}).populate("orderitems -_id").exec((err, order)=>{
      if (err) {
        return res.json(500, err);
      }
      else{
        return res.json(order);
      }
  })
}


export function addpackageOrder(req, res) {
  req.body.orderitems.forEach(function(orderitem, index) {
    OrderItem.findOneAndUpdate({ _id: orderitem.order_id }, {$inc: {packed_qty: orderitem.packed_qty}}, {new: true}, function(err, updated_orderitem) {
      if (err){
        return res.status(500).send(err);
      }
      const newPackage = new Package();
      if (orderitem.packed_qty != 0) {
        newPackage.qty_packed = orderitem.packed_qty
        newPackage._order = updated_orderitem._order
        newPackage._orderitem = updated_orderitem.order_id
        newPackage.save((err, packed) => {
        Order.update({_id: packed._order}, {$set: {after_payment_status: "Confirmed"}},function(err) {
        });
          if (req.body.orderitems.length == index+1){
            return res.json(packed);
          }
        });
      }
    });
  })
}


export function beforePkgcreate(req, res){
  OrderItem.findOne({ _id: req.query.order_id }).exec((err, orderitem1) => {
    if(orderitem1.product_qty <= (parseInt(req.query.packed_qty) + orderitem1.packed_qty)){
      return res.json({ msg: "Package order quantity must be less than ordered quantity" })
    }
  })
}

export function shipPackage(req, res) {
  Package.findOneAndUpdate(
    { "_id": req.body.package_id },
    {
      "$set": {
        "shippment.shippment_no": req.body.shippment_no,
        "shippment.already_delivered": req.body.already_delivered,
        "shippment.notify_to_customer": req.body.notify_to_customer,
      }
    }, {new: true}).exec((err, packge) => {
      if (err){
        return res.status(500).send(err);
       }
       else {
        updateshipqty(packge, null, res)
      }
    });
}
export  function updateshipqty(packge, next, res){
  Package.findOneAndUpdate({ _id: packge._id }, {$inc: {qty_shipped: packge.qty_packed}}, {new: true}).exec((err, pkg) => {
    if (err){
      return res.status(500).send(err);
    }
    else {
      let ship_qty = 0;
      Order.findOne({_id: packge._order }).populate("packages").exec((err, orders) =>{
        orders.packages.forEach(function(pakg, index) {
          ship_qty += pakg.qty_shipped
        })
        if(orders.total_qty > ship_qty){
          Order.update({_id: packge._order}, {$set: {after_payment_status: "Partially Shipped"}},function(err) {});
        }
        if (orders.total_qty == ship_qty){
          Order.update({_id: packge._order}, {$set: {after_payment_status: "Shipped"}},function(err) {
          })
        }
        return res.status(200).send({pkg});
      })
    }
  });
}
