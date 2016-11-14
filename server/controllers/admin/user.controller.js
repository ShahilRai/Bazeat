import Admin from '../../models/admin';
import User from '../../models/user';


export function getUsers(req, res) {
  User.find().sort('-dateAdded').exec((err, users) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ users });
  });
}

export function updateUser(req, res) {
  User.update({ email: req.body.email }, req.body, function(err, user) {
    res.json({ user });
  })
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



