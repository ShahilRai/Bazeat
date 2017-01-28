import User from '../models/user';
import Order from '../models/order';
import * as MailService from '../services/mailer';
import * as MessageService from '../services/twillio';
import cuid from 'cuid';
//Stripe Implementation
const keySecret = process.env.SECRET_KEY;
const keyPublishable = process.env.PUBLISHABLE_KEY;
const stripe = require("stripe")(keySecret);

export function addUser(req, res) {
  const newUser = new User(req.body);
  newUser.cuid = cuid();
  newUser.save((err, saved) => {
    console.log('saved')
    console.log(saved)
    if (err) {
      return res.status(422).send(err);
    }
    else{
      MailService.send_email(saved)
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
    },{new: true}).exec((err, timeslot) => {
    if (err){
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
    else{
      return res.json({timeslot});
    }
  });
}

export function getUsers(req, res) {
  User.find().sort('-dateAdded').exec((err, users) => {
    if (err) {
      return res.status(422).send(err);
    }
    else{
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

import stormpath from 'stormpath';

export function deleteUser(req, res) {
  User.findOne({ email: req.query.email }).exec((err, user) => {
    if (err || user == null) {
      return res.status(422).send({msg: err});
    }
    user.remove(() => {
      let client = new stormpath.Client();
      client.getAccount(user.unique_id, function (err, account) {
        account.delete(function(err, success) {
          console.log(err)
          console.log("kk")
          console.log(success)
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
                date: 1482909367,
                ip: "203.115.106.212"
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
                verification: {document: user.stripe_file_id},
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
                          return res.json({ account: bank_account });
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
    if(user.account_id) {
      res.json({status: false, last4: user.last4})
    } else {
      res.json({status: true})
    }
  })
}

export function Payment(req, res) {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    Order.findOne({ _id: req.body.order_id }).exec((err, order) => {
      if (err) {
        return res.status(422).send(err);
      }
      else {
        if (user.customer_id){
          stripe.customers.retrieve( user.customer_id,
          function(err, customer) {
            if (err) {
              return res.status(422).send(err);
            }
            else{
              create_card(customer, order, null, req.body, res)
            }
          });
        }
        else{
          stripe.customers.create({
            email: user.email,
            description: "Customer created with email " + user.email
          }, function(err, customer) {
           if(err){
            console.log(err);
           }
           else{
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
            create_charge(customer, card, order, null, req, res)
          }
        }
      );
      }
  })
}


export  function create_charge(customer, card, order, next, req, res){
  let amount = Math.round(order.total_amount.toFixed(2)*100)
  let app_fee = Math.round(amount.toFixed(2)*100)
  stripe.charges.create({
    amount: amount,
    currency: "nok",
    capture: false,
    customer: customer.id,
    source: card.id, // obtained with Stripe.js
    description: "Charge for " + req.email,
    destination: "acct_19YaXiA3xoj18svo",
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
            "address.phone_num": req.phone_num,
          }
        },{new: true}
        ).exec(function(err, updated_order){
      });
        MailService.send_email(charge)
        update_order_after_paymnt(charge, order)
        return res.json({ charge: charge });
    }
  });
}

export function hideAccount(req, res) {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user.if_visible == false){
      user.if_visible = true
    }
    else{
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
    if (user.if_disable == false){
      user.if_disable = true
    }
    else{
      user.if_disable = false
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


export function update_order_after_paymnt(charge, order){
  Order.findOneAndUpdate({"_id": order._id},
    {
      "$set": {
        "payment_status": charge.status,
        "payment_transaction_id": charge.balance_transaction,
        "charge_id": charge.id,
      }
    },{new: true}
    ).exec(function(err, updated_order){
      // Send email to promoter for shipping
  });
}
