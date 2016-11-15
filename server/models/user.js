import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ifProducer = new Schema({
  // logo: String,
  // contact_person: String,
  // bg_image: String,
  // is_validated: Boolean,
  // website: String,
  // geo_position: String,
  // num_likes: Number,
  // num_ratings: [],
  // products: [],
  // ratings: [],
  business_name: String,
  org_number: String,
  account_number: String,
  sub_to_vat: { type: 'Boolean', default: false },
  cmp_web_site: String,
  cmp_description: String,
  cmp_phone_number: Number,
  cmp_city: { type: 'String' },
  cmp_address: { type: 'String' },
  cmp_postal_code: { type: 'String' },
  cmp_delivery_options: String,
});

const ifUser = new Schema({
  birthDate: Date,
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
  cuid: { type: 'String' },
  date_joined: { type: 'Date', default: Date.now },
  if_producer: { type: 'Boolean', default: true },
  if_user: { type: 'Boolean', default: false },
  producer_info: { type: ifProducer, default: ifProducer },
  user_info: { type: ifUser, default: ifUser },
  products: [{ type: Schema.ObjectId, ref: 'Product' }],
  orderitems: [{ type: Schema.ObjectId, ref: 'OrderItem' }],
  unique_id: { type: String }
});

export default mongoose.model('User', userSchema);
