import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const cartitems = new Schema({
  productID: [{ type: ObjectId, ref: 'Product' }],
  qty: Number
});


const cartSchema = new Schema({
  user: { type: ObjectId, ref: 'User' },
  cuid: { type: 'String', required: true },
  cartitems: [cartitems]
});

export default mongoose.model('Cart', cartSchema);
