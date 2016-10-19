import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
  productName: { type: 'String' },
  photo: { type: 'String' },
  description: { type: 'String'},
  producerId: ObjectId,
  SKU: { type: 'String' },
  price: { type: 'Date' },
  cuid: { type: 'String', required: true },
});

export default mongoose.model('Product', productSchema);
