import { getUsersFromDB, getUserByIdFromDB, createUserFromDB, editUserFromDB, deleteUserFromDB } from "../models/user.model.js";
import bcrypt from 'bcryptjs';

export const createNewUser = async (req, res) => {
    try {
        const { email, phone, fullName, gender, birthday, password, role } = req.body;
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await createUserFromDB(email, phone, fullName, gender, birthday, hashedPassword, role);
        delete user.password;
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user', error: error.message });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await getUsersFromDB();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
}

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUserByIdFromDB(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user', error: error.message });
    }
}

export const editUser = async (req, res) => {
    const { id, email, phone, fullName, gender, birthday, role } = req.body;
    try {
        const result = await editUserFromDB(id, email, phone, fullName, gender, birthday, role);
        if (result.affectedRows === 1) {
            const updatedUser = await getUserByIdFromDB(id);
            res.status(200).json({ message: 'User updated successfully', user: updatedUser });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user', error: error.message });
    }
}

export const removeUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await deleteUserFromDB(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await getUserByIdFromDB(req.user.userId)
        if (!user) return res.status(404).json({ message: "User not found" })

        res.status(200).json({ user })
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch user info', error: err.message })
    }
}