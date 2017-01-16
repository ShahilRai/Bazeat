import PurchaseOrder from '../models/purchaseorder';
import Order from '../models/order'
import User from '../models/user'
import Product from '../models/product'
import OrderItem from '../models/orderitem'
import Package from '../models/package'
const keySecret = process.env.SECRET_KEY;
const keyPublishable = process.env.PUBLISHABLE_KEY;
const stripe = require("stripe")(keySecret);


export function getpurchaseOrders(req, res) {
  User.findOne({email: req.query.email}).select("products -_id").exec((err, producer)=>{
      if (err) {
        return res.json(500, err);
      }
      console.log('producer')
      console.log(producer)
      Product.findOne({ _id: {"$in": producer.products }}).select("orders -_id").exec((err, products)=>{
        if (err) {
          return res.json(500, err);
        }
        Order.find({ _id: {"$in": products.orders }, payment_status: "succeeded"}).populate("orderitems _buyer").exec((err, orders)=>{
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
    OrderItem.findOneAndUpdate({ _id: orderitem._id }, {$inc: {packed_qty: orderitem.packed_qty}}, {new: true}, function(err, updated_orderitem) {
      if (err){
        return res.status(500).send(err);
      }
      const newPackage = new Package();
      if (orderitem.packed_qty != 0) {
        newPackage.qty_packed = orderitem.packed_qty
        newPackage._order = updated_orderitem._order
        // newPackage._orderitem = updated_orderitem._id
        newPackage.save((err, packed) => {
        OrderItem.update({_id: updated_orderitem._id}, { $set: {shipped_qty: packed.qty_packed}}, function(err) {
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
        "shippment.ship_date": req.body.ship_date,
        "status": "Shipped"
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



export  function updateToDeliver(req, res){
  Order.findOneAndUpdate({ _id: req.query.order_id }, {$set: {after_payment_status: "Fulfilled"}}, {new: true}).exec((err, order) => {
    if (err){
      return res.status(500).send(err);
    }
    if(order.after_payment_status == "Fulfilled"){
      stripe.charges.capture(
      order.charge_id,
      function(err, charge) {
        return res.status(200).send({msg: "Charge has been released"});
      });
    }
  })
}



export  function packageDestroy(req, res){
  Package.findOne({ cuid: req.params._id }).exec((err, packge) => {
    if (err || order == null) {
      return res.status(500).send({msg: err});
    }
    packge.remove(() => {
      return res.status(200).send({msg: "Package deleted successfully"});
    });
  });
}
