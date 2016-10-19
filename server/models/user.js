import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: 'String', required: true },
  lastName: { type: 'String' },
  displayName: { type: 'String' },
  email: { type: 'String' },
  photo: { type: 'String' },
  description: { type: 'String' },
  birthDate: { type: 'Date' },
  gender: { type: 'String' },
  cuid: { type: 'String', required: true },
  password: { type: 'String', required: true },
  city: { type: 'String' },
  country: { type: 'String' },
  dateJoined: { type: 'Date', default: Date.now },
});

export default mongoose.model('User', userSchema);
