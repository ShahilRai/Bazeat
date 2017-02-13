import Product from '../models/product';
import User from '../models/user';
import ProductCategory from '../models/productcategory';
import Allergen from '../models/allergen';
import Ingredient from '../models/ingredient';
import Like from '../models/like';
import cuid from 'cuid';

export function addProduct(req, res) {
  User.findOne({ email: req.body.fieldValues.email }).exec((error, user) => {
    const newProduct = new Product(req.body.fieldValues);
    newProduct.cuid = cuid();
    newProduct._producer = user._id;
    newProduct.save((err, product) => {
      console.log(err)
      if (err) {
       return res.status(422).send(err);
      }
      else{
        return res.json({ product: product });;
      }
    })
  });
}

export function calculatePrice(req, res){
  let baz_fee = 3;
  let base_price = 0;
  let calculated_price = 0;
  let calculation = ((parseInt(req.query.price)*10)/100)+baz_fee
  calculated_price = parseInt(req.query.price) + calculation;
  base_price = parseInt(req.query.price);
  return res.json({ base_price: base_price,calculated_price: calculated_price  });
}

export function updateProduct(req, res) {
  Product.findOneAndUpdate({cuid: req.params.cuid }, {$set: req.body.fieldValues}, {new: true}).exec((err, product) => {
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
    if (product.quantity <= 0){
      Product.findOneAndUpdate({_id: product._id}, {$set: {is_disable: true}}, {new: true}).exec((err, product1) => {
        return res.json({product1});
      })
    }
    else{
      Product.findOneAndUpdate({_id: productr._id}, {$set: {is_disable: false}}, {new: true}).exec((err, product2) => {
        return res.json({product2});
      })
    }
  });
}

export function purchaseProduct(req, res) {
  Product.findOne({ cuid: req.body.cuid }).exec((err, product) =>{
    User.findOne({ email: req.body.email}).exec((err, user) => {
        product.buyers.push(user);
        product.save((err, product1) => {
          if (err) {
            return  res.status(422).send(err);
          }
          else{
            return res.json({ product: product1 });
          }
        });
    });
  });
}

export function getProducts(req, res) {
  User.findOne({email: req.query.email}).exec(function(err, cuser) {
    let data = {}
    if(cuser) {
      data._producer = {"$ne": cuser._id}
    }
    Product.find(data).sort('-dateAdded').populate('_producer ingredients allergens product_category').exec((err, products) => {
      if (err) {
        return res.status(422).send(err);
      }
      else {
        let item_arrays = []
        if(cuser) {
            for (var i = 0, len = products.length; i < len; i++) {
              (function(i) {
                let item = products[i];
                let items = {item}
                Like.find({ _product: item._id, _liker: cuser._id }).exec(function(err, plikes) {
                  items.is_like = ((plikes.length == 0) ? false : true)
                  item_arrays.push(items)
                  if(item_arrays.length == products.length) {
                    return res.json({ item_arrays: item_arrays.sort() });
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
                return res.json({ item_arrays: item_arrays.sort() });
              }
            })(i);
          }
        }
      }
    });
  });
}

export function getProduct(req, res) {
  console.log(req.params)
  Product.findOne({cuid: req.params.cuid}).populate('ingredients _producer').exec((err, product) => {
    if (err) {
      return res.status(422).send(err);
    }
    else{
     return res.json({ product });
    }
  });
}

export function getBuyers(req, res) {
  Product.findOne({ cuid: req.params.cuid }).populate('buyers _producer').exec((err, buyers) => {
    if (err) {
      return res.status(422).send(err);
    }
    else{
      return res.json({ product: buyers });
    }
    });
}

export function deleteProduct(req, res) {
  Product.findOne({ cuid: req.params.cuid }).exec((err, product) => {
    if (err || product == null) {
      return res.status(422).send({msg: err});
    }
    product.remove(() => {
      return res.status(200).send({msg: "Product deleted successfully"});
    });
  });
}

export function getIngrdients(req, res){
  let re = new RegExp(req.query.search, 'i');
  Ingredient.find({ name: re }).sort('name').select("-_products -__v").exec(function
    (err, ingredients) {
      if (err){
        return res.status(422).send(err);
      }
      else {
        if(ingredients.length > 0){
          return res.json(ingredients: ingredients);
        }
        else{
          const newIngredient = new Ingredient();
          newIngredient.name = req.query.search
          newIngredient.save((err, ingredient) => {
            if (err) {
             return res.status(422).send(err);
            }
            else{
              return res.json([ingredient]);
            }
          })
        }
      }
  })
}

export function getDetails(req, res){
  Allergen.find().sort('-dateAdded').select("-_products -__v").exec((err, allergens) => {
    if (err) {
      return res.status(422).send(err);
    }
    ProductCategory.find().sort('-dateAdded').select("-_products -_product -__v").exec((err, productcategories) => {
      if (err) {
        return res.status(422).send(err);
      }
      return res.json({allergens_list: allergens, product_category_list: productcategories  });
    });
  });
}

export function getUserProducts(req, res) {
   if(!(req.query.email || req.query.cuid)) {
    return res.status(422).send({ error: 'Please send valid email or cuid' });
  }
  let data = {};
  if(req.query.cuid){
    data.cuid = req.query.cuid;
  }
  if(req.query.email){
    data.email = req.query.email;
  }
  User.findOne(data).populate('products').exec((err, user) => {
    if(err){
      return res.status(422).send(err);
    }
    else {
      if (user.products.length > 0) {
        user.products.forEach(function(item, index){
          Product.findOne({ cuid: item.cuid }).populate('allergens').populate('ingredients').populate('product_category').exec((err, product) =>{

            if(err){
              return res.status(422).send(err);
            }
            else{
              user.products[index].allergens = product.allergens;
              user.products[index].ingredients = product.ingredients
              user.products[index].product_category = product.product_category
              if(user.products.length == index+1){
                return res.json({producer: user});
              }
            }
          })
        });
      }
      else {
        res.json({producer: user});
      }
    }
  });
}


export function disableProduct(req, res) {
  Product.update({ cuid: req.params.cuid }, req.body, function(err, product) {
    if (err){
      return res.status(422).send(err);
    }
      return res.json({ product });
  });
}

export function hideProduct(req, res) {
  Product.update({ cuid: req.params.cuid }, req.body, function(err, product) {
    if (err){
      return res.status(422).send(err);
    }
      return res.json({ product });
  });
}

export function showProduct(req, res) {
  Product.update({ cuid: req.params.cuid }, req.body, function(err, product) {
    if (err){
      return res.status(422).send(err);
    }
      return res.json({ product });
  });
}

export function handleProducts(req, res) {
  let data = {};
  if(req.body.is_disable == 'true'){
    data['$set'] ={}
    data['$set']['is_disable'] = false;
  }
  if(req.body.is_disable == 'false'){
    data['$set'] ={}
    data['$set']['is_disable'] = true;
  }
  User.findOne({ email: req.body.email }).exec((err, user) => {
    console.log(user._id)
    Product.update({_producer: user._id}, data, {multi: true}, function(err,product){
      if (err){
      return res.status(422).send(err);
    }
      return res.json({ product });
    });
  });
}

// fetch all products by category_id

export function getProductsByCategory(req, res) {
  User.findOne({cuid: req.query.cuid}).exec((err, producer) => {
    Product.find({ _producer: producer._id, product_category: req.query.category_id }).exec((err, products) => {
      if (err) {
        return res.status(422).send(err);
      }
      else {
        return res.json({ products });
      }
    });
  });
}

// like and unlike for product

export function addRemoveLike(req, res) {
  User.findOne({ email: req.query.email }).exec((error, user) => {
    Product.findOne({ cuid: req.params.cuid }).populate('_producer').exec((error, product) => {
      Like.findOne({ _product: product._id, _liker: user._id }).exec((err, like) => {
        if (like == null) {
          const newLike = new Like();
          newLike._product = product._id;
          newLike._liker = user._id
          newLike.cuid = cuid();
          newLike.save((err, like) => {
            if (err) {
             return res.status(422).send(err);
            }
            else {
              update_like_count(product, 1)
              return res.json({is_like: true, msg: "like product successfully"});
            }
          });
        } else {
          like.remove(() => {
            update_like_count(product, -1)
            return res.status(200).send({is_like: false, msg: "Unlike product successfully"});
          });
        }
      });
    });
  });
}

function update_like_count(product, like_length) {
  product._producer.like_count += like_length
  product._producer.save();
}
