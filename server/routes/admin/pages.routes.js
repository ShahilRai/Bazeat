import { Router } from 'express';
import * as PageController from '../../controllers/admin/page.controller';
const router = new Router();

router.route('/pages/:type').put(PageController.updatePage);

router.route('/pages/:type').get(PageController.getPage);

export default router;
