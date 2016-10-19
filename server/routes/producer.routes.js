import { Router } from 'express';
import * as ProducerController from '../controllers/producer.controller';
const router = new Router();

// Add a new Producer
router.route('/producers').post(ProducerController.addProducer);

// Get all Producers
router.route('/producers').get(ProducerController.getProducers);

// Get one Producer by cuid
router.route('/producers/:cuid').get(ProducerController.getProducer);

// Delete Producer by cuid
router.route('/producers/:cuid').delete(ProducerController.deleteProducer);

export default router;
