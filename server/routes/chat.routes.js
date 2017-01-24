import { Router } from 'express';
import * as ChatController from '../controllers/chat.controller';
const router = new Router();
// Get user conversations
router.route('/conversations').get(ChatController.allConversations);

// Get single conversation messages
router.route('/conversation/:conversation_id').get(ChatController.getConversation);

router.route('/msg_count').get(ChatController.msgCount);

// Create New Conversation
router.route('/conversations').post(ChatController.newConversation);

// Send reply
router.route('/send_reply').post(ChatController.sendReply);
export default router;
