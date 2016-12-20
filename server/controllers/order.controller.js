import Order from '../models/order';
import Cart from '../models/cart';
import User from '../models/user';
import OrderItem from '../models/orderitem';
import Product from '../models/product';
import async from 'async';
import cuid from 'cuid';
import request from 'request';


export function addOrder(req, res) {
  const newOrder = new Order();
  newOrder.cuid = cuid();
  // newOrder.orderitems.create( req.body.orderitems );
  newOrder.save((err, order) => {
    if (err) {
      // res.json(500, { err: err });
      return res.status(500).send(err);
    }
    req.body.orderitems.forEach(function(item) {
      const newOrderItem = new OrderItem();
        newOrderItem.cuid = cuid();
        newOrderItem._order = order._id
        newOrderItem._product = item._product
        newOrderItem.price = item.price
        newOrderItem.qty = item.qty
        newOrderItem.save((err, orderitem) => {
          console.log(orderitem)
          if (err) {
            res.status(500).send(err);
          }
        });
    });
      order.orderitems.push(req.body.orderitems);
      order.save(function (err, order1) {
        if (err){
          return res.status(500).send(err);
        }
        else{
          return res.json({ order: order1 });
        }
      });
  });
}


export function getOrders(req, res) {
  Order.find().sort('-dateAdded').exec((err, orders) => {
    if (err) {
      return res.status(500).send(err);
    }
    else{
      return res.json({ orders });
    }
  });
}


export function getOrder(req, res) {
  Order.findOne({ cuid: req.params.cuid }).exec((err, order) => {
    if (err) {
      return res.status(500).send(err);
    }
    else{
      return res.json({ order });
    }
  });
}


export  function cartCheckout (req, res) {
  var totalweight = 1000;
  Cart.find({cuid: req.params.cuid}).select("cartitems user -_id").exec(function(err,data) {
    let cartitems = data[0].cartitems
    let user_id = data[0].user
    if (err) return handleError(err);
    User.findOne({ _id: user_id }).exec((err, user) =>{
      // let to_pin = user.postal_code
      let to_pin = '7600'
      if (cartitems[0] != null){
        async.forEach(cartitems,function(item,callback) {
          if (item.product_id.length > 0){
            Product.findOne({_id: item.product_id}).populate('_producer').exec(function(err, product) {
              // console.log(product._producer.postal_code)
              // let from_pin = product._producer.postal_code
              let from_pin = '1407'
                if (err) {
                  throw err;
                  callback();
                }
                getShippingPrice(to_pin, from_pin, totalweight)
            });
          }
        });
      }
      else{
        return res.json('Cart is empty');
      }
    });
  });
}

export  function getShippingPrice(to_pin, from_pin, totalweight){
  console.log('to_pin')
  console.log(to_pin)
  console.log('from_pin')
  console.log(from_pin)
  console.log(totalweight)
  let clientUrl = 'http://localhost:3000'
  let options = {
        uri : "https://api.bring.com/shippingguide/products/price.json?from="+from_pin+"&to="+to_pin+"&clientUrl="+clientUrl+"&weightInGrams="+totalweight+"",
        method : 'GET'
    };
    let res = '';
    request(options, function (error, response, body) {
      console.log('body')
      console.log(body)
      console.log('response')
      console.log(response)
        if (!error && response.statusCode == 200) {
          console.log(!error && response.statusCode == 200)
          res = body;
        }
        else {
          res = 'Not Found';
        }
        // callback(res);
    });
}




export function deleteOrder(req, res) {
  Order.findOne({ cuid: req.params.cuid }).exec((err, order) => {
    if (err) {
      return res.status(500).send(err);
     }
    else{
      order.remove(() => {
        res.status(200).end();
      });
    }
  });
}

export function addCart(req, res) {
  User.findOne({  email: req.body.email }).exec((error, user) => {
    Cart.findOne({ cuid: req.body.cuid, user: user._id },function ( err, cart ){
      // console.log(req.body);
      if (err) {
        return res.json(500,{error_msg: "Cart not found"});
      }
      if (!cart){
        console.log(req.body.cartitems)
        const newCart = new Cart(req.body);
        newCart.cuid = cuid();
        newCart.user = user._id;
        newCart.save((error, savedcart) => {
          if (error) {
            return res.status(500).send(error);
          }
          savedcart.cartitems.push(req.body.cartitems);
          savedcart.save(function (err, savedcart1) {
          return res.json({ cart: savedcart1 });
          });
        });
      }
      else{
        console.log(req.body.cartitems)
        cart.update(
            {$pushAll: {"cartitems": req.body.cartitems}},
            {safe: true, upsert: true},
            function(err, cart) {
              if (err){
                return res.status(500).send(err);
              }
              else{
                return res.json({ cart: cart });
              }
            }
        );
      }
    });
  });
}

export function removeCartItems(req, res) {
  Cart.findOne({ cuid: req.body.cuid }).exec((err, cart) => {
    if (err) {
      return res.status(500).send(err);
    }
    cart.cartitems.id(req.body.cartitem_id).remove();
      cart.save(function(error){
        if (error){
          return res.status(500).send(err);
        }
        res.status(200).end();
      });
      res.status(200).end();
    });
}
