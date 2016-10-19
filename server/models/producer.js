import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const producerSchema = new Schema({
  name: { type: 'String', required: true },
  displayName: { type: 'String' },
  email: { type: 'String' },
  website: { type: 'String' },
  description: { type: 'String' },
  logo: { type: 'String' },
  bgImage: { type: 'String' },
  gender: { type: 'String' },
  geoPosition: { type: 'String' },
  cuid: { type: 'String', required: true },
  city: { type: 'String' },
  country: { type: 'String' },
});

export default mongoose.model('Producer', producerSchema);
