import Order from '../models/order';
import Cart from '../models/cart';
import User from '../models/user';
import cuid from 'cuid';


export function addOrder(req, res) {
  const newOrder = new Order(req.body);
  newOrder.cuid = cuid();
  // newOrder.orderitems.create( req.body.orderitems );
  newOrder.save((err, order) => {
    if (err) {
      // res.json(500, { err: err });
      res.status(500).send(err);
    }
      order.orderitems.push(req.body.orderitems);
      order.save(function (err, order) {
        res.json({ order: order });
      });
  });
}


export function getOrders(req, res) {
  Order.find().sort('-dateAdded').exec((err, orders) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ orders });
  });
}


export function getOrder(req, res) {
  Order.findOne({ cuid: req.params.cuid }).exec((err, order) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ order });
  });
}


export function deleteOrder(req, res) {
  Order.findOne({ cuid: req.params.cuid }).exec((err, order) => {
    if (err) {
      res.status(500).send(err);
    }

    order.remove(() => {
      res.status(200).end();
    });
  });
}

export function addCart(req, res) {
  User.findOne({  email: req.body.email }).exec((error, user) => {
    Cart.findOne({ cuid: req.body.cuid, user: user._id },function ( err, cart ){
      // console.log(req.body);
      if (err) {
        res.json(500,{error_msg: "Cart not found"});
      }
      if (!cart){
        console.log(req.body.cartitems)
        const newCart = new Cart(req.body);
        newCart.cuid = cuid();
        newCart.user = user._id;
        newCart.save((error, savedcart) => {
          if (error) {
            res.status(500).send(error);
          }
          savedcart.cartitems.push(req.body.cartitems);
          savedcart.save(function (err, savedcart1) {
          res.json({ cart: savedcart1 });
          });
        });
      }
      else{
        console.log(req.body.cartitems)
        cart.update(
            {$pushAll: {"cartitems": req.body.cartitems}},
            {safe: true, upsert: true},
            function(err, cart) {
            console.log(cart)
            res.json({ cart: cart });
            }
        );
      }
    });
  });
}

export function removeCartItems(req, res) {
  Cart.findOne({ cuid: req.body.cuid }).exec((err, cart) => {
    if (err) {
      res.status(500).send(err);
    }
    cart.cartitems.id(req.body.cartitem_id).remove();
      cart.save(function(error){
        if (error){
          res.status(500).send(err);
        }
        res.status(200).end();
      });
      res.status(200).end();
    });
}
