import Admin from '../../models/admin';
import User from '../../models/user';


export function getUsers(req, res) {
  let end = parseInt(req.query._end, 10);
  let start = parseInt(req.query._start, 10);
  let sort = req.query._sort;
  console.log(sort)
  console.log(req.query._start)
  console.log(req.query.id)
  console.log('req.query.id')
  User.find().sort('-sort').limit(end).skip(start).exec((err, users) => {
    if (err) {
      res.status(500).send(err);
    }
    // console.log(User.count)
    res.setHeader('X-Total-Count', 10);
    res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
    res.setHeader('X-Content-Type-Options', 'npsniff');
    res.json( users );
  });
}

export function updateUser(req, res) {
  User.update({ cuid: req.params.cuid }, req.body, function(err, user) {
    res.json({ user });
  })
}

export function deleteUser(req, res) {
  User.findOne({ cuid: req.params.cuid }).exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    }

    user.remove(() => {
      res.status(200).end();
    });
  });
}



