import { createOrderFromDB, getOrderDetailFromDB, getAllOrdersFromDB } from "../models/order.model.js"

export const createOrder = async (req, res) => {
    try {
        const userId = req.user.userId
        const { address_id, items, payment_method } = req.body

        // Tính tổng tiền (nên kiểm tra lại giá từ DB)
        let total = 0
        for (const item of items) {
            total += Number(item.price) * Number(item.quantity)
        }

        const order = await createOrderFromDB(userId, address_id, items, total, payment_method)

        res.json({ message: "Order created successfully", order })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const getOrderDetail = async (req, res) => {
    try {
        const orderId = req.params.id
        const userId = req.user.userId

        const detail = await getOrderDetailFromDB(orderId, userId)
        if (!detail) return res.status(404).json({ message: "Order not found" })

        res.json(detail)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const getAllOrder = async (req, res) => {
    try {
        const userId = req.user.userId
        const orders = await getAllOrdersFromDB(userId)
        res.json(orders)
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}