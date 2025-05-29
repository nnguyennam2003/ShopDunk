import express from 'express';
import { isAdmin, protect } from '../middleware/auth.middleware.js';
import { createNewProduct, deleteProduct } from '../controllers/admin.product.controller.js';
import { getProductById, getProductsByCategory } from '../controllers/product.controller.js';
import upload from '../middleware/upload.middleware.js';

const router = express.Router()

router.post('/add-product', protect, isAdmin, upload.any(), createNewProduct)
router.delete('/delete-product/:id', protect, isAdmin, deleteProduct )

router.get('/', getProductsByCategory)
router.get('/:id', getProductById)
export default router;