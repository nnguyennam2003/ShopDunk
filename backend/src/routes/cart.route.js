import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { addToCart, getListCart, removeFromCart } from '../controllers/cart.controller.js';

const router = express.Router()

router.get('/', protect, getListCart)
router.post('/add-to-cart', protect, addToCart)
router.delete('/remove-from-cart', protect, removeFromCart)

export default router