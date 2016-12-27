import { Router } from 'express';
import * as CommentController from '../controllers/comment.controller';
const router = new Router();
// Get user conversations
router.route('/reviews').get(CommentController.allReviews);

// Get single conversation messages
router.route('/review/:rating_and_review_id').get(CommentController.getReview);

// Create New Conversation
router.route('/new/:reviewed_for_id').post(CommentController.newReview);

// Send reply
router.route('/:rating_and_review_id').post(CommentController.sendReply);
export default router;
