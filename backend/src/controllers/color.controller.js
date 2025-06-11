import { addColorToDB, deleteColorFromDB, getListColorsFromDB } from "../models/color.model.js"

export const getListColors = async (req, res) => {
    try {
        const colors = await getListColorsFromDB()
        res.json(colors)
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}

export const addColor = async (req, res) => {
    try {
        const { name, css_code } = req.body
        if (!name || !css_code) {
            return res.status(400).json({ error: "Thiếu tên màu hoặc mã css_code" })
        }
        const color = await addColorToDB(name, css_code)
        res.status(201).json(color)
    } catch (error) {
        console.error("Error adding color:", error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const deleteColor = async (req, res) => {
    try {
        const { id } = req.params
        await deleteColorFromDB(id)
        res.json({ message: "Xóa màu thành công" })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}