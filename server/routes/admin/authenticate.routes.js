import { Router } from 'express';
import * as AdminController from '../../controllers/admin/authenticate.controller';
const router = new Router();
// Add a new Admin
router.route('/register').post(AdminController.addAdmin);
// Admin login
router.route('/login').post(AdminController.adminLogin);

export default router;
