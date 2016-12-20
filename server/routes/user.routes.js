import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

// Add a new User
router.route('/users').post(UserController.addUser);

router.route('/time').post(UserController.timeSlot);
// Get all Users
router.route('/users').get(UserController.getUsers);

// Get one User by cuid
router.route('/users/:cuid').get(UserController.getUser);

// Delete User by cuid
router.route('/users/:cuid').delete(UserController.deleteUser);
export default router;
