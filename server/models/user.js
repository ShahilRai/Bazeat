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
  firstName: { type: 'String', required: true },
  lastName: { type: 'String' },
  displayName: { type: 'String' },
  email: { type: 'String' },
  photo: { type: 'String' },
  description: { type: 'String' },
  // birthDate: { type: 'Date' },
  // gender: { type: 'String' },
  cuid: { type: 'String' },
  password: { type: 'String' },
  city: { type: 'String' },
  country: { type: 'String' },
  dateJoined: { type: 'Date', default: Date.now },
  producerInfo: [ifProducer],
  userInfo: [ifUser],
  products: [{ type: Schema.ObjectId, ref: 'Product' }]
});

export default mongoose.model('User', userSchema);
