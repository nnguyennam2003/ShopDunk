import db from '../config/db.js';

// Create a new category
export const createProductFromDB = async (name, description, price, price_sale, color, storage, category_id) => {
    const result = await db.query(
        `INSERT INTO products (name, description, price, price_sale, color, storage, category_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [name, description, price, price_sale, color, storage, category_id]
    );
    return result.rows[0];
};

// Get products by category name
export const getProductsByCategoryFromDB = async (categoryName) => {
    const result = await db.query(
        `SELECT p.*, (
            SELECT image_url 
            FROM product_images 
            WHERE product_id = p.id 
            LIMIT 1
        ) AS image_url
        FROM products p
        JOIN categories c ON p.category_id = c.id
        WHERE c.name = $1`,
        [categoryName]
    );
    return result.rows;
};

// Get all products
export const getAllProductsFromDB = async () => {
    const result = await db.query(
        `SELECT p.*, (
            SELECT image_url 
            FROM product_images 
            WHERE product_id = p.id 
            LIMIT 1
        ) AS image_url
        FROM products p`
    );
    return result.rows;
};

// Get products by ID
export const getProductByIdFromDB = async (productId) => {
    const productResult = await db.query(
        `SELECT * FROM products WHERE id = $1`,
        [productId]
    );

    if (productResult.rows.length === 0) return null;

    const product = productResult.rows[0];

    const imageResult = await db.query(
        `SELECT image_url FROM product_images WHERE product_id = $1`,
        [productId]
    );

    product.images = imageResult.rows.map(row => row.image_url);
    return product;
};

// Delete product by ID
export const deleteProductByIdFromDB = async (productId) => {
    await db.query(
        `DELETE FROM product_images WHERE product_id = $1`,
        [productId]
    );

    const result = await db.query(
        `DELETE FROM products WHERE id = $1`,
        [productId]
    );

    return result.rowCount; // Số dòng bị ảnh hưởng
};
