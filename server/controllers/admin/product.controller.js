import Admin from '../../models/admin';
import Product from '../../models/product';


export function getProducts(req, res) {
  Product.find().sort('-dateAdded').exec((err, products) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ products });
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



