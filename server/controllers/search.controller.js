import User from '../models/user';
import Product from '../models/product';
import cuid from 'cuid';


export function gecodeLocation(req, res) {
  let limit = req.query.limit || 10;
  let maxDistance = req.query.distance || 50;
  maxDistance /= 6371;
  let coords = [];
    coords[0] = req.query.longitude;
    coords[1] = req.query.latitude;
    console.log(coords)
  User.find({
    loc: {
      $near: coords,
      $maxDistance: maxDistance
    }
  }).limit(limit).exec(function(err, users) {
      if (err) {
        return res.json(500, err);
      }
      res.json (users);
    });
}

export function usersResults(req, res) {
  console.log(req.query.search)
  let re = new RegExp(req.query.search, 'i');
  User.find({$or:[{'full_name':re}, { 'email':re}]}).sort('full_name').exec(
    function(err,users){
      if (err) {
        return res.json(500, err);
      }
      else{
        return res.json (users);
      }
    }
  );
}


export function productsResults(req, res) {
  console.log(req.query.search)
  let re = new RegExp(req.query.search, 'i');
  Product.find({$or:[{'product_name':re}]}).sort('product_name').exec(
    function(err,peoducts){
      if (err) {
        return res.json(500, err);
      }
      else{
        return res.json (peoducts);
      }
    }
  );
}
