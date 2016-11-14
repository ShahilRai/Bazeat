import Admin from '../../models/admin';
import User from '../../models/user';


export function allUsers(req, res) {
  console.log('users')
  console.log('users')
  console.log('users')
  console.log('users')
  User.find().sort('-dateAdded').exec((err, users) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ users });
  });
}
