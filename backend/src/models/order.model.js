import db from '../config/db.js'

export const createOrderFromDB = async (userId, addressId, items, total, paymentMethod = 'cash') => {
    // Tạo đơn hàng
    const orderResult = await db.query(
        `INSERT INTO orders (user_id, address_id, total_price, status)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [userId, addressId, total, 'pending']
    )
    const order = orderResult.rows[0]

    // Tạo order_items
    for (const item of items) {
        await db.query(
            `INSERT INTO order_items (order_id, product_id, quantity, color, storage, price)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [order.id, item.product_id, item.quantity, item.color, item.storage, item.price]
        )
    }

    // Tạo payment (COD: status pending)
    await db.query(
        `INSERT INTO payments (order_id, method, status)
         VALUES ($1, $2, $3)`,
        [order.id, paymentMethod, 'pending']
    )

    const productIds = items.map(item => item.product_id)
    if (productIds.length > 0) {
        await db.query(
            `DELETE FROM cart_items WHERE cart_id = (
                SELECT id FROM carts WHERE user_id = $1
            ) AND product_id = ANY($2::int[])`,
            [userId, productIds]
        )
    }

    return order
}

export const getAllOrdersFromDB = async (userId) => {
    const result = await db.query(
        `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
        [userId]
    )
    return result.rows
}

export const getOrderDetailFromDB = async (orderId, userId) => {
    const orderResult = await db.query(
        `SELECT * FROM orders WHERE id = $1 AND user_id = $2`,
        [orderId, userId]
    )
    const order = orderResult.rows[0]
    if (!order) return null

    const addressResult = await db.query(
        `SELECT * FROM addresses WHERE id = $1`,
        [order.address_id]
    )
    const address = addressResult.rows[0]

    const paymentResult = await db.query(
        `SELECT * FROM payments WHERE order_id = $1`,
        [orderId]
    )
    const payment = paymentResult.rows[0]

    const itemsResult = await db.query(
        `SELECT 
            oi.*, 
            p.name, 
            (
                SELECT image_url 
                FROM product_images 
                WHERE product_id = p.id 
                LIMIT 1
            ) AS image_url
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         WHERE oi.order_id = $1`,
        [orderId]
    )
    const items = itemsResult.rows

    return { order, address, payment, items }
}