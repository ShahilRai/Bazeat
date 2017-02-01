import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const packageitemSchema = new Schema({
    _package: { type: ObjectId, ref: 'Package' },
    cuid: { type: 'String', required: true },
    packed_qty: { type: 'Number', default: 0 },
    shipped_qty: { type: 'Number', default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('PackageItem', packageitemSchema);
