import { getAllProductsFromDB, getFeaturedProductsByCategoryFromDB, getProductByIdFromDB, getProductsByCategoryFromDB, getRelatedProductsFromDB, getFeaturedProductsFromDB } from "../models/product.model.js"

export const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.query

        if (category) {
            const products = await getProductsByCategoryFromDB(category)
            return res.json(products)
        }

        const products = await getAllProductsFromDB()
        res.json(products)

    } catch (error) {
        console.error("Failed to fetch products by category:", error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params

        const product = await getProductByIdFromDB(id)

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        res.json(product)
    } catch (error) {
        console.error("Failed to fetch product by ID:", error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const getRelatedProductsByProductId = async (req, res) => {
    try {
        const { id } = req.params
        // Lấy sản phẩm để biết category_id
        const product = await getProductByIdFromDB(id)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        // Lấy các sản phẩm cùng category, loại trừ chính nó
        const related = await getRelatedProductsFromDB(product.category_id, id, 4)
        res.json(related)
    } catch (error) {
        console.error("Failed to fetch related products:", error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const getFeaturedProductsByCategory = async (req, res) => {
    try {
        const data = await getFeaturedProductsByCategoryFromDB(4) // 4 sản phẩm/category
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}

export const getFeaturedProducts = async (req, res) => {
    try {
        const data = await getFeaturedProductsFromDB(4) // 4 sản phẩm
        res.json(data)
    } catch (error) {
        console.error("Failed to fetch featured products:", error)
        res.status(500).json({ error: "Internal server error" })
    }
}