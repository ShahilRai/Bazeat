import { Router } from 'express';
import * as PageController from '../../controllers/admin/page.controller';
const router = new Router();

router.route('/pages/:_id').put(PageController.updatePage);

router.route('/pages').get(PageController.getPages);

router.route('/pages/:_id').get(PageController.getPage);

export default router;
