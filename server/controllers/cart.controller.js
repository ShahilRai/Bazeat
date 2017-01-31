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
  if(!req.params.cuid) {
    return res.status(422).send({msg: "send valid cart id"});
  }
  // co
  User.findOne({email: req.params.cuid}).exec((err, user) => {
    let data = {}
    if(user) {
      data.user = user._id;
    } else {
      data.cuid = req.params.cuid;
    }
    console.log(data)
    Cart.findOne(data).exec((err, cart) => {
      console.log(cart)
      if (err) {
        return res.status(422).send(err);
      }
      else{
        if(cart) {
          if(req.query.check_email) {
            set_current_cart_to_user(req.query.check_email, cart.cuid, null, res)
          }
          set_total_price(cart, null, res)
        } else {
          return res.status(422).send({msg: "There are no item in cart"});
        }
      }
    });
  })
}

export function createCart(req, res) {
  console.log(req.body)
  let flag = false;
  Cart.findOne({ cuid: req.body.cuid }).exec(function ( err, cart ) {
      console.log(err)
      console.log("err")
      console.log(!cart)
    if (err) {
      return res.json(422,{error_msg: "Cart not found"});
    }
    if (!cart) {
      const newCart = new Cart(req.body);
      newCart.cuid = cuid();
      // newCart.user = user._id;
      // newCart.address.postal_code = user.postal_code;
      // newCart.address.city = user.city;
      // newCart.address.line1 = user.address;
      // newCart.address.country = user.country;
      // newCart.address.phone_num = user.phone;
      // newCart.address.email = user.email;
      // newCart.address.first_name = user.first_name;
      // newCart.address.last_name = user.last_name;
      newCart.save((error, savedcart) => {
        if (error) {
          return res.status(422).send(error);
        } else {
          set_total_price(savedcart, null, res)
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
                 set_total_price(updated_cart_item, null, res)
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
              set_total_price(cart2, null, res)
            }
        });
      }
    }
  });
}

function set_current_cart_to_user(check_email, cart_cuid, next, res) {
  User.findOneAndUpdate({email: check_email}, {$set: {current_cart_id:  cart_cuid}}).exec(function(err, user) {
    Cart.findOneAndUpdate
      ({"cuid": cart_cuid },
        {
          "$set": {
            "user": user._id,
            "address.postal_code": user.postal_code,
            "address.city": user.city,
            "address.line1": user.address,
            "address.country": user.country,
            "address.phone_num": user.phone,
            "address.email": user.email,
            "address.first_name": user.first_name,
            "address.last_name": user.last_name,
          }
        }
      ).exec(function(err, cart){
        console.log('cart')
        console.log(cart)
    })
  })
}

function set_total_price(cart, next, res){
  console.log(cart)
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
          console.log("doc")
          if (cart.cartitems.length == index+1){
            console.log(doc)
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
  Cart.findOne({ cuid: req.query.cuid }).exec((err, cart) => {
    if (err) {
      return res.status(422).send(err);
    }
    console.log(req.query)
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
}

export function emptyCart(req, res) {
  Cart.findOneAndUpdate(
    { "cuid": req.query.cuid},
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
      return res.status(422).send({msg: err});
      }
      return res.status(200).send({msg: "Cart Empty"});
  });
}
