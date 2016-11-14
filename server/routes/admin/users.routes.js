import { Router } from 'express';
import * as UserController from '../../controllers/admin/user.controller';
const router = new Router();

router.route('/abc').get(UserController.allUsers);
console.log('routes')

export default router;
