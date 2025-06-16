import express from 'express'
import { login, logout, signup, refreshAccessToken, loginWithGoogle } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/register', signup)
router.post('/login', login)
router.post('/google', loginWithGoogle)
router.post('/logout', logout)
router.get('/refresh-token', refreshAccessToken)

export default router