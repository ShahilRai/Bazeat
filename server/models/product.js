import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
  product_name: { type: 'String' },
  photo: { type: 'String' },
  description: { type: 'String' },
  producer_id: ObjectId,
  SKU: { type: 'String' },
  price: { type: 'Date' },
  cuid: { type: 'String' },
  orderitems: [{ type: Schema.ObjectId, ref: 'OrderItem' }],
  // user: { type: ObjectId, ref:"User", childPath: "products" }
  _producer: { type: ObjectId, ref: 'User' },
  buyers: [{ type: ObjectId, ref: 'User' }],
  nutrition_fact: {
    kJ: { type: String, lowercase: true, trim: true },
    kcal: { type: String, lowercase: true, trim: true },
    carbs: { type: String, lowercase: true, trim: true },
    fiber: { type: String, lowercase: true, trim: true },
    protein: { type: String, lowercase: true, trim: true },
    fat: { type: String, lowercase: true, trim: true },
  },
  product_category: { type: Schema.ObjectId, ref: 'ProductCategory' },
  allergens: [{ type: Schema.ObjectId, ref: 'ProductCategory' }]
});

export default mongoose.model('Product', productSchema);
