import Product from '../models/product';
import User from '../models/user';
import ProductCategory from '../models/productcategory';
import Allergen from '../models/allergen';
import Ingredient from '../models/ingredient';
import cuid from 'cuid';

export function addProduct(req, res) {
  console.log(req.session)
  User.findOne({ email: req.body.fieldValues.email }).exec((error, user) => {
    const newProduct = new Product(req.body.fieldValues);
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
    Product.update({ cuid: req.params.cuid }, req.body.fieldValues, function(err, model) {
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

export function getIngrdients(req, res){
  let re = new RegExp(req.query.search, 'i');
  Ingredient.find().or([{ 'name': { $regex: re }}]).sort('name').select("-_products -__v").exec(function
    (err, ingredients) {
    res.json(ingredients: ingredients);
  })
}

export function getDetails(req, res){
  Allergen.find().sort('-dateAdded').select("-_products -__v").exec((err, allergens) => {
    if (err) {
      res.status(500).send(err);
    }
    ProductCategory.find().sort('-dateAdded').select("-_products -_product -__v").exec((err, productcategories) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({allergens_list: allergens, product_category_list: productcategories  });
    });
  });
}



export function getUserProducts(req, res) {
  User.findOne({ email: req.params.email }).populate('products').exec((err, user) => {
    user.products.forEach(function(item, index){
      Product.findOne({ cuid: item.cuid }).populate('allergens').populate('ingredients').populate('product_category').exec((err, product) =>{
        user.products[index].allergens = product.allergens;
        user.products[index].ingredients = product.ingredients
        user.products[index].product_category = product.product_category
        if(user.products.length == index+1){
          res.json({producer: user});
        }
      })
    });
  });
}
