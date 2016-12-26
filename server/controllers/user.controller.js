import User from '../models/user';
import cuid from 'cuid';
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
      return res.json({ user: saved });
    }
  });
}

export function timeSlot(req, res) {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user.if_producer == true)
    {
      let producer_info = user.producer_info;
       producer_info.timeslots.push(req.body.timeslot)
       user.save(function (err, user1) {
        console.log(user1)
        if (err){
          return res.status(500).send(err);
        }
        else{
          return res.json({ user: user1 });
        }
      });
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
  console.log(req.query)
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



export function deleteUser(req, res) {
  User.findOne({ cuid: req.params.cuid }).exec((err, user) => {
    if (err || user == null) {
      return res.status(500).send({msg: err});
    }
    user.remove(() => {
      return res.status(200).send({msg: "User deleted successfully"});
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
        country: 'US',
        currency: 'usd',
        account_holder_name: req.body.holder_name,
        account_holder_type: 'individual',
        routing_number: req.body.routing_number,//'110000000',
        account_number: req.body.account_number//'000123456789'
      }
      }, function(err, token) {
        stripe.customers.create({
          email: req.body.email,
          description: 'Customer for ' + req.body.email,
          source: token.id // obtained with Stripe.js
        }, function(err, customer) {
          user.customer_id = customer.id
          user.save((err, saved) => {
            if (err) {
              return res.status(500).send(err);
            }
            else {
              return res.json({ user: saved });
            }
          });
        });
      });
    }
  });
}

export function Payment(req, res) {
  User.findOne({ email: req.body.email }).exec((err, user) => {
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
            user.customer_id,
            {source: token.id},
            function(err, card) {
              stripe.charges.create({
                amount: 2000,
                currency: "nok",
                customer: user.customer_id,
                source: card.id, // obtained with Stripe.js
                description: "Charge for " + user.email
              }, function(err, charge) {
                if(err) {
                  return res.status(500).send(err);
                } else {
                  return res.json({ charge: charge });
                }
              });
            }
          );
        }
      })
    }
  })
}

export function handleAccount(req, res) {
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
