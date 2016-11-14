import { Router } from 'express';
import * as UserController from '../../controllers/admin/user.controller';
const router = new Router();

router.route('/allusers').get(UserController.getUsers);

router.route('/users/:email').post(UserController.updateUser);

router.route('/users/:email').delete(UserController.deleteUser);

export default router;
