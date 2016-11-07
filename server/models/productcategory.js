import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productcategorySchema = new Schema({
  name: String,
  _products: [{ type: ObjectId, ref: 'Product' }]
});

export default mongoose.model('ProductCategory', productcategorySchema);
