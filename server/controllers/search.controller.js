import User from '../models/user';
import Product from '../models/product';
import ProductCategory from '../models/productcategory';
import cuid from 'cuid';


export function gecodeLocation(req, res) {
  // let limit = req.query.limit || 10;
  // let maxDistance = req.query.distance || 50;
  // maxDistance /= 6371;
  let coords = [];
    coords[0] = req.query.longitude;
    coords[1] = req.query.latitude;
    console.log(coords)
    User.where('loc').near({
    center : { type : 'Point', coordinates :
    coords}, minDistance: 100, maxDistance : 50000 }).exec(function(err, users) {
      if (err) {
        return res.json(500, err);
      }
        return res.json (users);
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
  Product.find({$and:[{'product_name':re}, { 'is_hidden':false}]}).sort('product_name').exec(
    function(err,products){
      if (err) {
        return res.json(500, err);
      }
      else{
        return res.json(products);
      }
    }
  );
}


export function categoryResults(req, res) {
  ProductCategory.findOne({ _id: req.params._id }).populate('_products').exec((err, product) => {
    if (err) {
      return res.status(500).send(err);
    }
    else{
     return res.json({ product });
    }
  });
}
