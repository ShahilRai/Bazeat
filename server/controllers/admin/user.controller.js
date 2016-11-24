import Admin from '../../models/admin';
import User from '../../models/user';


export function getUsers(req, res) {
  console.log('req')
  console.log(req)
  console.log(req.query._end)
  console.log(req.query._start)
  console.log(req.query.id)
  User.find().limit(req.query._end).skip(req.query._start).sort(-req.query.id).exec((err, users) => {
    if (err) {
      res.status(500).send(err);
    }
    console.log(User.count)
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



