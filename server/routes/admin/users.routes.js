import { Router } from 'express';
import * as UserController from '../../controllers/admin/user.controller';
const router = new Router();

router.route('/users').get(UserController.getUsers);

router.route('/users/:_id').put(UserController.updateUser);

router.route('/users/:_id').delete(UserController.deleteUser);

export default router;
