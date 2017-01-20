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
        return res.json(422, err);
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
        return res.json(422, err);
      }
      else{
        return res.json (users);
      }
    }
  );
}


export function productsResults(req, res) {
  let data = {};
  if(req.query.search){
    data.product_name = new RegExp(req.query.search, 'i');
  }
  if(req.query.start_price && req.query.end_price){
    data.calculated_price = {'$gte': parseInt(req.query.start_price), '$lte': parseInt(req.query.end_price)};
  }
  if(req.query.category_id){
    data.product_category = {"$in": req.query.category_id };
  }
  Product.find(data).populate("_producer ingredients allergens product_category").sort('product_name').exec(
    function(err,products){
      console.log('products')
      console.log(products)
      if (err) {
        return res.json(422, err);
      }
      else{
        return res.json(products);
      }
    }
  );
}

