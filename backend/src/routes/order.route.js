import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { createOrder, getAllOrder, getOrderDetail } from '../controllers/order.controller.js';

const router = express.Router();

router.post('/', protect, createOrder)
router.get('/:id', protect, getOrderDetail)
router.get('/', protect, getAllOrder)

export default router;