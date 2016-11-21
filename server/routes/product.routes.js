import { Router } from 'express';
import * as ProductController from '../controllers/product.controller';

const router = new Router();
// Add a new Product
// router.route('/products').post(ProductController.addProduct);

// Buy a new Product
router.route('/purchase_products').post(ProductController.purchaseProduct);

// Get all Products
router.route('/products').get(ProductController.getProducts);

// Get all buyers of Product
router.route('/product_buyers/:cuid').get(ProductController.getBuyers);

// Get one Product by cuid
router.route('/products/:cuid').get(ProductController.getProduct);

// Update product
router.route('/products/:cuid').post(ProductController.updateProduct);

// Delete Product by cuid
router.route('/products/:cuid').delete(ProductController.deleteProduct);

// Get Ingredients
router.route('/ingredients').get(ProductController.getIngrdients);

// Get Product details
router.route('/details').get(ProductController.getDetails);

// Get Producer Product details
router.route('/user_products/:email').get(ProductController.getUserProducts);

export default router;
