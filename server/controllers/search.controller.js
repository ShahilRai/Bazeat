import User from '../models/user';
import Like from '../models/like';
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
  User.where('loc').near({
  center : { type : 'Point', coordinates :
  coords}, minDistance: 100, maxDistance : 50000 }).exec(function(err, users) {
    if (err) {
      console.log('err')
      console.log(err)
      return res.status(422).send(err);

    }
    return res.status(200).json({users});
 });
}

export function usersResults(req, res) {
  let re = new RegExp(req.query.search, 'i');
  User.find({$or:[{'full_name':re}, { 'email':re}]}).sort('full_name').exec(
    function(err,users){
      if (err) {
        return res.status(422).send(err);;
      }
      else{
        return res.status(200).json({users});
      }
    }
  );
}

export function productsResults(req, res) {
  User.findOne({email: req.query.email}).exec(function(err,user) {
    let data = {}
    if(req.query.search) {
      data.product_name = new RegExp(req.query.search, 'i')
    }
    if(req.query.start_price && req.query.end_price) {
      data.calculated_price = {'$gte': parseInt(req.query.start_price), '$lte': parseInt(req.query.end_price)};
    }
    if(req.query.category_id) {
      data.product_category = {"$in": req.query.category_id }
    }
    if(user) {
      data._producer = {"$ne": user._id}
    }
    Product.find(data).populate("_producer ingredients allergens product_category").sort('product_name').exec(
      function(err, products){
        if (err) {
          return res.status(422).send(err);
        }
        let item_arrays = []
        if(products.length == 0) {
          return res.json({ item_arrays });
        }
        else {
          if(user) {
            for (var i = 0, len = products.length; i < len; i++) {
              (function(i) {
                let item = products[i];
                let items = {item}
                Like.find({ _product: item._id, _liker: user._id }).exec(function(err, plikes) {
                  items.is_like = ((plikes.length == 0) ? false : true)
                  item_arrays.push(items)
                  if(item_arrays.length == products.length) {
                    return res.json({ item_arrays });
                  }
                })
              })(i);
            }
          } else {
            for (var i = 0, len = products.length; i < len; i++) {
              (function(i) {
                let item = products[i];
                let items = {item}
                items.is_like = false
                item_arrays.push(items)
                if(item_arrays.length == products.length) {
                  return res.json({ item_arrays });
                }
              })(i);
            }
          }
        }
      }
    );
  });
}
