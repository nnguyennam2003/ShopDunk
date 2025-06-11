import express from 'express'
import { protect, isAdmin } from '../middleware/auth.middleware.js'
import { addColor, deleteColor, getListColors } from '../controllers/color.controller.js'

const router = express.Router()

router.get('/', protect, isAdmin, getListColors)
router.post('/', protect, isAdmin, addColor)
router.delete('/:id', protect, isAdmin, deleteColor)

export default router