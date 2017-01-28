import { Router } from 'express';
import * as OrderController from '../controllers/order.controller';
const router = new Router();
// Add a new Order
router.route('/orders').post(OrderController.addOrder);

// Get all Orders
router.route('/orders').get(OrderController.getOrders);

// Get one Order by cuid
router.route('/orders/:cuid').get(OrderController.getOrder);

// Get one Shipping Price
router.route('/shipping_price').put(OrderController.getShippingPrice);

// Update order address when budamat
router.route('/budamat_address').put(OrderController.budamatAddress);

router.route('/hentemat_address').get(OrderController.hentematAddress);

// router.route('/orders/cart/:cuid').get(OrderController.cartCheckout);

// Delete Order by cuid
router.route('/orders/:cuid').delete(OrderController.deleteOrder);

export default router;
