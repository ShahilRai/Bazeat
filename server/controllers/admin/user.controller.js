import Admin from '../../models/admin';
import User from '../../models/user';


export function allUsers(req, res) {
  User.find().sort('-dateAdded').exec((err, users) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ users });
  });
}


export function destroyUser(req, res) {
  User.findOne({ email: req.params.email }).exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    }

    user.remove(() => {
      res.status(200).end();
    });
  });
}



export function editUser(req, res) {
  User.update({ email: req.body.email }, req.body, function(err, user) {
    res.json({ user });
  })
}
