import Order from '../models/order';
import Cart from '../models/cart';
import User from '../models/user';
import OrderItem from '../models/orderitem';
import Product from '../models/product';
import async from 'async';
import cuid from 'cuid';


export function addOrder(req, res) {
  const newOrder = new Order();
  newOrder.cuid = cuid();
  // newOrder.orderitems.create( req.body.orderitems );
  newOrder.save((err, order) => {
    if (err) {
      // res.json(500, { err: err });
      res.status(500).send(err);
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
      // order.orderitems.push(req.body.orderitems);
      // order.save(function (err, order) {
        res.json({ order: order});
      // })
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
  // var totalweight = 0;
  // Cart.find({cuid: req.params.cuid}).select("cartitems -_id").exec(function(err,data) {
  //   console.log('data')
  //   let cartitems = data[0]['cartitems']
  //   console.log(data[0]['cartitems'])
  //   if (err) return handleError(err);
  //   async.forEach(cartitems,function(item,callback) {
  //     Product.find({_id: item.product_id}).exec(function(err, product) {
  //       console.log('product')
  //       console.log(product.portion)
  //         if (err) {
  //           throw err;
  //           callback();
  //         } // or do something
  //         totalweight = totalweight + product.weight;
  //     // console.log(product.portion)
  //     });
  //   }, function(err) {
  //       res.json(totalweight);
  //   });

  // });
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
        console.log(!cart);
      if (!cart){
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
            function(err, savedcart) {
              res.json({ cart: savedcart });
            }
        );
        // res.json({ cart: cart });
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
