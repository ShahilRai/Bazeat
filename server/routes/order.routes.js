import { Router } from 'express';
import * as OrderController from '../controllers/order.controller';
const router = new Router();
// Add a new Order
router.route('/orders').post(OrderController.addOrder);

// Get all Orders
router.route('/orders').get(OrderController.getOrders);

// Get one Order by cuid
router.route('/orders/:cuid').get(OrderController.getOrder);

// Delete Order by cuid
router.route('/orders/:cuid').delete(OrderController.deleteOrder);

export default router;
