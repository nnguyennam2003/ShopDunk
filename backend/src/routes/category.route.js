import express from 'express';
import { isAdmin, protect } from '../middleware/auth.middleware.js';
import { createNewCategory, getAllCategories } from '../controllers/admin.category.controller.js';

const router = express.Router();

router.post('/add-category', protect, isAdmin, createNewCategory);
router.get('/', protect, isAdmin, getAllCategories)

export default router;