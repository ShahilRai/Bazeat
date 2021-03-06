import { Router } from 'express';
import * as ProductController from '../controllers/product.controller';

const router = new Router();
// Add a new Product
router.route('/products').post(ProductController.addProduct);

// Buy a new Product
router.route('/purchase_products').post(ProductController.purchaseProduct);

// Get all Products
router.route('/products').get(ProductController.getProducts);

// Get all buyers of Product
router.route('/product_buyers/:cuid').get(ProductController.getBuyers);

// Get one Product by cuid
router.route('/product/:cuid').get(ProductController.getProduct);

// Update product
router.route('/products/:cuid').put(ProductController.updateProduct);

// Diable product
router.route('/disable_product/:cuid').put(ProductController.disableProduct);

// Hide product
router.route('/hide_product/:cuid').put(ProductController.hideProduct);

// Hide product
router.route('/show_product/:cuid').put(ProductController.showProduct);

// Delete Product by cuid
router.route('/products/:cuid').delete(ProductController.deleteProduct);

// Get Ingredients
router.route('/ingredient').get(ProductController.getIngrdients);

router.route('/ingredients').get(ProductController.listIngredients);

// Get Product details
router.route('/details').get(ProductController.getDetails);

// Get Producer Product details
router.route('/user_products').get(ProductController.getUserProducts);

// Calculate Price
router.route('/calculate_price').get(ProductController.calculatePrice);

// Get Producer Product details
router.route('/handleproducts').put(ProductController.handleProducts);

//Get Products By Category
router.route('/products/category').get(ProductController.getProductsByCategory);

// Like and unlike product
router.route('/like/:cuid').post(ProductController.addRemoveLike);

export default router;
