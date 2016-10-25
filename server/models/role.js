import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: { type: 'String' },
});

export default mongoose.model('Role', roleSchema);
