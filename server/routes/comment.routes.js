import { Router } from 'express';
import * as CommentController from '../controllers/comment.controller';
const router = new Router();
// Get user conversations
router.route('/reviews').get(CommentController.allReviews);

// Get single conversation messages
router.route('/review').get(CommentController.getReview);

// Create New Conversation
<<<<<<< HEAD
router.route('/reviews').post(CommentController.newReview);
=======
router.route('/new/review/:reviewed_for').post(CommentController.newReview);
>>>>>>> 237a1ac94f5ccdda74aec93e47c0b12aeab2c1bf

// Send reply
router.route('/send_reply').put(CommentController.sendReply);
export default router;
