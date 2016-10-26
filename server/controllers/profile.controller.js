import User from '../models/user';
import cuid from 'cuid';

export function addProfile(req, res) {
  console.log("hhhh")
  const newUser = new User(req.body);
  newUser.cuid = cuid();
  console.log(req.body.producerinfo);
  console.log(req.body.userinfo);
  // newOrder.orderitems.create( req.body.orderitems );
  newUser.save((err, saved) => {
    if (err) {
      // res.json(500, { err: err });
      res.status(500).send(err);
    }
    saved.producerInfo.push(req.body.producerinfo);
    saved.userInfo.push(req.body.userinfo);
    res.json({ user: saved });
  });
}
