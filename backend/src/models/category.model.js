import db from '../config/db.js'

// Create a new category
export const createCategoryFromDB = async (name) => {
    const result = await db.query(
        "INSERT INTO categories (name) VALUES ($1) RETURNING *",
        [name]
    )
    return result.rows[0] // Trả về category vừa tạo
}

// Get all categories
export const getAllCategoriesFromDB = async () => {
    const result = await db.query('SELECT * FROM categories')
    return result.rows
}

export const deleteCategoryFromDB = async (id) => {
    const result = await db.query('DELETE FROM categories WHERE id = $1 RETURNING *', [id])
    return result.rows[0] // Trả về category vừa xóa
}