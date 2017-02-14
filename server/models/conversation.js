import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import User from '../models/user';
import Message from '../models/message';

const conversationSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message'}]},
  { timestamps: true }
);

conversationSchema.post('findOne', function(conversation) {
  if(conversation) {
    Message.update({conversation_id: conversation._id}, {$set: {unread: false}} , function(err, model) {
    })
  }
});

export default mongoose.model('Conversation', conversationSchema);
