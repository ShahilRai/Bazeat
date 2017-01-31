import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const cartitems = new Schema({
  product_id: { type: ObjectId, ref: 'Product' },
  product_amt: {type: 'Number', default: 0},
  product_total_amt: {type: 'Number', default: 0},
  qty: Number,
  product_image: { type: 'String' },
  product_name: { type: 'String' }
});


const cartSchema = new Schema({
  user: { type: ObjectId, ref: 'User' },
  cuid: { type: 'String', required: true },
  total_price: {type: 'Number', default: 0},
  total_qty: {type: 'Number', default: 0},
  total_weight: {type: 'Number', default: 0},
  address: {
    email: { type: 'String' },
    first_name: { type: 'String' },
    last_name: { type: 'String' },
    co: { type: 'String' },
    postal_code: { type: 'String' },
    city: { type: 'String' },
    line1: { type: 'String' },
    country: { type: 'String' },
    phone_num: { type: 'String' }
  },
  cartitems: [cartitems]},
  { timestamps: true }
);

export default mongoose.model('Cart', cartSchema);
