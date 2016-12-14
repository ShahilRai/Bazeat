import { Router } from 'express';
import * as SearchController from '../controllers/search.controller';
const router = new Router();

// Get user by location
router.route('/search/location').get(SearchController.gecodeLocation);

// Get users
router.route('/search/users').get(SearchController.usersResults);

// Get products
router.route('/search/products').get(SearchController.productsResults);

export default router;
