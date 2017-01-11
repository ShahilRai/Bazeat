import mongoose from 'mongoose';
mongoose.plugin(require('meanie-mongoose-to-json'));
const Schema = mongoose.Schema;
import Product from '../models/product';

const slotSchema = new Schema({
  start_time: { type: 'String', required: true },
  end_time: { type: 'String', required: true },
  day: []
});


const ifProducer = new Schema({
  business_name: String,
  org_number: String,
  cmp_web_site: String,
  cmp_description: String,
  cmp_phone_number: Number,
  cmp_contact_person: String,
  cmp_delivery_options: String,
  cmp_city: { type: 'String' },
  cmp_address: { type: 'String' },
  cmp_country: { type: 'String' },
  cmp_postal_code: { type: 'String' },
  cmp_loc: {
    type: [Number],
    index: '2d'
  },
});

const ifUser = new Schema({
  gender: String,
  website: String,
  last_login: Date,
  delivery_price: Number,
  favourites: [],
});

const userSchema = new Schema({
  full_name: { type: 'String' },
  first_name: { type: 'String' },
  last_name: { type: 'String' },
  email: { type: 'String' },
  photo: { type: 'String' },
  bgphoto: { type: 'String' },
  description: { type: 'String' },
  sub_to_vat: { type: 'Boolean', default: false },
  phone: { type: 'Number' },
  customer_id: { type: 'String' },
  account_id: { type: 'String' },
  cuid: { type: 'String' },
  city: { type: 'String' },
  address: { type: 'String' },
  country: { type: 'String' },
  postal_code: { type: 'String' },
  birth_date: { type: 'Date'},
  date_joined: { type: 'Date', default: Date.now },
  if_producer: { type: 'Boolean', default: false },
  if_user: { type: 'Boolean', default: false },
  if_visible: { type: 'Boolean', default: false },
  if_disable: { type: 'Boolean', default: false },
  producer_info: { type: ifProducer, default: ifProducer },
  user_info: { type: ifUser, default: ifUser },
  products: [{ type: Schema.ObjectId, ref: 'Product' }],
  orderitems: [{ type: Schema.ObjectId, ref: 'OrderItem' }],
  unique_id: { type: String },
  default_shipping: { type: Number },
  account_number: {type: Number},
  loc: {
    type: [Number],
    index: '2d'
  },
  timeslots: [slotSchema],
  showInfo: { type: 'Boolean', default: false }
});

userSchema.post('remove', function(user) {
  Product.update({_producer: {"$in": user._id }}, { $pullAll: {_producer: user._id }}, {multi: true}, function(err) {
  });
});

export default mongoose.model('User', userSchema);
