import { Router } from 'express';
import * as ProductController from '../../controllers/admin/product.controller';
const router = new Router();

router.route('/allproducts').get(ProductController.getProducts);


router.route('/product/edit').post(ProductController.updateProduct);

router.route('/product/destroy').delete(ProductController.deleteProduct);

export default router;
