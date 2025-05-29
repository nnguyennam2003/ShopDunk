import { createCategoryFromDB, getAllCategoriesFromDB } from "../models/category.model.js";

export const createNewCategory = async (req, res) => {
    const { name } = req.body
    try {
        if (!name) {
            return res.status(400).json({ message: 'Category name is required' })
        }
        const result = await createCategoryFromDB(name)
        res.status(201).json({ message: 'Category created successfully', categoryId: result.insertId })
    } catch (error) {
        res.status(500).json({ message: 'Failed to create category', error: error.message })
    }
}

export const getAllCategories = async (req, res) => {
    try {
        const categories = await getAllCategoriesFromDB()
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch categories', error: error.message })
    }
}