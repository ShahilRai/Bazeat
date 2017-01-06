import Order from '../models/order';
import Cart from '../models/cart';
import User from '../models/user';
import OrderItem from '../models/orderitem';
import Product from '../models/product';
import async from 'async';
import cuid from 'cuid';
import request from 'request';


export function addOrder(req, res) {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    const newOrder = new Order();
    newOrder.cuid = cuid();
    newOrder.address.postal_code = user.postal_code;
    newOrder.address.city = user.city;
    newOrder.address.line1 = user.address;
    newOrder.address.country = user.country;
    newOrder.address.phone_num = user.phone;
    newOrder.save((err, order) => {
      if (err) {
        return res.status(500).send(err);
      }
      Cart.findOne({cuid: req.body.cart_cuid}).select("total_price total_weight total_qty cartitems -_id").exec(function(err, data) {
        if(err){
          return res.status(500).send({err_msg: "Your cart is empty"});
        }
        data.cartitems.forEach(function(item) {
          let total_weight = 0;
          let total_price = 0;
          let food_vat_value = 0;
          let shipment_vat_value = 0;
           Product.findOne({ _id: item.product_id }).exec((err, product) => {
            total_weight += (product.portion*item.qty)
            total_price +=(product.calculated_price*item.qty)
            const newOrderItem = new OrderItem();
            newOrderItem.cuid = cuid();
            newOrderItem._order = order._id
            newOrderItem._product = item.product_id
            newOrderItem.price = total_price
            newOrderItem.weight = total_weight
            newOrderItem.qty = item.qty
            newOrderItem.save((err, orderitem) => {
              if (err) {
                return res.status(500).send(err);
              }
              order.orderitems.push(orderitem);
              order.products.push(orderitem._product);
              if(data.cartitems.length == order.orderitems.length) {
                food_vat_value = (data.total_price-(data.total_price/(1+(0.15)))) ;
                shipment_vat_value = (parseInt(req.body.shipment_price)-(parseInt(req.body.shipment_price)/(1+(0.25)))) ;
                order.total_amount = data.total_price + food_vat_value + shipment_vat_value + parseInt(req.body.shipment_price) ;
                order.total_weight = data.total_weight;
                order.total_qty = data.total_qty;
                order.shipment_price = parseInt(req.body.shipment_price);
                order.food_vat_value = food_vat_value;
                order.food_vat_value = food_vat_value;
                order.shipment_vat_value = shipment_vat_value;
                order.price_with_ship = data.total_price + parseInt(req.body.shipment_price) ;
                order.save(function (errors, order1) {
                  if (errors){
                    return res.status(500).send(errors);
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


export function getCart(req, res) {
  User.findOne({ email: req.params.email }).exec((err, user) => {
    Cart.findOne({ user: user._id }).exec((err, cart) => {
      if (err) {
        return res.status(500).send(err);
      }
      else{
        return res.json({ cart });
      }
    });
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

              let from_pin = '1407'
                if (err) {
                  throw err;
                  callback();
                }
                // getShippingPrice(to_pin, from_pin, totalweight)
                return res.status(200).send({msg: "Cart "});
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

export  function getShippingPrice(req, res){
  let clientUrl = 'http://localhost:3000'
  let order_postcode, order_weight;
  User.find({email: req.query.email}).exec((err, user) =>{
    Order.findOne({cuid: req.query.order_cuid}).exec((err, order) =>{
      console.log('req.body')
      console.log(req.body)
      if (req.body.type == "update_address"){
        Order.findOneAndUpdate({"_id": order._id},
          {
            "$set": {
              "address.city": req.body.city,
              "address.country": req.body.country,
              "address.line1": req.body.line1,
              "address.postal_code": req.body.postal_code,
              "address.phone_num": req.body.phone_num,
            }
          },{new: true}
          ).exec(function(err, updated_order){
              order_postcode = updated_order.address.postal_code;
              order_weight = updated_order.total_weight;

          let options = {uri : "https://api.bring.com/shippingguide/products/price.json?from="+order_postcode+"&to="+user[0].postal_code+"&clientUrl="+clientUrl+"&weightInGrams="+order_weight+"",method : 'GET'
          };
          request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              return res.json({body})
            }
            else {
              return res.json({response});
            }
          });
        });
      }
      else{
        order_postcode = order.address.postal_code;
        order_weight = order.total_weight;
        let options = {uri : "https://api.bring.com/shippingguide/products/price.json?from="+order_postcode+"&to="+user[0].postal_code+"&clientUrl="+clientUrl+"&weightInGrams="+order_weight+"", method : 'GET'
        };
        request(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            return res.json({body})
          }
          else {
            return res.json({response});
          }
        });
      }
    })
  })
}

export function deleteOrder(req, res) {
  Order.findOne({ cuid: req.params.cuid }).exec((err, order) => {
    if (err || order == null) {
      return res.status(500).send({msg: err});
    }
    order.remove(() => {
      return res.status(200).send({msg: "Order deleted successfully"});
    });
  });
}

export function addCart(req, res) {
  let flag = false;
  User.findOne({  email: req.body.email }).exec((error, user) => {
    Cart.findOne({ user: user._id }).exec(function ( err, cart ){
      if (err) {
        return res.json(500,{error_msg: "Cart not found"});
      }
      if (!cart){
        const newCart = new Cart(req.body);
        newCart.cuid = cuid();
        newCart.user = user._id;
        newCart.save((error, savedcart) => {
          if (error) {
            return res.status(500).send(error);
          }
          cart_sum(savedcart, null, res)
        });
      }else{
        cart.cartitems.forEach(function(item) {
          if(item.product_id == req.body.cartitems.product_id){
            flag = true;
          }
        });
        if(flag === true){
          Cart.findOneAndUpdate(
            { "_id": cart._id, "cartitems.product_id": req.body.cartitems.product_id },
            { "$set": {
                "cartitems.$.qty": req.body.cartitems.qty
              }
            },{new: true}).exec(function(err, updated_cart_item){
              if (err){
                  return res.status(500).send(err);
                }
                else{
                   cart_sum(updated_cart_item, null, res)
                  // return res.json({ cart: updated_cart_item});
                }
            });
        }else{
          cart.update(
            {$pushAll: {"cartitems": [req.body.cartitems]}},
            {safe: true, upsert: true},{new: true},
            function(err, cart2) {
              if (err){
                return res.status(500).send(err);
              }
              else{
                cart_sum(cart2, null, res)
              }
            }
          );
        }
      }
    });
  });
}

export  function cart_sum(cart, next, res){
  let item_qty = 0;
  let item_price = 0;
  let total_price = 0;
  let total_weight = 0;
  let product_weight = 0;
  cart.cartitems.forEach(function(item, index){
    Product.findOne({ _id: item.product_id }).exec((err, product) => {
      item_price = (product.calculated_price*item.qty);
      product_weight = (product.portion*item.qty);
      total_price += item_price;
      total_weight += product_weight;
      item_qty += item.qty;
      Cart.findOneAndUpdate(
        { "_id": cart._id, "cartitems.product_id": item.product_id  },
        {
            "$set": {
                "total_price": total_price,
                "total_qty": item_qty,
                "total_weight": total_weight,
                "cartitems.$.product_amt": item_price
            }
        },
        {new: true}).
        exec(function(err,doc) {
          if (cart.cartitems.length == index+1){
          return res.json({ cart: doc});
          }
        });
    })
  })
}

export function removeCartItems(req, res) {
  let cartItem;
  let item_qty = 0;
  let item_price = 0;
  let total_price = 0;
  let total_weight = 0;
  let product_weight = 0;
  User.findOne({email: req.query.email}).exec((err,user) =>{
  Cart.findOne({ user: user._id }).exec((err, cart) => {
    if (err) {
      return res.status(500).send(err);
    }
    let cartItem = cart.cartitems.id(req.query.cartitem_id)
    Product.findOne({ _id: cartItem.product_id }).exec((err, product) => {
      item_price = (product.calculated_price*cartItem.qty);
      product_weight = (product.portion*cartItem.qty);
      total_price = (cart.total_price - item_price);
      total_weight = (cart.total_weight - product_weight);
      item_qty = (cart.total_qty - cartItem.qty);
      Cart.findOneAndUpdate(
        { "_id": cart._id},
        {
          "$set": {
              "total_price": total_price,
              "total_qty": item_qty,
              "total_weight": total_weight
          }
        },
        {new: true}).exec((err) => {
          Cart.findOneAndUpdate( {'cartitems._id' : req.query.cartitem_id} ,
            {
              $pull: { cartitems: { _id: req.query.cartitem_id }}
            },
            {new: true},
            function(err, doc){
             if (err){
              return res.status(500).send(err);
             }
             else{
              return res.status(200).send({doc});
             }
          })
        })
    })
  })
  })
}


export function emptyCart(req, res) {
  User.findOne({email: req.body.email}).exec((err,user) =>{
    Cart.findOneAndUpdate(
      { "user": user._id},
      {
          "$set": {
              "cartitems": [],
              "total_qty": 0,
              "total_price": 0,
              "total_weight": 0
          }
      },
      {new: true}).
      exec(function(err,doc) {
        if (err) {
        return res.status(500).send({msg: err});
        }
        return res.status(200).send({msg: "Cart Empty"});
    });
  })
}
