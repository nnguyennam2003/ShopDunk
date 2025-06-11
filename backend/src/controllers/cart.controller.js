import { addToCartDB, getCartByUserIdFromDB, removeFromCartDB } from "../models/cart.model.js"
import db from "../config/db.js"

export const getListCart = async (req, res) => {
    try {
        const userId = req.user.userId // Lấy từ middleware protect
        const cart = await getCartByUserIdFromDB(userId)
        res.json(cart || { items: [] })
    } catch (error) {
        console.error("Get cart error:", error) // Thêm dòng này để xem lỗi chi tiết
        res.status(500).json({ error: "Internal server error" })
    }
}

export const addToCart = async (req, res) => {
    try {
        const userId = req.user.userId // hoặc req.user.id tùy token
        const { product_id, quantity, color, storage } = req.body

        // Tìm cart của user, nếu chưa có thì tạo mới
        let cart = await getCartByUserIdFromDB(userId)
        if (!cart) {
            const cartResult = await db.query(
                `INSERT INTO carts (user_id, created_at) VALUES ($1, NOW()) RETURNING *`,
                [userId]
            )
            cart = cartResult.rows[0]
        }

        // Thêm sản phẩm vào cart_items
        await addToCartDB(cart.id, product_id, quantity, color, storage)

        // Trả về cart mới nhất
        const updatedCart = await getCartByUserIdFromDB(userId)
        res.json(updatedCart)
    } catch (error) {
        console.error("Add to cart error:", error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.userId
        const { cart_item_id } = req.body // hoặc req.params nếu dùng param

        await removeFromCartDB(cart_item_id, userId)
        // Trả về giỏ hàng mới nhất
        const updatedCart = await getCartByUserIdFromDB(userId)
        res.json({ message: "Remove from cart successfully", updatedCart })
    } catch (error) {
        console.error("Remove from cart error:", error)
        res.status(500).json({ error: "Internal server error" })
    }
}