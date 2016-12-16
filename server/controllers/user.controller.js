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
