import cloudinary from "../config/cloudinary.js";
import db from "../config/db.js";
import { createProductFromDB, deleteProductByIdFromDB } from "../models/product.model.js";

export const createNewProduct = async (req, res) => {
    try {
        const { name, description, price, price_sale, color, storage, category_id } = req.body;
        const files = req.files;

        const result = await createProductFromDB(name, description, price, price_sale, color, storage, category_id);
        const productId = result.insertId;

        for (let file of files) {
            const uploadResult = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { resource_type: 'image' },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );
                stream.end(file.buffer);
            });

            await db.query(
                `INSERT INTO product_images (product_id, image_url) VALUES (?, ?)`,
                [productId, uploadResult.secure_url]
            );
        }

        res.status(201).json({ message: 'Tạo sản phẩm thành công!', productId });
    } catch (error) {
        console.error('Tạo sản phẩm thất bại:', error);
        res.status(500).json({ error: 'Lỗi server!' });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCount = await deleteProductByIdFromDB(id);

        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Failed to delete product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}