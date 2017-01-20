import { Router } from 'express';
import * as CommentController from '../controllers/comment.controller';
const router = new Router();
// Get user conversations
router.route('/reviews').get(CommentController.allReviews);

// Get single conversation messages
router.route('/review').get(CommentController.getReview);

// Create New Conversation
router.route('/reviews').post(CommentController.newReview);
// Send reply
router.route('/send_reply').put(CommentController.sendReply);
export default router;
