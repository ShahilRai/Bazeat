import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const purchaseorderSchema = new Schema({
  _producer: { type: ObjectId, ref: 'User' },
  _buyer: { type: ObjectId, ref: 'User' },
  _order: { type: ObjectId, ref: 'Order' }
});

export default mongoose.model('PurchaseOrder', purchaseorderSchema);


