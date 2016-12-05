import Admin from '../../models/admin';
import User from '../../models/user';
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
        res.status(500).send(err);
      }
      res.setHeader('X-Total-Count', total_users.length);
      res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
      res.setHeader('X-Content-Type-Options', 'npsniff');
      res.json( users );
     // res.json([{
     //    "id": "5837dd7fd4888a155ae8e001",
     //    "cuid": "civxf8q7y00017ucstymgs0uv",
     //    "__v": 0,
     //    "orderitems": [],
     //    "products": [],
     //    "user_info": {
     //    "_id": "5837dd7fd4888a155ae8e000",
     //    "favourites": [],
     //    },
     //    "producer_info": {
     //    "_id": "5837dd7fd4888a155ae8dfff",
     //    "days": [],
     //    "sub_to_vat": false
     //    },
     //    "if_user": false,
     //    "if_producer": false,
     //    "date_joined": "2016-11-25T06:43:11.416Z",
     //    "birth_date": "2016-11-25T06:43:11.416Z"
     //    }] );
    });
  });
}

export function updateUser(req, res) {
  User.update({ _id: req.params._id }, req.body, function(err, user) {
    res.json({ user });
  })
}

export function deleteUser(req, res) {
  User.findOne({ _id: req.params._id }).exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    }

    user.remove(() => {
      res.status(200).end();
    });
  });
}



