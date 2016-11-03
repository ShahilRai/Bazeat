import { Router } from 'express';
import * as ProfileController from '../controllers/profile.controller';
const router = new Router();

// Add a new Order
router.route('/create_profile').post(ProfileController.addProfile);
router.route('/profiles').post(ProfileController.updateProfile);
router.route('/edit').get(ProfileController.getProfile);

export default router;
