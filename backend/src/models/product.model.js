import db from '../config/db.js'

// Create a new category
export const createProductFromDB = async (name, description, price, price_sale, storageArray, category_id, colorIds) => {
    // Thêm sản phẩm mới
    const result = await db.query(
        `INSERT INTO products (name, description, price, price_sale, storage, category_id)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [name, description, price, price_sale, storageArray, category_id]
    )
    const product = result.rows[0]

    // Thêm liên kết màu vào product_colors
    if (Array.isArray(colorIds) && colorIds.length > 0) {
        for (const colorId of colorIds) {
            await db.query(
                `INSERT INTO product_colors (product_id, color_id) VALUES ($1, $2)`,
                [product.id, colorId]
            )
        }
    }

    return product
}

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
    )
    const products = result.rows

    for (const product of products) {
        const colorResult = await db.query(
            `SELECT c.id, c.name, c.css_code
             FROM product_colors pc
             JOIN colors c ON pc.color_id = c.id
             WHERE pc.product_id = $1`,
            [product.id]
        )
        product.colors = colorResult.rows
    }

    return products
}

// Get all products
export const getAllProductsFromDB = async () => {
    const result = await db.query(
        `SELECT p.*, 
            c.name AS category_name,
            (
                SELECT image_url 
                FROM product_images 
                WHERE product_id = p.id 
                LIMIT 1
            ) AS image_url
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id`
    )
    const products = result.rows

    // Lấy màu cho từng sản phẩm
    for (const product of products) {
        const colorResult = await db.query(
            `SELECT c.id, c.name, c.css_code
             FROM product_colors pc
             JOIN colors c ON pc.color_id = c.id
             WHERE pc.product_id = $1`,
            [product.id]
        )
        product.colors = colorResult.rows // [{id, name, css_code}, ...]
    }

    return products
}

// Get products by ID
export const getProductByIdFromDB = async (productId) => {
    const productResult = await db.query(
        `SELECT p.*, 
        c.name AS category_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.id = $1`,
        [productId]
    )

    if (productResult.rows.length === 0) return null

    const product = productResult.rows[0]

    // Lấy danh sách ảnh
    const imageResult = await db.query(
        `SELECT image_url FROM product_images WHERE product_id = $1`,
        [productId]
    )
    product.images = imageResult.rows.map(row => row.image_url)

    // Lấy danh sách màu
    const colorResult = await db.query(
        `SELECT c.id, c.name, c.css_code
         FROM product_colors pc
         JOIN colors c ON pc.color_id = c.id
         WHERE pc.product_id = $1`,
        [productId]
    )
    product.colors = colorResult.rows // [{id, name, css_code}, ...]

    return product
}

export const getRelatedProductsFromDB = async (categoryId, excludeProductId, limit = 4) => {
    const result = await db.query(
        `SELECT p.*, 
            c.name AS category_name,
            (
                SELECT image_url 
                FROM product_images 
                WHERE product_id = p.id 
                LIMIT 1
            ) AS image_url
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.category_id = $1 AND p.id != $2
        LIMIT $3`,
        [categoryId, excludeProductId, limit] // <-- thêm dấu phẩy ở đây
    )
    return result.rows
}


// Delete product by ID
export const deleteProductByIdFromDB = async (productId) => {
    await db.query(
        `DELETE FROM product_images WHERE product_id = $1`,
        [productId]
    )

    const result = await db.query(
        `DELETE FROM products WHERE id = $1`,
        [productId]
    )

    return result.rowCount // Số dòng bị ảnh hưởng
}

export const getFeaturedProductsByCategoryFromDB = async (limitPerCategory = 4) => {
    // Lấy tất cả category
    const categoriesResult = await db.query('SELECT id, name FROM categories')
    const categories = categoriesResult.rows

    const data = []
    for (const cat of categories) {
        const productsResult = await db.query(
            `SELECT p.*, 
                    (
                        SELECT image_url FROM product_images WHERE product_id = p.id LIMIT 1
                    ) AS image_url
             FROM products p
             WHERE p.category_id = $1
             ORDER BY p.id DESC
             LIMIT $2`,
            [cat.id, limitPerCategory]
        )
        data.push({
            category: cat,
            products: productsResult.rows
        })
    }
    return data
}

export const getFeaturedProductsFromDB = async (limit = 16) => {
    const result = await db.query(
        `SELECT p.*, 
                (
                    SELECT image_url FROM product_images WHERE product_id = p.id LIMIT 1
                ) AS image_url,
                c.name AS category_name
         FROM products p
         LEFT JOIN categories c ON p.category_id = c.id
         ORDER BY RANDOM()
         LIMIT $1`,
        [limit]
    )
    return result.rows
}