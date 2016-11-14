import mongoose from 'mongoose';
import ProductCategory from '../models/productcategory';
import Allergen from '../models/allergen';
import Ingredient from '../models/ingredient';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
  product_name: { type: 'String' },
  photo: { type: 'String' },
  description: { type: 'String' },
  SKU: { type: 'String' },
  price: { type: 'Number' },
  cuid: { type: 'String' },
  orderitems: [{ type: Schema.ObjectId, ref: 'OrderItem' }],
  _producer: { type: ObjectId, ref: 'User' },
  buyers: [{ type: ObjectId, ref: 'User' }],
  food_type: { type: 'String' },
  nutrition_fact: {
    kj: { type: String, lowercase: true, trim: true },
    kcal: { type: String, lowercase: true, trim: true },
    carbs: { type: String, lowercase: true, trim: true },
    fiber: { type: String, lowercase: true, trim: true },
    protein: { type: String, lowercase: true, trim: true },
    fat: { type: String, lowercase: true, trim: true },
  },
  product_category: { type: Schema.ObjectId, ref: 'ProductCategory' },
  allergens: [{ type: Schema.ObjectId, ref: 'Allergen' }],
  ingredients: [{ type: Schema.ObjectId, ref: 'Ingredient' }],
});

productSchema.post('save', function(product) {
  ProductCategory.findByIdAndUpdate(product.product_category, {$push: {_products: product}} , function(err, model) {
  })
  Allergen.update({_id: {"$in": product.allergens }}, { $pushAll: {_products: [product] }}, {multi: true}, function(err) {
  });
  Ingredient.update({_id: {"$in": product.allergens }}, { $pushAll: {_products: [product] }}, {multi: true}, function(err) {
  });
});


productSchema.post('remove', function(product) {
  ProductCategory.update({ _products: product._id }, {$pullAll: {_products: [product._id]}}, { safe: true, multi: true }, function(err, model) {
    })
  Allergen.update({ _products: product._id }, { $pullAll: { _products : [product._id] }},
    { safe: true, multi: true },
    function removeConnectionsCB(err, obj) {
    });
  Ingredient.update({ _products: product._id }, { $pullAll: { _products : [product._id] }},
    { safe: true, multi: true },
    function removeConnectionsCB(err, obj) {
    });
});

export default mongoose.model('Product', productSchema);
