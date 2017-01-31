import mongoose from 'mongoose';
import ProductCategory from '../models/productcategory';
import Allergen from '../models/allergen';
import Ingredient from '../models/ingredient';
import User from '../models/user';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
mongoose.plugin(require('meanie-mongoose-to-json'));

const productSchema = new Schema({
  product_name: { type: 'String', required: true },
  photo: { type: 'String' },
  description: { type: 'String', required: true },
  // SKU: { type: 'String' },
  base_price: { type: 'Number', required: true },
  calculated_price: { type: 'Number', default: 0 },
  cuid: { type: 'String', required: true },
  // orderitems: [{ type: Schema.ObjectId, ref: 'OrderItem' }],
  orders: [{ type: Schema.ObjectId, ref: 'Order' }],
  _producer: { type: ObjectId, ref: 'User' },
  buyers: [{ type: ObjectId, ref: 'User' }],
  food_type: { type: 'String', required: true },
  quantity: { type: 'Number' },
  portion: { type: 'Number', required: true },
  expiry_date: { type: 'Date', default: Date.now },
  nutrition_fact: {
    kj: { type: String, lowercase: true, trim: true },
    kcal: { type: String, lowercase: true, trim: true },
    carbs: { type: String, lowercase: true, trim: true },
    fiber: { type: String, lowercase: true, trim: true },
    protein: { type: String, lowercase: true, trim: true },
    fat: { type: String, lowercase: true, trim: true },
  },
  weight: { type: 'Number' },
  length: { type: 'String' },
  width:  { type: 'String' },
  height: { type: 'String' },
  bought_items: { type: 'Boolean', default: false },
  locally_produced_items: { type: 'Boolean', default: false },
  shipment: { type: 'String' },
  additional_items: { type: 'String' },
  pickup: { type: 'Boolean', default: false },
  send: { type: 'Boolean', default: false },
  pickup_time: { type: 'Date', default: Date.now },
  is_hidden: { type: 'Boolean', default: false },
  is_disable: { type: 'Boolean', default: false },
  product_category: { type: Schema.ObjectId, ref: 'ProductCategory' },
  allergens: [{ type: Schema.ObjectId, ref: 'Allergen' }],
  ingredients: [{ type: Schema.ObjectId, ref: 'Ingredient' }]},
  { timestamps: true }
);

productSchema.post('save', function(product) {
  ProductCategory.findByIdAndUpdate(product.product_category, {$push: {_products: product}} , function(err, model) {
  })
  Allergen.update({_id: {"$in": product.allergens }}, { $pushAll: {_products: [product] }}, {multi: true}, function(err) {
  });
  Ingredient.update({_id: {"$in": product.allergens }}, { $pushAll: {_products: [product] }}, {multi: true}, function(err) {
  });
  User.update({_id: {"$in": product._producer }}, { $pushAll: {products: [product] }}, {multi: true}, function(err) {
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
  User.update({ products: product._id }, { $pullAll: { products : [product._id] }},
    { safe: true, multi: true },
    function removeConnectionsCB(err, obj) {
    });
});

export default mongoose.model('Product', productSchema);
