import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ifProducer = new Schema({
  logo: String,
  contact_person: String,
  bg_image: String,
  is_validated: Boolean,
  website: String,
  geo_position: String,
  num_likes: Number,
  num_ratings: [],
  products: [],
  ratings: [],
});

const ifUser = new Schema({
  birthDate: Date,
  photo: String,
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
  city: { type: 'String' },
  date_joined: { type: 'Date', default: Date.now },
  if_producer: { type: 'Boolean', default: true },
  if_user: { type: 'Boolean', default: true },
  producer_info: { type: ifProducer, default: ifProducer },
  user_info: [ifUser],
  products: [{ type: Schema.ObjectId, ref: 'Product' }],
  orderitems: [{ type: Schema.ObjectId, ref: 'OrderItem' }],
  unique_id: { type: String }
});

export default mongoose.model('User', userSchema);
