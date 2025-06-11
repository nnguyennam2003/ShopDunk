import express from 'express'
import { isAdmin, protect } from '../middleware/auth.middleware.js'
import { createNewCategory, getAllCategories, deleteCategory } from '../controllers/admin.category.controller.js'

const router = express.Router()

router.post('/add-category', protect, isAdmin, createNewCategory)
router.get('/', protect, isAdmin, getAllCategories)
router.delete('/delete-category/:id', protect, isAdmin, deleteCategory)

export default router