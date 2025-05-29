import db from '../config/db.js';

// Tạo danh mục
export const createCategoryFromDB = async (name) => {
    const result = await db.query(
        "INSERT INTO categories (name) VALUES ($1) RETURNING *",
        [name]
    );
    return result.rows[0]; // Trả về category vừa tạo
};

// Lấy toàn bộ danh mục
export const getAllCategoriesFromDB = async () => {
    const result = await db.query('SELECT * FROM categories');
    return result.rows;
};
