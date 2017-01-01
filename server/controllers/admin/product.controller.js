import Admin from '../../models/admin';
import Product from '../../models/product';
import ProductCategory from '../../models/productcategory';
import Allergen from '../../models/allergen';
import Ingredient from '../../models/ingredient';


export function getProducts(req, res) {
  let end = parseInt(req.query._end, 10);
  let start = parseInt(req.query._start, 10);
  let sort = req.query._sort;
  let order = '';
  if (req.query._order == 'DESC'){
    order = 'descending';
  }
  if (req.query._order == 'ASC')
  {
    order = 'ascending';
  }
  Product.find().exec((err, total_products) => {
    Product.find().sort([[sort, order]]).limit(end).skip(start).exec((err, products) => {
      if (err) {
        return res.status(500).send(err);
      }
      else{
        res.setHeader('X-Total-Count', total_products.length);
        res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
        res.setHeader('X-Content-Type-Options', 'npsniff');
        res.json( products );
        return;
      }
    });
  });
}

export function updateProduct(req, res) {
  Product.findOne({ _id: req.params._id }).exec((err, product) => {
    Product.update({ _id: req.params._id }, req.body, function(err, model) {
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
  Product.findOne({ _id: req.params._id }).exec((err, product) => {
    if (err || product == null) {
      return res.status(500).send({msg: err});
    }
    product.remove(() => {
      return res.status(200).send({msg: "Product deleted successfully"});
    });
  });
}



