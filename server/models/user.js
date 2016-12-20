import mongoose from 'mongoose';
mongoose.plugin(require('meanie-mongoose-to-json'));
const Schema = mongoose.Schema;

const ifProducer = new Schema({
  business_name: String,
  org_number: String,
  account_number: String,
  sub_to_vat: { type: 'Boolean', default: false },
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
  timeslots: []
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
  email: { type: 'String' },
  photo: { type: 'String' },
  description: { type: 'String' },
  phone: { type: 'Number' },
  customer_id: { type: 'String' },
  cuid: { type: 'String' },
  city: { type: 'String' },
  address: { type: 'String' },
  country: { type: 'String' },
  postal_code: { type: 'String' },
  birth_date: { type: 'Date', default: Date.now },
  date_joined: { type: 'Date', default: Date.now },
  if_producer: { type: 'Boolean', default: false },
  if_user: { type: 'Boolean', default: false },
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
  }
});

export default mongoose.model('User', userSchema);
