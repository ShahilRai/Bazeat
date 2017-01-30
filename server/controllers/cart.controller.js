import Order from '../models/order';
import Cart from '../models/cart';
import User from '../models/user';
import OrderItem from '../models/orderitem';
import Product from '../models/product';
import async from 'async';
import cuid from 'cuid';
import request from 'request';
import session from 'express-session';
let LocalStorage = require('node-localstorage').LocalStorage;
let localStorage = new LocalStorage('./scratch');


export function getCart(req, res) {
  if(!req.params.email) {
    res.status(422).send({ error: 'send valid email' });
  }
  User.findOne({ email: req.params.email }).exec((err, user) => {
    Cart.findOne({ user: user._id }).exec((err, cart) => {
      console.log('cart')
      console.log(cart)
      if (err) {
        return res.status(422).send(err);
      }
      else{
        if (cart != null){
          set_total_price(cart, null, res)
        }
        else{
          return res.status(422).send({error_msg: "Your cart is empty"});
        }
      }
    });
  });
}

export function createCart(req, res) {
  let flag = false;
  if (req.body.email){
    User.findOne({  email: req.body.email }).exec((error, user) => {
      Cart.findOne({ user: user._id }).exec(function ( err, cart ){
        if (err) {
          return res.json(422,{error_msg: "Cart not found"});
        }
        if (!cart){
          const newCart = new Cart(req.body);
          newCart.cuid = cuid();
          newCart.user = user._id;
          newCart.address.postal_code = user.postal_code;
          newCart.address.city = user.city;
          newCart.address.line1 = user.address;
          newCart.address.country = user.country;
          newCart.address.phone_num = user.phone;
          newCart.address.email = user.email;
          newCart.address.first_name = user.first_name;
          newCart.address.last_name = user.last_name;
          newCart.save((error, savedcart) => {
            if (error) {
              return res.status(422).send(error);
            }
            else{
              if (cart != null){
                set_total_price(cart, null, res)
              }
              else{
                return res.status(422).send({error_msg: "Your cart is empty"});
              }
            }
          });
        }
        else{
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
                    return res.status(422).send(err);
                }
                else{
                  if (cart != null){
                    set_total_price(cart, null, res)
                  }
                  else{
                    return res.status(422).send({error_msg: "Your cart is empty"});
                  }
                }
              });
          }
          else{
            Cart.findOneAndUpdate(
              { "_id": cart._id },
              {$pushAll: {"cartitems": [req.body.cartitems]}},{new: true}).exec(function(err, cart2){
                if (err){
                  return res.status(422).send(err);
                }
                else{
                  if (cart != null){
                    set_total_price(cart, null, res)
                  }
                  else{
                    return res.status(422).send({error_msg: "Your cart is empty"});
                  }
                }
            });
          } 
        }
      });
    });
  }
}

function set_total_price(cart, next, res){
  let item_qty = 0;
  let item_price = 0;
  let product_total_price = 0;
  let total_price = 0;
  let total_weight = 0;
  let product_weight = 0;
  let product_image, product_name;
  cart.cartitems.forEach(function(item, index){
    Product.findOne({ _id: item.product_id }).exec((err, product) => {
      product_total_price = (product.calculated_price*item.qty);
      item_price = (product.calculated_price);
      product_weight = (product.portion*item.qty);
      total_price += product_total_price;
      total_weight += product_weight;
      item_qty += item.qty;
      product_image = product.photo;
      product_name = product.product_name;
      Cart.findOneAndUpdate(
        { "_id": cart._id, "cartitems._id": item._id  },
        {
          "$set": {
              "total_price": (total_price).toFixed(2),
              "total_qty": item_qty,
              "total_weight": total_weight,
              "cartitems.$.product_amt": item_price.toFixed(2),
              "cartitems.$.product_total_amt": product_total_price.toFixed(2),
              "cartitems.$.product_image": product_image,
              "cartitems.$.product_name": product_name,
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
  let product_total_price = 0;
  User.findOne({email: req.query.email}).exec((err,user) =>{
  Cart.findOne({ user: user._id }).exec((err, cart) => {
    if (err) {
      return res.status(422).send(err);
    }
    let cartItem = cart.cartitems.id(req.query.cartitem_id)
    Product.findOne({ _id: cartItem.product_id }).exec((err, product) => {
      if (err){
        return res.status(422).send(err);
      }
      product_total_price = (product.calculated_price*cartItem.qty);
      item_price = (product.calculated_price*cartItem.qty);
      product_weight = (product.portion*cartItem.qty);
      total_price = (cart.total_price - product_total_price);
      total_weight = (cart.total_weight - product_weight);
      item_qty = (cart.total_qty - cartItem.qty);
      Cart.findOneAndUpdate(
        { "_id": cart._id},
        {
          "$set": {
              "total_price": total_price.toFixed(2),
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
              return res.status(422).send(err);
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
  User.findOne({email: req.query.email}).exec((err,user) =>{
    Cart.findOneAndUpdate(
      { "user": user._id},
      {
        "$set": {
          "cartitems": [],
          "total_qty": 0,
          "total_price": 0,
          "address.city": user.city,
          "address.country": user.country,
          "address.line1": user.address,
          "address.postal_code": user.postal_code,
          "address.phone_num": user.phone_num,
          "address.email": user.email,
          "address.first_name": user.first_name,
          "address.last_name": user.last_name,
          "total_weight": 0
        }
      },
      {new: true}).
      exec(function(err,doc) {
        if (err) {
        return res.status(422).send({msg: err});
        }
        return res.status(200).send({msg: "Cart Empty"});
    });
  })
}

export function sessionCart(req,res){
  const newCart = new Cart();
  newCart.cuid = cuid();
  newCart.save((error, savedcart) => {
    if (error) {
      return res.status(422).send(error);
    }
    session.cart_id = savedcart._id;
    console.log('session')
    console.log(session)
  });
}
