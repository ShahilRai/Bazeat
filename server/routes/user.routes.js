import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();
// Add a new User
router.route('/users').post(UserController.addUser);

router.route('/time').post(UserController.timeSlot);
// Get all Users
router.route('/users').get(UserController.getUsers);

// Get one User by cuid
router.route('/user').get(UserController.getUser);

// Delete User by cuid
router.route('/users').delete(UserController.deleteUser);

// Add Stripe Bank Account User by cuid
router.route('/bank_account').post(UserController.addBankAccount);

router.route('/payment').post(UserController.Payment);

router.route('/hide_account').put(UserController.hideAccount);

router.route('/disable_account').put(UserController.disableAccount);

export default router;
