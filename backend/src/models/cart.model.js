import db from "../config/db.js"

export const getCartByUserIdFromDB = async (userId) => {
    // Lấy cart của user
    const cartResult = await db.query(
        `SELECT * FROM carts WHERE user_id = $1 LIMIT 1`,
        [userId]
    )
    if (cartResult.rows.length === 0) return null
    const cart = cartResult.rows[0]

    // Lấy các item trong cart, join với sản phẩm và lấy ảnh đại diện
    const itemsResult = await db.query(
        `SELECT ci.*,
            p.name, p.price,
            (
                SELECT image_url FROM product_images
                WHERE product_id = p.id
                LIMIT 1
            ) AS image_url
     FROM cart_items ci
     JOIN products p ON ci.product_id = p.id
     WHERE ci.cart_id = $1`,
        [cart.id]
    )
    cart.carts = itemsResult.rows
    return cart
}

export const addToCartDB = async (cartId, productId, quantity, color, storage) => {
    // Kiểm tra nếu sản phẩm đã có trong cart với cùng color & storage thì tăng số lượng
    const exist = await db.query(
        `SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2 AND color = $3 AND storage = $4`,
        [cartId, productId, color, storage]
    )
    if (exist.rows.length > 0) {
        await db.query(
            `UPDATE cart_items SET quantity = quantity + $1 WHERE id = $2`,
            [quantity, exist.rows[0].id]
        )
    } else {
        await db.query(
            `INSERT INTO cart_items (cart_id, product_id, quantity, color, storage)
             VALUES ($1, $2, $3, $4, $5)`,
            [cartId, productId, quantity, color, storage]
        )
    }
}

export const removeFromCartDB = async (cartItemId, userId) => {
    await db.query(
        `DELETE FROM cart_items 
         WHERE id = $1 
         AND cart_id IN (SELECT id FROM carts WHERE user_id = $2)`,
        [cartItemId, userId]
    ) 
}