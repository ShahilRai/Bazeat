import User from '../models/user';
import cuid from 'cuid';
import Express from 'express';
import ExpressStrompath from 'express-stormpath';
import bodyParser from 'body-parser';
import multer from 'multer';
import multerS3 from 'multer-s3';

export function addProfile(req, res) {
  const newUser = new User(req.body);
  newUser.cuid = cuid();
  console.log(req.body.producerinfo);
  console.log(req.body.userinfo);
  // newOrder.orderitems.create( req.body.orderitems );
  newUser.save((err, saved) => {
    if (err) {
      // res.json(422, { err: err });
      return res.status(422).send(err);
    }
    else{
      saved.producerInfo.push(req.body.producerinfo);
      saved.userInfo.push(req.body.userinfo);
      return res.json({ user: saved });
    }
  });
}

export function getProfile(req, res) {
  console.log(req.query.email);
  User.findOne({ email: req.query.email }).exec((err, user) => {
    if (err) {
      return res.status(422).send(err);
    }
    else{
      return res.json({ user });
    }
  });
}
