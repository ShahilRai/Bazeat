import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const packageSchema = new Schema({
  status: String,
  delivery_method: String,
  shippment_no: String,
});

export default mongoose.model('Package', packageSchema);
