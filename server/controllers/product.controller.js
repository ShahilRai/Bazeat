import Product from '../models/product';
import User from '../models/user';
import ProductCategory from '../models/productcategory';
import Allergen from '../models/allergen';
import cuid from 'cuid';

export function addProduct(req, res) {
  User.findOne({  email: req.body.email }).exec((error, user) => {
    ProductCategory.findOne({  name: req.body.product_category }).exec((error, product_category) => {
      Allergen.find({'name': { $in: req.body.allergens}}, function(err, allergens){
        var allergens_array = allergens.map(function(a) {return a._id;});
        const newproduct = new Product();
        newproduct.cuid = cuid();
        newproduct.food_type = req.body.food_type;
        newproduct._producer = user._id;
        newproduct.product_category =  product_category._id;
        newproduct.save((err, saved) => {
            if (err) {
              res.status(500).send(err);
            }else{
              product_category._products.push(saved._id)
              product_category.save((error, saved_product_category) => {
                if (error) {
                  res.status(500).send(error);
                }
              });
              for (var i in allergens_array) {
                var allergen_id = allergens_array[i];
                saved.allergens.push(allergen_id);
                Allergen.findOne({ _id: allergen_id }).exec((err, allergen) => {
                  allergen._products.push(saved._id);
                  allergen.save((error, allergen1) => {
                    if (error) {
                      res.status(500).send(error);
                    }
                  });
                });
              }
                saved.save((err, savedproduct)=> {
                  if (err) {
                  res.status(500).send(err);
                  }
                  user.products.push(savedproduct);
                  user.save((error, user) => {
                    if (error) {
                      res.status(500).send(error);
                    }
                    res.json({ product: savedproduct });
                  });
                });
            }
        });
      });
    });
  });
}


export function purchaseProduct(req, res) {
  Product.findOne({ cuid: req.body.cuid }).exec((err, product) =>{
    User.findOne({ email: req.body.email}).exec((err, user) => {
        product.buyers.push(user);
        product.save((err, product1) => {
          if (err) {
            res.status(500).send(err);
          }
        res.json({ product: product1 });
        });
    });
  });
}


export function getProducts(req, res) {
  Product.find().sort('-dateAdded').exec((err, products) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ products });
  });
}


export function getProduct(req, res) {
  Product.findOne({ cuid: req.params.cuid }).exec((err, product) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ product });
  });
}

export function updateProduct(req, res) {
  console.log(req.body.allergens);
  Product.findOne({ cuid: req.params.cuid }).exec((err, product) =>{
    Allergen.find({'name': { $in: req.body.allergens}}, function(err, allergens){
      var allergens_array = allergens.map(function(a) {return a._id.toString();});
      console.log(allergens_array);
      var product_allergens = product.allergens;
      var allergens_list = allergens_array;
      console.log(product.allergens)
      var product_to_be_added = allergens_list.pop(product_allergens);
      var push_products = product_to_be_added;
      var updated_allergens_array = product_allergens.concat(push_products);
      var product_to_be_deleted_allergens_array = updated_allergens_array.pop(allergens_list);
      console.log('product_to_be_added')
      console.log(allergens_array)
      console.log('updated_array')
      console.log(product_allergens)
      console.log('product_to_be_deleted')
      console.log(updated_allergens_array)
      // product.all = req.body.all;
      product.product_name = req.body.product_name;
      product.save((err, product1) => {
        console.log(product1)
        if (err) {
          res.status(500).send(err);
        }else{
          for (var i in allergens_array) {
                var allergen_id = allergens_array[i];
                console.log(product1)
                product1.allergens = [];
                product1.allergens.push(allergen_id);
                Allergen.findOne({ _id: allergen_id }).exec((err, allergen) => {
                  allergen._products.push(product1._id);
                  allergen.save((error, allergen1) => {
                    if (error) {
                      res.status(500).send(error);
                    }
                    console.log('allergen1');
                    console.log(allergen1);
                  });
                });
          }
            product1.save((err, savedproduct)=> {
                  if (err) {
                  res.status(500).send(err);
                  }
                    if (error) {
                      res.status(500).send(error);
                    }
                    res.json({ product: savedproduct });
                });
        }
      res.json({ product: product1 });
      });
    });
  });
}


export function getBuyers(req, res) {
  Product.findOne({ cuid: req.params.cuid }).populate('buyers _producer').exec((err, buyers) => {
    if (err) {
      res.status(500).send(err);
    }
      res.json({ product: buyers });
    });
}

export function deleteProduct(req, res) {
  Product.findOne({ cuid: req.params.cuid }).exec((err, product) => {
    if (err) {
      res.status(500).send(err);
    }

    product.remove(() => {
      res.status(200).end();
    });
  });
}
