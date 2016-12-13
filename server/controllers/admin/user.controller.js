import Admin from '../../models/admin';
import User from '../../models/user';
import cuid from 'cuid';

export function addUser(req, res) {
  const newUser = new User(req.body);
  newUser.cuid = cuid();
  newUser.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }
      return res.json({ user: saved });
  });
}

export function getUsers(req, res) {
  let end = parseInt(req.query._end, 10);
  let start = parseInt(req.query._start, 10);
  let sort = req.query._sort;
  let order = '';
  console.log(req.query._order == 'DESC')
  if (req.query._order == 'DESC'){
    order = 'descending';
  }
  if (req.query._order == 'ASC')
  {
    order = 'ascending';
  }
  User.find().exec((err, total_users) => {
    User.find().sort([[sort, order]]).limit(end).skip(start).exec((err, users) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.setHeader('X-Total-Count', total_users.length);
      res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
      res.setHeader('X-Content-Type-Options', 'npsniff');
      res.json( users );
      return;
    });
  });
}

export function updateUser(req, res) {
  User.update({ _id: req.params._id }, req.body, function(err, user) {
    if (err){
      return res.status(500).send(err);
    }
      return res.json({ user });
  })
}

export function deleteUser(req, res) {
  User.findOne({ _id: req.params._id }).exec((err, user) => {
    if (err) {
      return res.status(500).send(err);
    }

    user.remove(() => {
      res.status(200).end();
    });
  });
}



