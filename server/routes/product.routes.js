import { Router } from 'express';
import * as ProductController from '../controllers/product.controller';

const router = new Router();
// Add a new Product
router.route('/products').post(ProductController.addProduct);

// Get all Products
router.route('/products').get(ProductController.getProducts);

// Get one Product by cuid
router.route('/products/:cuid').get(ProductController.getProduct);

// Delete Product by cuid
router.route('/products/:cuid').delete(ProductController.deleteProduct);

export default router;
