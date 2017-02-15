import Order from '../models/order';
import Cart from '../models/cart';
import User from '../models/user';
import OrderItem from '../models/orderitem';
import Product from '../models/product';
import async from 'async';
import cuid from 'cuid';
import request from 'request';
let LocalStorage = require('node-localstorage').LocalStorage;
let localStorage = new LocalStorage('./scratch');



export function addOrder(req, res) {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    // if(user.account_added == true){
      let data = {};
      Cart.findOne({cuid: req.body.cart_cuid}).select("address total_price total_weight total_qty cartitems -_id").exec(function(err, data) {
        if(err){
          return res.status(422).send({err_msg: "Your cart is empty"});
        }
          const newOrder = new Order();
          newOrder.cuid = cuid();
          newOrder.address.postal_code = data.address.postal_code;
          newOrder.address.city = data.address.city;
          newOrder.address.line1 = data.address.line1;
          newOrder.address.country = data.address.country;
          newOrder.address.phone_num = data.address.phone_num;
          newOrder.address.email = data.address.email;
          newOrder.address.first_name = data.address.first_name;
          newOrder.address.last_name = data.address.last_name;
          newOrder._buyer = user._id;
          newOrder.delivery_method = req.body.delivery_method;
          newOrder.save((err, order) => {
            if (err) {
              return res.status(422).send(err);
            }
          data.cartitems.forEach(function(item) {
            let total_weight = 0;
            let total_price = 0;
            let food_vat_value = 0;
            let shipment_vat_value = 0;
             Product.findOne({ _id: item.product_id }).exec((err, product) => {
              total_weight += (product.portion*item.qty)
              total_price +=(product.base_price*item.qty)
              const newOrderItem = new OrderItem();
              newOrderItem.cuid = cuid();
              newOrderItem._order = order._id
              newOrderItem._product = item.product_id
              newOrderItem.total_price = total_price
              newOrderItem.product_price = product.base_price
              newOrderItem.product_weight = total_weight
              newOrderItem.product_qty = item.qty
              newOrderItem.save((err, orderitem) => {
                if (err) {
                  return res.status(422).send(err);
                }
                if(req.body.timeslot){
                  order.timeslot.push(req.body.timeslot);
                }
                order.orderitems.push(orderitem);
                order.products.push(orderitem._product);
                if(data.cartitems.length == order.orderitems.length) {
                  food_vat_value = (data.total_price-(data.total_price/(1+(0.15)))) ;
                  shipment_vat_value = (parseInt(req.body.shipment_price)-(parseInt(req.body.shipment_price)/(1+(0.25)))) ;
                  order.total_amount = data.total_price  + parseInt(req.body.shipment_price) ;
                  order.total_weight = data.total_weight;
                  order.total_qty = data.total_qty;
                  order.shipment_price = (parseInt(req.body.shipment_price)).toFixed(2);
                  order.food_vat_value = food_vat_value.toFixed(2);
                  order.shipment_vat_value = shipment_vat_value.toFixed(2);
                  order.net_price = data.total_price;
                  order.total_mva = (food_vat_value + shipment_vat_value) ;
                  order.save(function (errors, order1) {
                    deduct_product_qty(order1)
                    if (errors){
                      return res.status(422).send(errors);
                    }
                    else{
                      return res.json({ order: order1 });
                    }
                  });
                }
              })
            });
          });
        });
      });
    // }
    // else{
    //   return res.status(422).send({err_msg: "Please add your bank account first"});
    // }
  });
}


function deduct_product_qty(order){
  order.orderitems.forEach(function(item, index){
    OrderItem.findOne({_id: item}).exec((err, orderitem) =>{
      let product_qty = -(orderitem.product_qty)
      Product.findOneAndUpdate({_id: orderitem._product}, {$inc: {quantity: product_qty }},{new: true}).exec(function(err, product1){
        if (err){
          return res.status(422).send(err);
        }
        else{
          if (product1.quantity <= 0){
            product1.is_disable = true
            product1.save();
          }
          else{
            product1.is_disable = false
            product1.save();
          }
        }
      });
    })
  })
}

export function getOrders(req, res) {
  Order.find().sort('-dateAdded').exec((err, orders) => {
    if (err) {
      return res.status(422).send(err);
    }
    else{
      return res.json({ orders });
    }
  });
}


export function getOrder(req, res) {
  Order.findOne({ cuid: req.params.cuid }).exec((err, order) => {
    if (err) {
      return res.status(422).send(err);
    }
    else{
      return res.json({ order });
    }
  });
}

export  function getShippingPrice(req, res){
  let clientUrl = process.env.SiteUrl
  let cart_postcode, cart_weight;
  User.find({email: req.query.email}).exec((err, user) =>{
    Cart.findOne({cuid: req.query.cart_cuid}).exec((err, cart) =>{
      if (req.body.type == "update_address"){
        Cart.findOneAndUpdate({"_id": cart._id},
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
          },{new: true}
          ).exec(function(err, updated_cart){
              cart_postcode = updated_cart.address.postal_code;
              cart_weight = updated_cart.total_weight;
          let options = {uri : "https://api.bring.com/shippingguide/products/all.json?from="+cart_postcode+"&to="+user[0].postal_code+"&clientUrl="+clientUrl+"&weightInGrams="+cart_weight+"&product=pa_doren&product=servicepakke",method : 'GET'
          };
          request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              let res_body = JSON.parse(body)
              return res.json({res_body})
            }
            else {
              return res.json({response});
            }
          });
        });
      }
      else{
        cart_postcode = cart.address.postal_code;
        cart_weight = cart.total_weight;
        let options = {uri : "https://api.bring.com/shippingguide/products/all.json?from="+cart_postcode+"&to="+user[0].postal_code+"&clientUrl="+clientUrl+"&weightInGrams="+cart_weight+"", method : 'GET'
        };
        request(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            let res_body = JSON.parse(body)
            return res.json({res_body})
          }
          else {
            return res.json({response});
          }
        });
      }
    })
  })
}


export function budamatAddress(req, res){
  Cart.findOneAndUpdate({"cuid": req.query.cart_cuid},
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
    },{new: true}
      ).exec(function(err, updated_order){
      if (err){
        return res.status(422).send(err);
      }
      else{
        return res.json({updated_order});
      }
  })
}

export function hentematAddress(req, res){
  Product.find({"_id": req.query.product_id}).populate("_producer")
    .exec(function(err, producer){
      if (err){
        return res.status(500).send(err);
      }
      else{
        return res.json({producer});
      }
  })
}

export function deleteOrder(req, res) {
  Order.findOne({ cuid: req.params.cuid }).exec((err, order) => {
    if (err || order == null) {
      return res.status(422).send({msg: err});
    }
    order.remove(() => {
      return res.status(200).send({msg: "Order deleted successfully"});
    });
  });
}
