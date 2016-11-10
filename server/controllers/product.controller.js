import Product from '../models/product';
import User from '../models/user';
import ProductCategory from '../models/productcategory';
import Allergen from '../models/allergen';
import Ingredient from '../models/ingredient';
import cuid from 'cuid';

export function addProduct(req, res) {
  console.log(req.body)
  User.findOne({ email: req.body.email }).exec((error, user) => {
    const newProduct = new Product(req.body);
    newProduct.cuid = cuid();
    newProduct._producer = user._id;
    newProduct.save((err, product) => {
     if (err) {
       res.status(500).send(err);
     }
     res.json({ product: product });;
    });
  });
}

export function updateProduct(req, res) {
  Product.findOne({ cuid: req.params.cuid }).exec((err, product) => {
    Product.update({ cuid: req.params.cuid }, req.body, function(err, model) {

      ProductCategory.update({ _products: product._id }, {$pullAll: {_products: [product._id]}}, { safe: true, multi: true }, function(err, model) {
      })

      ProductCategory.findByIdAndUpdate(product.product_category, {$push: {_products: product}} , function(err, model) {
      })

      Allergen.update({ _products: product._id }, { $pullAll: { _products : [product._id] }},
        { safe: true, multi: true },
        function removeConnectionsCB(err, obj) {
      });

      Allergen.update({_id: {"$in": product.allergens }}, { $pushAll: {_products: [product] }}, {multi: true}, function(err) {
      });

      Ingredient.update({ _products: product._id }, { $pullAll: { _products : [product._id] }},
        { safe: true, multi: true },
        function removeConnectionsCB(err, obj) {
      });

      Ingredient.update({_id: {"$in": product.ingredients }}, { $pushAll: {_products: [product] }}, {multi: true}, function(err) {
      });

      res.json({ product });
    })
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
