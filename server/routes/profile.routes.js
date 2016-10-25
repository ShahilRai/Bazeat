import { Router } from 'express';
import * as ProfileController from '../controllers/profile.controller';
const router = new Router();

// Add a new Order
router.route('/create_profile').post(ProfileController.addProfile);

export default router;
