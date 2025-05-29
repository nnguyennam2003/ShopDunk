import express from 'express';
import { login, logout, signup, refreshAccessToken } from '../controllers/auth.controller.js';
import { getMe } from '../controllers/admin.user.controller.js';

const router = express.Router();

router.post('/register', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/refresh-token', refreshAccessToken);


export default router;