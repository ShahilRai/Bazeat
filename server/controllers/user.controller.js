import User from '../models/user';
import cuid from 'cuid';

export function addUser(req, res) {
  const newUser = new User(req.body);
  newUser.cuid = cuid();
  newUser.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ user: saved });
  });
}


export function getUsers(req, res) {
  // User.find().sort('-dateAdded').exec((err, users) => {
  User.find().populate('products').exec((err, users) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ users });
  });
}


export function getUser(req, res) {
  User.findOne({ email: req.params.email }).exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ user });
  });
}


export function deleteUser(req, res) {
  User.findOne({ email: req.params.email }).exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    }

    user.remove(() => {
      res.status(200).end();
    });
  });
}
