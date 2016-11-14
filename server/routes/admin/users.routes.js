import { Router } from 'express';
import * as UserController from '../../controllers/admin/user.controller';
const router = new Router();

router.route('/allusers').get(UserController.allUsers);


router.route('/edit').post(UserController.editUser);

router.route('/user/destroy').delete(UserController.destroyUser);

export default router;
