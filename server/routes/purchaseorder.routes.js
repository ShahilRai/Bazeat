import { Router } from 'express';
import * as PurchaseOrderController from '../controllers/purchaseorder.controller';
const router = new Router();

router.route('/purchaseorders').post(PurchaseOrderController.addpackageOrder);


router.route('/ship_package').post(PurchaseOrderController.shipPackage);

router.route('/get_orders').get(PurchaseOrderController.getpurchaseOrders);


router.route('/get_order').get(PurchaseOrderController.getpurchaseOrder);

router.route('/valid_qty').get(PurchaseOrderController.beforePkgcreate);





export default router;
