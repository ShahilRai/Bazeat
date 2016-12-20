import User from '../models/user';
import cuid from 'cuid';

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
  console.log(req.body)
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
  User.findOne({ email: req.params.email }).exec((err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    else{
      return res.json({ user });
    }
  });
}


export function deleteUser(req, res) {
  User.findOne({ email: req.params.email }).exec((err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    user.remove(() => {
      res.status(200).end();
    });
  });
}
