import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
  product_name: { type: 'String' },
  photo: { type: 'String' },
  description: { type: 'String' },
  producer_d: ObjectId,
  SKU: { type: 'String' },
  price: { type: 'Date' },
  cuid: { type: 'String' },
  orderitems: [{ type: Schema.ObjectId, ref: 'OrderItem' }],
  // user: { type: ObjectId, ref:"User", childPath: "products" }
  _producer: { type: ObjectId, ref: 'User' },
  buyers: [{ type: ObjectId, ref: 'User' }],
});

export default mongoose.model('Product', productSchema);
