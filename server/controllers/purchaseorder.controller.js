import PurchaseOrder from '../models/purchaseorder';
import Order from '../models/order';
import User from '../models/user';
import Product from '../models/product';
import OrderItem from '../models/orderitem';
import PackageItem from '../models/packageitem';
import cuid from 'cuid';
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
      Product.find({ _id: { "$in": producer.products }}).select("orders -_id").exec((err, products)=>{

        if (err) {
          return res.json(422, err);
        }
        else{
          if(products){
            let order_arr = []
            products.forEach(function(item, index){
              if (item.orders.length > 0){
                item.orders.forEach(function(order_id, index1){
                  order_arr.push(order_id)
                  if((products.length == index+1) && (item.orders.length == index1+1))
                  {
                    Order.find({ _id: {"$in": order_arr }, payment_status: "succeeded"})
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
                })
              }
            })
          }
          else{
            return res.json({orders: "You don't have any orders yet"});
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
    Product.find({ _id: {"$in": producer.products }}).select("orders -_id").exec((err, products)=>{
      if (err) {
        return res.json(422, err);
      }
      if(products){
        let order_arr = []
        products.forEach(function(pitem, index){
          if (pitem.orders.length > 0){
            pitem.orders.forEach(function(order_id, index1){
              order_arr.push(order_id)
              if((products.length == index+1) && (pitem.orders.length == index1+1)){
                Order.find({ _id: {"$in": order_arr }, payment_status: "succeeded"}).select('packages -_id').exec((err, orders)=>{
                  if (err) {
                    return res.json(422, err);
                  }
                  else{
                    if (orders){
                      let package_arr = []
                        orders.forEach(function(oitem, index3){
                          if (oitem.packages.length > 0){
                            oitem.packages.forEach(function(package_id, index4){
                              package_arr.push(package_id)
                              if((orders.length == index3+1) && (oitem.packages.length == index4+1))
                              {
                                Package.find({ _id: {"$in": package_arr}}).populate({
                                  path: '_order',
                                  model: 'Order',
                                  populate: {
                                    path: '_buyer',
                                    model: 'User'
                                  }
                                  })
                                  .populate('packageitems').exec((err, packages)=>{
                                  if (err) {
                                    return res.json(422, err);
                                  }
                                  else{
                                    return res.json(packages);
                                  }
                                })
                              }
                            })
                          }
                        })
                    }
                    else{
                      return res.json({packages: "You don't have any packages yet"});
                    }
                  }
                })
              }
            })
          }
        })
      }
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
  let status
  let ship_qty = 0
  Order.findOne({cuid: req.body.cuid}).populate({path: 'packages',
    model: 'Package',
    populate: {
      path: 'packageitems',
      model: 'PackageItem'
    }}).exec(function(err, order) {
    order.packages.forEach(function(pkg, index){
      pkg.packageitems.forEach(function(pkg_itm, indx){
        ship_qty += pkg_itm.shipped_qty
        if(pkg.packageitems.length == indx+1){
          if(ship_qty > 0 ){
            status = "Partially Shipped"
          }
          else {
            status = "Confirmed"
          }
        }
      })
    })
    Package.findOne({_id: req.body.package_id}).exec(function(err, upackage) {
      if(err) {
        return res.status(422).send(err);
      } else {
        req.body.orderitems.forEach(function(orderitem, index) {
          OrderItem.findOneAndUpdate({ _id: orderitem._id }, {$inc: {packed_qty: orderitem.packed_qty}}, {new: true}, function(err, updated_orderitem) {
            if (err){
              return res.status(422).send(err);
            }
            else {
              if (orderitem.packed_qty > 0) {
                const new_package_item = new PackageItem();
                new_package_item._package = upackage._id;
                new_package_item.cuid = cuid();
                new_package_item.packed_qty = orderitem.packed_qty;
                new_package_item._orderitem = updated_orderitem._id
                new_package_item.save((err, newpacked) => {
                  Package.update({ _id: upackage._id }, {$push: {packageitems: newpacked}}, { safe: true, multi: true }, function(err, model) {
                    updated_orderitem.packageitems.push(newpacked);
                    updated_orderitem.save();
                  })
                })
              }
              if (req.body.orderitems.length == index+1) {
                order.packages.push(upackage);
                order.after_payment_status = status;
                order.save();
                upackage._order = order._id;
                upackage.pkg_status = 'created';
                upackage.pkg_date = req.body.pkg_date;
                upackage.save((err, packed) => {
                  return res.json(packed);
                })
              }
            }
          })
        })
      }
    })
  })
}


export function beforePkgcreate(req, res){
  OrderItem.findOne({ _id: req.query.order_id }).exec((err, orderitem1) => {
    if(parseInt(req.query.packed_qty) > 0){
      if(orderitem1.product_qty < (parseInt(req.query.packed_qty) + orderitem1.packed_qty)){
        return res.json({ msg: "packed order quantity must be less than ordered quantity" })
      }
      else{
        return res.json({ msg: "Ok" })
      }
    }
    else{
      return res.status(422).send({msg: "Send valid data"});
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
  }, {new: true}).populate({
              path: 'packageitems',
              model: 'PackageItem',
              populate: {
                path: 'orderitems',
                model: 'OrderItem'
              }})
  .exec((err, packge) => {
    console.log('packge')
    console.log(packge)
    if (err){
      return res.status(422).send(err);
     }
     else {
      packge.packageitems.forEach(function(pitem, index){
        if(pitem.packed_qty > pitem.shipped_qty){
          PackageItem.findOneAndUpdate({_id: pitem._id}, {$set: {shipped_qty: pitem.packed_qty}}, {new: true}, function(err, updated_pakge_item) {
            console.log('updated_pakge_item')
            console.log(updated_pakge_item)
            if(err){
              return res.status(422).send({msg: "Something went wrong"});
            }
            else{
              if(packge.packageitems.length == index+1){
                console.log('packge0')
                console.log(packge)
                updateshipqty(packge, null, res)
              }
            }
          })
        }
        else{
          if(packge.packageitems.length == index+1){
            return res.status(422).send({msg: "Errors"});
          }
        }
      })
    }
  });
}

export  function updateshipqty(packge, next, res){
  packge.packageitems.forEach(function(pitem, index){
    OrderItem.findOneAndUpdate({ _id: pitem._orderitem }, {$set: {shipped_qty: pitem.packed_qty}}, {new: true}, function(err, updated_orderitem) {
      if(packge.packageitems.length == index+1){
        // return res.status(200).send({packge});
        updated_order_after_ship(packge, null, res)
      }
    })
  })
}



export function deleteShipment(req, res){
  Package.findOne({_id: req.query.package_id}).populate({
    path: 'packageitems',
    model: 'PackageItem',
    populate: {
      path: 'orderitems',
      model: 'OrderItem'
    }})
  .exec((err, packge)=>{
    packge.packageitems.forEach(function(pitem, index){
      pitem.shipped_qty = 0;
      pitem.save();
      OrderItem.findOneAndUpdate({ _id: pitem._orderitem }, {$set: {shipped_qty: 0}}, {new: true}, function(err, updated_orderitem) {
        if(packge.packageitems.length == index+1){
          return res.status(200).send({packge});
        }
      })
    })
  })
}

function updated_order_after_ship(packge, next, res){
  let ship_qty = 0
  Order.findOne({_id: packge._order}).populate("-_id _buyer")
    .populate({path: 'orderitems',
    model: 'OrderItem',
    populate: {
      path: '_product',
      model: 'Product'
    }})
    .populate({path: 'packages',
    model: 'Package',
    populate: {
      path: 'packageitems',
      model: 'PackageItem'
    }}).exec((err,order) =>{
    order.packages.forEach(function(pkg, index){
      if(pkg.status == 'Shipped' ){
        pkg.packageitems.forEach(function(pkg_itm, indx){
          ship_qty += pkg_itm.shipped_qty
          if(pkg.packageitems.length == indx+1){
            if(order.total_qty > ship_qty){
              order.after_payment_status = "Partially Shipped"
              order.save((err, order1) => {
                return res.json(order1);
              })
            }
            if (order.total_qty == ship_qty){
              order.after_payment_status = "Shipped"
              order.save((err, order2) => {
                return res.json(order2);
              })
            }
          }
        })
      }
    })
  })
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
    console.log('packge')
    console.log(packge)
    if (err || packge == null) {
      return res.status(422).send({msg: err});
    }
    packge.remove(() => {
      return res.status(200).send({msg: "Package deleted successfully"});
    });
  });
}


export function getEmailOrders(req, res){
  User.findOne({email: req.query.email}).exec((err, producer)=>{
    if(err){
       return res.status(422).send({err});
    }else{
      Order.findOne({_id: req.query.order_id}).populate('_buyer').exec((err, order)=>{
        if(err){
         return res.status(422).send({err});
        }
        else{
          return res.status(200).send({email: producer.email, order: order});
        }
      })
    }
  })
}


export function sendOrderEmail(req, res){
  console.log('req.body')
  console.log(req.body)
}
