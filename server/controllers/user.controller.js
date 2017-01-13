import User from '../models/user';
import Order from '../models/order';
import * as MailService from '../services/mailer';
import cuid from 'cuid';
import fs from 'fs';
//Stripe Implementation
const keySecret = process.env.SECRET_KEY;
const keyPublishable = process.env.PUBLISHABLE_KEY;
const stripe = require("stripe")(keySecret);

export function addUser(req, res) {
  const newUser = new User(req.body);
  newUser.cuid = cuid();
  newUser.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }
    else{
      MailService.send_email(saved)
      return res.json({ user: saved });
    }
  });
}

export function addTimeSlot(req, res) {
  User.findOneAndUpdate({ email: req.body.email }, {
    $pushAll: { "timeslots": req.body.timeslots }
    }, {new: true}).exec((err, user) => {
    if (err){
      return res.status(500).send(err);
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
      return res.status(500).send(err);
     }
     else {
      return res.status(200).send({timeslot});
     }
  });
}

export function getUsers(req, res) {
  User.find().sort('-dateAdded').exec((err, users) => {
    if (err) {
      return res.status(500).send(err);
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
      return res.status(500).send(err);
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
      return res.status(500).send({msg: err});
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
      return res.status(500).send(err);
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
          return res.status(500).send(err);
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
                day: user.birth_date,
                month: user.birth_month,
                year: user.birth_year
              },
              address: {
                city: user.city,
                line1: user.line1,
                postal_code: user.postal_code
              },
              first_name: user.first_name,
              last_name: user.last_name,
              type: "individual"
            }
          }, function(err, account) {
            if(err) {
              return res.status(500).send(err);
            } else {
              user.account_id = account.id
              user.save((err, saved) => {
                if (err) {
                  return res.status(500).send(err);
                } else {
                  stripe.accounts.createExternalAccount(
                    user.account_id,
                    {external_account: token.id},
                    function(err, bank_account) {
                      if(err) {
                        return res.status(500).send(err);
                      } else {
                        stripe.fileUploads.create(
                          {
                            purpose: 'identity_document',
                            file: {
                              data: fs.readFileSync('/home/abhinav/Pictures/account.png'),
                              name: 'account.png',
                              type: 'application/octet-stream'
                            }
                          },
                          {stripe_account: user.account_id}, function(err, file) {
                            if(err) {
                              return res.status(500).send(err);
                            } else {
                              stripe.accounts.update(
                                user.account_id,
                                {legal_entity: {verification: {document: file.id}}}, function(err, document) {
                                  if(err) {
                                    return res.status(500).send(err);
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
  });
}

export function Payment(req, res) {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    Order.findOne({ _id: req.body.order_id }).exec((err, order) => {
      console.log(req.body)
      if (err) {
        return res.status(500).send(err);
      } else {
        stripe.tokens.create({
        card: {
          number: req.body.card_number, // 4000005780000007 I've tried 424242424242424242 and 5555555555554444 as a string and int but still have the same error.
          exp_month: req.body.month,
          exp_year: req.body.year,
          cvc: req.body.cvc // I've also tried 999 as an int.
          }
        }, function(err, token) {
          if(err) {
            console.log(err);
          } else {
            stripe.customers.createSource(
              // user.customer_id,
              'cus_9WyLwPSTFYCCIf',
              {source: token.id},
              function(err, card) {
                if(err) {
                  console.log(err);
                } else {
                  stripe.charges.create({
                    amount: Math.round(order.total_amount.toFixed(2)*100),
                    currency: "nok",
                    // customer: user.customer_id,
                    customer: "cus_9WyLwPSTFYCCIf",
                    source: card.id, // obtained with Stripe.js
                    description: "Charge for " + user.email
                  }, function(err, charge) {
                    if(err) {
                      return res.status(500).send(err);
                    } else {
                      Order.findOneAndUpdate({"_id": order._id},
                        {
                          "$set": {
                            "address.city": req.body.city,
                            "address.country": req.body.country,
                            "address.line1": req.body.line1,
                            "address.postal_code": req.body.postal_code,
                            "address.phone_num": req.body.phone_num,
                            "address.phone_num": req.body.phone_num,
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
              }
            );
          }
        })
      }
    })
  })
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
        return res.status(500).send(err);
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
        return res.status(500).send(err);
      }
      else {
        return res.json({ user: saved });
      }
    });
  });
}


export function update_order_after_paymnt(charge, order){
  console.log('charge')
  console.log(charge)
  console.log('order')
  console.log(order)
  Order.findOneAndUpdate({"_id": order._id},
    {
      "$set": {
        "payment_status": charge.status,
        "payment_transaction_id": charge.balance_transaction,
      }
    },{new: true}
    ).exec(function(err, updated_order){
      // Send email to promoter for shipping
  });
}
