import PurchaseOrder from '../models/purchaseorder';
import Order from '../models/order'
import User from '../models/user'
import Product from '../models/product'
import OrderItem from '../models/orderitem'
import Package from '../models/package'
import * as MailService from '../services/mailer';
import * as MessageService from '../services/twillio';
const keySecret = process.env.SECRET_KEY;
const keyPublishable = process.env.PUBLISHABLE_KEY;
const stripe = require("stripe")(keySecret);


export function getpurchaseOrders(req, res) {
  User.findOne({email: req.query.email}).select("products -_id").exec((err, producer)=>{
      if (err) {
        return res.json(422, err);
      }
      Product.findOne({ _id: {"$in": producer.products }}).select("orders -_id").exec((err, products)=>{
        if (err) {
          return res.json(422, err);
        }
        else{
          if(products){
            Order.find({ _id: {"$in": products.orders }, payment_status: "succeeded"})
            .populate("orderitems _buyer")
            .populate("packages", null, {pkg_status: 'created'})
            .exec((err, orders)=>{
              if (err) {
                return res.json(422, err);
              }
              else{
                return res.json(orders);
              }
            })
          }
          else{
            return res.json({packages: "You don't have any orders yet"});
          }
        }
      })
  })
}



export function getPackages(req, res) {
  User.findOne({email: req.query.email}).select("products -_id").exec((err, producer)=>{
    if (err) {
      return res.json(422, err);
    }
    Product.findOne({ _id: {"$in": producer.products }}).select("orders -_id").exec((err, products)=>{
      if (err) {
        return res.json(422, err);
      }
      Order.findOne({ _id: {"$in": products.orders }, payment_status: "succeeded"}).exec((err, orders)=>{
        if (err) {
          return res.json(422, err);
        }
        else{
          console.log('orders')
          console.log(orders.packages)
          if (orders){
            Package.find({ _id: {"$in": orders.packages }, pkg_status: "created"}).populate({
              path: '_order',
              model: 'Order',
              populate: {
                path: '_buyer',
                model: 'User'
              }
              }).exec((err, packages)=>{
              console.log('packages')
              console.log(packages)
              if (err) {
                return res.json(422, err);
              }
              else{
                return res.json(packages);
              }
            })
          }
          else{
            return res.json({packages: "You don't have any packages yet"});
          }
        }
      })
    })
  })
}

export function getpurchaseOrder(req, res) {
  Order.findOne({cuid: req.query.cuid})
  .populate("packages -_id _buyer")
  .populate({path: 'orderitems',
    model: 'OrderItem',
    populate: {
      path: '_product',
      model: 'Product'
    }}).exec((err, order)=>{
      if (err) {
        return res.json(422, err);
      }
      else{
        return res.json(order);
      }
  })
}


export function createPackage(req, res){
  const newPackage = new Package();
  newPackage.save((err, packed) => {
    return res.json(packed);
  })
}

export function updatePackage(req, res) {
  req.body.orderitems.forEach(function(orderitem, index) {
    OrderItem.findOneAndUpdate({ _id: orderitem._id }, {$inc: {packed_qty: orderitem.packed_qty}}, {new: true}, function(err, updated_orderitem) {
      if (err){
        return res.status(422).send(err);
      }
      if (orderitem.packed_qty != 0) {
        Package.findOneAndUpdate({"_id": req.body.package_id},
        {
          "$set": {
            "qty_packed": orderitem.packed_qty,
            "_order": updated_orderitem._order,
            "pkg_status": 'created',
            "pkg_date": req.body.pkg_date,
            "_orderitem": updated_orderitem._id,
          }
        },
        {new: true}).exec(function(err, packed){
          Order.findByIdAndUpdate({_id: packed._order}, {$pushAll: {packages: [packed]}} , function(err, model) {
          })
          Order.update({_id: packed._order}, {$set: {after_payment_status: "Confirmed"}},function(err) {
          });
          // OrderItem.update({_id: updated_orderitem._id}, { $set: {shipped_qty: packed.qty_packed}}, function(err) {
          // });
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
    if(orderitem1.product_qty < (parseInt(req.query.packed_qty) + orderitem1.packed_qty)){
      return res.json({ msg: "packed order quantity must be less than ordered quantity" })
    }
    else{
      return res.json({ msg: "Ok" })
    }
  })
}

export function shipPackage(req, res) {
  Package.findOneAndUpdate(
  { "_id": req.body.package_id },
  {
    "$set": {
      "shippingdata.shippment_no": req.body.shippment_no,
      "shippingdata.already_delivered": req.body.already_delivered,
      "shippingdata.notify_to_customer": req.body.notify_to_customer,
      "shippingdata.ship_date": req.body.ship_date,
      "status": req.body.status
    }
  }, {new: true})
  .exec((err, packge) => {
    console.log('packge')
    console.log(packge)
    if (err){
      return res.status(422).send(err);
     }
     else {
      updateshipqty(packge, null, res)
    }
  });
}
export  function updateshipqty(packge, next, res){
  Package.findOneAndUpdate({ _id: packge._id }, {$inc: {qty_shipped: packge.qty_packed}}, {new: true}).exec((err, pkg) => {
    if (err){
      return res.status(422).send(err);
    }
    else {
      OrderItem.findOneAndUpdate({ _id: pkg._orderitem }, {$set: {shipped_qty: pkg.qty_shipped}}, {new: true}, function(err, updated_orderitem) {
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
      })
    }
  });
}



export  function updateToDeliver(req, res){
  Order.findOneAndUpdate({ _id: req.query.order_id }, {$set: {after_payment_status: "Fulfilled"}}, {new: true}).exec((err, order) => {
    if (err){
      return res.status(422).send(err);
    }
    if(order.after_payment_status == "Fulfilled"){
      MailService.orderFullfilled(order)
      MessageService.orderFullfilled(order)
      stripe.charges.capture(
      order.charge_id,
      function(err, charge) {
        return res.status(200).send({msg: "Charge has been released"});
      });
    }
  })
}


export function updateOrderAddress(req, res) {
  Order.findOneAndUpdate(
  { "_id": req.body.order_id },
  {
    "$set": {
      "address.city": req.body.city,
      "address.country": req.body.country,
      "address.line1": req.body.line1,
      "address.postal_code": req.body.postal_code,
      "address.phone_num": req.body.phone_num,
      "address.email": req.body.email,
      "address.first_name": req.body.first_name,
      "address.last_name": req.body.last_name,
      "address.co": req.body.co,
    }
  }, {new: true})
  .exec((err, order) => {
    if (err){
      return res.status(422).send(err);
     }
     else {
      return res.status(200).send({order});
    }
  });
}


export  function packageDestroy(req, res){
  Package.findOne({_id: req.query.package_id }).exec((err, packge) => {
    if (err || packge == null) {
      return res.status(422).send({msg: err});
    }
    packge.remove(() => {
      return res.status(200).send({msg: "Package deleted successfully"});
    });
  });
}
