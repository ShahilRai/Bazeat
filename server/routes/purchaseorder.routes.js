import { Router } from 'express';
import * as PurchaseOrderController from '../controllers/purchaseorder.controller';
const router = new Router();

router.route('/purchaseorders').post(PurchaseOrderController.addpurchaseOrder);



export default router;
