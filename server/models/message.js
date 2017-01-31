import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  conversation_id: { type: Schema.Types.ObjectId, required: true },
  body: { type: String, required: true },
  unread: { type: Boolean, default: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: Schema.Types.ObjectId, ref: 'User' }},
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
