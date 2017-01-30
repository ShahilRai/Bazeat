import { Router } from 'express';
import * as CartController from '../controllers/cart.controller';
const router = new Router();

  router.route('/cart/:cuid').get(CartController.getCart);

// Add to cart
  router.route('/carts').post(CartController.createCart);

// Remove cartitems by _id
  router.route('/remove/cart_items').delete(CartController.removeCartItems);

// Empty cart
  router.route('/empty/cart').delete(CartController.emptyCart);
export default router;
