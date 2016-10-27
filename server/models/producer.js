import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const producerSchema = new Schema({
  name: { type: 'String', required: true },
  display_name: { type: 'String' },
  email: { type: 'String' },
  website: { type: 'String' },
  description: { type: 'String' },
  logo: { type: 'String' },
  bg_image: { type: 'String' },
  gender: { type: 'String' },
  geo_position: { type: 'String' },
  cuid: { type: 'String', required: true },
  city: { type: 'String' },
  country: { type: 'String' },
});

export default mongoose.model('Producer', producerSchema);
