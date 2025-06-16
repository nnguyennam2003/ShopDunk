
import admin from "../config/firebaseAdmin.js"
import { generateAccessToken, generateRefreshToken } from "../config/utils.js"
import { createUserFromDB, getUserByEmail } from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
    const { email, phone, fullName, gender, birthday, password } = req.body
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" })
    }

    try {
        const existingUser = await getUserByEmail(email)
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const result = await createUserFromDB(email, phone, fullName, gender, birthday, hashedPassword)

        const userId = result.id

        const accessToken = generateAccessToken(userId, "user", res)
        generateRefreshToken(userId, "user", res)

        res.status(201).json({
            message: 'User registered successfully',
            user: { id: userId, email, phone, fullName, gender, birthday, role: 'user' },
            accessToken
        })

    } catch (err) {
        res.status(500).json({ message: 'Registration failed.', error: err.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }

    try {
        const user = await getUserByEmail(email)
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const accessToken = generateAccessToken(user.id, user.role, res)
        generateRefreshToken(user.id, user.role, res)

        res.status(200).json({
            message: 'Login successful',
            user: { id: user.id, email: user.email, phone: user.phone, fullName: user.full_name, gender: user.gender, birthday: user.birthday, role: user.role },
            accessToken
        })

    } catch (err) {
        res.status(500).json({ message: 'Login failed.', error: err.message })
    }
}

export const logout = (req, res) => {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    };

    res.clearCookie('accessToken', cookieOptions);
    res.clearCookie('refreshToken', cookieOptions);

    res.status(200).json({ message: 'Logged out successfully' });
}

export const refreshAccessToken = (req, res) => {
    const token = req.cookies.refreshToken

    if (!token) {
        return res.status(401).json({ message: 'Refresh token not found' })
    }

    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        const { userId, role } = decoded

        const accessToken = generateAccessToken(userId, role, res)

        res.status(200).json({ accessToken })
    } catch (err) {
        console.error('Verify refresh token error:', err)
        res.status(403).json({ message: 'Invalid or expired refresh token' })
    }
}


export const loginWithGoogle = async (req, res) => {
    const { idToken } = req.body;

    if (!idToken) {
        return res.status(400).json({ message: "Missing Google token" });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { email, name, uid } = decodedToken;

        let user = await getUserByEmail(email);
        if (!user) {
            const result = await createUserFromDB(email, null, name, null, null, null);
            user = { ...result, role: 'user' };
        }

        const accessToken = generateAccessToken(user.id, user.role, res);
        generateRefreshToken(user.id, user.role, res);

        res.status(200).json({
            message: 'Login with Google successful',
            user: {
                id: user.id,
                email: user.email,
                fullName: user.full_name,
                phone: user.phone,
                gender: user.gender,
                birthday: user.birthday,
                role: user.role,
            },
            accessToken
        });
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: "Invalid Google token", error: err.message });
    }
  };