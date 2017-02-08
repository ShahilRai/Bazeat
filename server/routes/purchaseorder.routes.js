import { Router } from 'express';
import * as PurchaseOrderController from '../controllers/purchaseorder.controller';
const router = new Router();

router.route('/create_package').post(PurchaseOrderController.createPackage);

router.route('/update_package').put(PurchaseOrderController.updatePackage);

router.route('/ship_package').put(PurchaseOrderController.shipPackage);

router.route('/get_orders').get(PurchaseOrderController.getpurchaseOrders);

router.route('/order_email_data').get(PurchaseOrderController.getEmailOrders);

router.route('/send_email').put(PurchaseOrderController.sendOrderEmail);

router.route('/get_packages').get(PurchaseOrderController.getPackages);

router.route('/get_order').get(PurchaseOrderController.getpurchaseOrder);

router.route('/valid_qty').get(PurchaseOrderController.beforePkgcreate);

router.route('/update_deliver').put(PurchaseOrderController.updateToDeliver);

router.route('/update_ship_address').put(PurchaseOrderController.updateOrderAddress);

router.route('/destroy_package').delete(PurchaseOrderController.packageDestroy);

router.route('/delete_shipment').get(PurchaseOrderController.deleteShipment);

export default router;
