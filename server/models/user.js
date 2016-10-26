import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ifProducer = new Schema({
  logo: String,
  bgImage: String,
  isValidated: Boolean,
  website: String,
  geoPosition: String,
  numLikes: Number,
  numRatings: [],
  products: [],
  ratings: [],
});

const ifUser = new Schema({
  birthDate: Date,
  photo: String,
  gender: String,
  website: String,
  lastLogin: Date,
  deliveryPrice: Number,
  tlfNumber: Number,
  favourites: [],
});

const userSchema = new Schema({
  fullName: { type: 'String' },
  email: { type: 'String' },
  photo: { type: 'String' },
  description: { type: 'String' },
  cuid: { type: 'String' },
  city: { type: 'String' },
  dateJoined: { type: 'Date', default: Date.now },
  producerInfo: [ifProducer],
  userInfo: [ifUser],
  products: [{ type: Schema.ObjectId, ref: 'Product' }],
  orderitems: [{ type: Schema.ObjectId, ref: 'OrderItem' }],
  uniqueId: { type: String }
});

export default mongoose.model('User', userSchema);
