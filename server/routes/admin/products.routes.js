import { Router } from 'express';
import * as ProductController from '../../controllers/admin/product.controller';
const router = new Router();

router.route('/products').get(ProductController.getProducts);

router.route('/edit/:cuid').post(ProductController.updateProduct);

router.route('/delete/:cuid').delete(ProductController.deleteProduct);

export default router;
