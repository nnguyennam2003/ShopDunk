import { getAllProductsFromDB, getProductByIdFromDB, getProductsByCategoryFromDB } from "../models/product.model.js";

export const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.query;

        if (category) {
            const products = await getProductsByCategoryFromDB(category);
            if (products.length === 0) {
                return res.status(404).json({ message: `No products found for category: ${category}` });
            }
            return res.json(products);
        }

        const products = await getAllProductsFromDB();
        res.json(products);

    } catch (error) {
        console.error("Failed to fetch products by category:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await getProductByIdFromDB(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error("Failed to fetch product by ID:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};