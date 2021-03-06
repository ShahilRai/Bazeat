import User from '../models/user';
import Order from '../models/order';
import Cart from '../models/cart';
import Product from '../models/product';
import PurchaseOrder from '../models/purchaseorder';
import * as MailService from '../services/mailer';
import * as MessageService from '../services/twillio';
import cuid from 'cuid';
import stormpath from 'stormpath';
//Stripe Implementation
import fs from 'fs';
const keySecret = process.env.SECRET_KEY;
const keyPublishable = process.env.PUBLISHABLE_KEY;
const stripe = require("stripe")(keySecret);

export function addUser(req, res) {
  const newUser = new User(req.body);
  newUser.cuid = cuid();
  newUser.save((err, saved) => {
    if (err) {
      return res.status(422).send(err);
    }
    else {
      // MailService.send_email(saved)
      MailService.budmat_order(saved)
      MessageService.sendMessage(saved.phone)
      return res.json({ user: saved });
    }
  });
}

export function addTimeSlot(req, res) {
  User.findOneAndUpdate({ email: req.body.email }, {
    $pushAll: { "timeslots": req.body.timeslots }
    }, {new: true}).exec((err, user) => {
    if (err){
      return res.status(422).send(err);
     }
     else {
      return res.status(200).send(user.timeslots);
    }
  });
}

export function removeTimeSlot(req, res) {
  User.findOneAndUpdate({ "timeslots._id": req.query.timeslot_id }, {
    $pull: { "timeslots": { _id: req.query.timeslot_id }}
    }, {new: true}).exec((err, timeslot) => {
    if (err) {
      return res.status(422).send(err);
     }
     else {
      return res.status(200).send({timeslot});
     }
  });
}

export function getTimeSlot(req, res){
  User.find({email: req.query.email}).select('timeslots').exec((err, timeslot) => {
    if (err) {
      return res.status(422).send(err);
    }
    else {
      return res.json({timeslot});
    }
  });
}

export function getUsers(req, res) {
  User.find().sort('-dateAdded').exec((err, users) => {
    if (err) {
      return res.status(422).send(err);
    }
    else {
      return res.json({ users });
    }
  });
}

export function getUser(req, res) {
  if(!(req.query.email || req.query.cuid)) {
    return res.status(422).send({ error: 'Please send valid email or cuid' });
  }
  let data = {};
  if(req.query.cuid){
    data.cuid = req.query.cuid;
  }
  if(req.query.email){
    data.email = req.query.email;
  }
  User.findOne(data).exec((err, user) => {
    if (err) {
      return res.status(422).send(err);
    }
    else{
      return res.json({ user });
    }
  });
}

export function deleteUser(req, res) {
  User.findOne({ email: req.query.email }).exec((err, user) => {
    if (err || user == null) {
      return res.status(422).send({msg: err});
    }
    user.remove(() => {
      MailService.cancel_account_to_user(user)
      let client = new stormpath.Client();
      client.getAccount(user.unique_id, function (err, account) {
        account.delete(function(err, success) {
          res.status(200).send({msg: "User deleted successfully"});
        });
      });
    });
  });
}

export function addBankAccount(req, res) {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      return res.status(422).send(err);
    }
    else {
      if (user.account_id) {
        return res.json(user.last4);
      }
      else {
        stripe.tokens.create({
          bank_account: {
            country: 'NO',
            currency: 'nok',
            account_number: req.body.account_number
          }
        }, function(err, token) {
          if(err) {
            return res.status(422).send(err);
          } else {
            stripe.accounts.create({
              email: user.email,
              country: "NO",
              managed: true,
              tos_acceptance: {
                date: token.created,
                ip: token.client_ip
              },
              legal_entity: {
                dob: {
                  day: user.birth_date.day,
                  month: user.birth_date.month,
                  year: user.birth_date.year
                },
                address: {
                  city: user.city,
                  line1: user.address,
                  postal_code: user.postal_code
                },
                first_name: user.first_name,
                last_name: user.last_name,
                type: "individual"
              }
            }, function(err, account) {
              if(err) {
                return res.status(422).send(err);
              } else {
                user.account_id = account.id
                user.last4 = req.body.account_number.slice(-4)
                user.account_number = req.body.account_number
                user.account_added = true
                user.save((err, saved) => {
                  if (err) {
                    return res.status(422).send(err);
                  } else {
                    stripe.accounts.createExternalAccount(
                      user.account_id,
                      {external_account: token.id},
                      function(err, bank_account) {
                        if(err) {
                          return res.status(422).send(err);
                        } else {
                          stripe.fileUploads.create(
                            {
                              purpose: 'identity_document',
                              file: {
                                data: fs.readFileSync('client/images/success.png'),
                                name: 'account.png',
                                type: 'application/octet-stream'
                              }
                            },
                            {stripe_account: user.account_id}, function(err, file) {
                              if(err) {
                                return res.status(422).send(err);
                              } else {
                                stripe.accounts.update(
                                  user.account_id,
                                  {legal_entity: {verification: {document: file.id}}}, function(err, document) {
                                    if(err) {
                                      return res.status(422).send(err);
                                    } else {
                                      return res.json({ account: document });
                                    }
                                  }
                                );
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                });
              }
            });
          }
        });
      }
    }
  });
}

export function checkAccount(req, res) {
  User.findOne({ email: req.query.email }).exec((err, user) => {
    if(user.profile_added == false) {
      return res.json({status: false, err_msg: "Update your profile first"});
    }
    if(user.account_id) {
      res.json({status: false, last4: user.last4})
    } else {
      res.json({status: true})
    }
  })
}

export function Payment(req, res) {
  User.findOne({ email: req.body.current_user_email }).exec((err, user) => {
    Order.findOne({ _id: req.body.order_id }).populate({
    path: 'orderitems',
    model: 'OrderItem',
    populate: {
      path: '_product',
      model: 'Product'
    }}).exec((err, order) => {
      if (err) {
        return res.status(422).send(err);
      }
      else {
        if (user.customer_id) {
          stripe.customers.retrieve( user.customer_id,
          function(err, customer) {
            if (err) {
              return res.status(422).send(err);
            }
            else {
              create_card(customer, order, null, req.body, res)
            }
          });
        }
        else {
          stripe.customers.create({
            email: user.email,
            description: "Customer created with email " + user.email
          }, function(err, customer) {
           if(err) {
            console.log(err);
           }
           else {
            User.update({_id: user._id}, {$set: {customer_id: customer.id}},function(err) {
            })
            create_card(customer, order, null, req.body, res)
           }
          });
        }
      }
    })
  })
}


export function create_card(customer, order, next, req, res){
  stripe.tokens.create({
    card: {
      number: req.card_number, // 4000005780000007 I've tried 424242424242424242 and 5555555555554444 as a string and int but still have the same error.
      exp_month: req.month,
      exp_year: req.year,
      cvc: req.cvc // I've also tried 999 as an int.
      }
    }, function(err, token) {
      if(err) {
        console.log(err);
      }
      else{
        stripe.customers.createSource(
        customer.id,
        { source: token.id },
        function(err, card) {
          if (err){
            console.log(err)
          }
          else{
            console.log('order.products[0]._producer')
            console.log(order.orderitems[0]._product._producer)
            User.findOne({_id: order.orderitems[0]._product._producer}).exec((err, producer)=>{
              if(err){
                console.log(err)
              }
              else{
                create_charge(customer, producer, card, order, null, req, res)
              }
            })
          }
        }
      );
    }
  })
}

export function create_charge(customer, producer, card, order, next, req, res) {
  let amount = Math.round(order.total_amount.toFixed(2)*100)
  let calculated_app_fee = ((order.total_amount*0.1)+(order.total_qty*3.00))
  let app_fee = Math.round(calculated_app_fee.toFixed(2)*100)
  stripe.charges.create({
    amount: amount,
    currency: "nok",
    capture: false,
    customer: customer.id,
    source: card.id, // obtained with Stripe.js
    description: "Charge for " + req.email,
    destination: producer.account_id,
    application_fee: app_fee
    }, function(err, charge) {
    if(err) {
      return res.status(422).send(err);
    }
    else {
      Order.findOneAndUpdate({"_id": order._id},
        {
          "$set": {
            "address.city": req.city,
            "address.country": req.country,
            "address.line1": req.line1,
            "address.postal_code": req.postal_code,
            "address.phone_num": req.phone_num,
          }
        }, {new: true}
        ).exec(function(err, updated_order) {
      });
      clear_cart(order._buyer)
      // MailService.budmat_order(order)
      update_order_after_paymnt(charge, order)
      return res.json({ charge: charge });
    }
  });
}

function clear_cart(user_id) {
  User.findOne({_id: user_id}).exec(function(err, user) {
    Cart.findOne({cuid: user.current_cart_id}).exec(function(err, cart) {
      cart.remove(() => {
        console.log("Cart deleted successfully");
      })
    })
  })
}

export function hideAccount(req, res) {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if(user.if_visible == false) {
      user.if_visible = true
    } else {
      user.if_visible = false
    }
    user.save((err, saved) => {
      if (err) {
        return res.status(422).send(err);
      }
      else {
        return res.json({ user: saved });
      }
    });
  });
}

export function disableAccount(req, res) {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if(user.if_disable == false) {
      user.if_disable = true
    }
    else {
      user.if_disable = false
    }
    user.save((err, saved) => {
      if (err) {
        return res.status(422).send(err);
      }
      else {
        let data = true
        if (saved.if_disable == true) {
          data = false
        }
        Product.update({ _producer: user._id }, { $set: { is_disable : data }},{ safe: true, multi: true },function(err, product) {
        });
        return res.json({ user: saved });
      }
    });
  });
}

export function update_order_after_paymnt(charge, order){
  Order.findOneAndUpdate({"_id": order._id},
    {
    "$set": {
      "payment_status": charge.status,
      // "payment_transaction_id": charge.balance_transaction,
      "charge_id": charge.id,
    }},{new: true}
    ).exec(function(err, updated_order){
      // updated_order.products.forEach(function(item, index){
        Product.findOne({_id: updated_order.products[0]}).exec((err, product) =>{
          const newPurchseorder = new PurchaseOrder();
          newPurchseorder._order = order._id;
          newPurchseorder._producer = product._producer;
          newPurchseorder._buyer = order._buyer;
          newPurchseorder.save((err, purchaseorder) => {
            if (err) {
              console.log("PurchaseOrder creation falied")
            }
            else {
              MailService.confrim_order_mail(purchaseorder)
            }
          })
          // Send email to promoter for shipping
        })
      // })
  });
}

export function checkUserAccount(req,res){
  User.findOne({email: req.query.email}).exec((err, user) => {
    if(err){
      return res.status(422).send(err);
    }
    else{
      if(user.profile_added == false) {
        return res.status(200).send({status: false, msg: "Update your profile first"});
      }
      if(user.account_added == false){
        return res.status(200).send({status: false, msg: "Add your account first"});
      }
      if(user.profile_added == true && user.account_added == true){
        return res.status(200).send({status: true, msg: "You are ready to go"});
      }
    }
  })
}


export function addProfile(req, res) {
  const newUser = new User(req.body);
  newUser.cuid = cuid();
  console.log(req.body.producerinfo);
  console.log(req.body.userinfo);
  // newOrder.orderitems.create( req.body.orderitems );
  newUser.save((err, saved) => {
    if (err) {
      // res.json(422, { err: err });
      return res.status(422).send(err);
    }
    else{
      saved.producerInfo.push(req.body.producerinfo);
      saved.userInfo.push(req.body.userinfo);
      return res.json({ user: saved });
    }
  });
}

export function getProfile(req, res) {
  console.log(req.query.email);
  User.findOne({ email: req.query.email }).exec((err, user) => {
    if (err) {
      return res.status(422).send(err);
    }
    else{
      return res.json({ user });
    }
  });
}
