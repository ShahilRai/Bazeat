import { Router } from 'express';
import * as UserController from '../../controllers/admin/user.controller';
const router = new Router();

router.route('/allusers').get(UserController.getUsers);


router.route('/user/edit').post(UserController.updateUser);

router.route('/user/destroy').delete(UserController.deleteUser);

export default router;
