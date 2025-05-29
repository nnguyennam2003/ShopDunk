import express from 'express';
import { isAdmin, protect } from '../middleware/auth.middleware.js';
import { createNewUser, editUser, getAllUsers, getMe, getUserById, removeUser } from '../controllers/admin.user.controller.js';

const router = express.Router();

router.post('/add-user', protect, isAdmin, createNewUser);
router.get('/users', protect, isAdmin, getAllUsers);
router.get('/user/:id', protect, isAdmin, getUserById);
router.put('/edit-user', protect, isAdmin, editUser);
router.delete('/delete-user/:id', protect, isAdmin, removeUser);
router.get('/me', protect, getMe);


export default router;