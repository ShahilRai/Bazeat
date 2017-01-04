import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import User from '../models/user';

const conversationSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User'}],
});

export default mongoose.model('Conversation', conversationSchema);