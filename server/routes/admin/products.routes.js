import { Router } from 'express';
import * as ProductController from '../../controllers/admin/product.controller';
const router = new Router();

router.route('/products').get(ProductController.getProducts);

router.route('/products/:_id').put(ProductController.updateProduct);

router.route('/products/:_id').delete(ProductController.deleteProduct);

export default router;
