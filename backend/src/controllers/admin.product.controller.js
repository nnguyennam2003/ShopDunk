import cloudinary from "../config/cloudinary.js"
import db from "../config/db.js"
import { createProductFromDB, deleteProductByIdFromDB } from "../models/product.model.js"

export const createNewProduct = async (req, res) => {
    try {
        let { name, description, price, price_sale, storage, category_id, colors } = req.body
        const files = req.files

        // Xử lý storage (mảng số)
        const storageArray = typeof storage === 'string' ? JSON.parse(storage) : storage

        // Xử lý colors (mảng id)
        let colorIds = [];
        if (typeof colors === 'string') {
            // Nếu chỉ gửi 1 màu, sẽ là string, nếu nhiều sẽ là mảng
            colorIds = [parseInt(colors)]
        } else if (Array.isArray(colors)) {
            colorIds = colors.map(id => parseInt(id))
        }

        // Tạo sản phẩm và liên kết màu
        const product = await createProductFromDB(
            name,
            description,
            price,
            price_sale,
            storageArray,
            category_id,
            colorIds
        );

        const productId = product.id
        const imageUrls = []

        // Upload và lưu ảnh
        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            const uploadResult = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { resource_type: 'image' },
                    (error, result) => {
                        if (error) return reject(error)
                        resolve(result)
                    }
                );
                stream.end(file.buffer)
            });

            await db.query(
                `INSERT INTO product_images (product_id, image_url, "order") VALUES ($1, $2, $3)`,
                [productId, uploadResult.secure_url, i]
            );
            imageUrls.push(uploadResult.secure_url);
        }

        // Lấy tên category từ DB
        const categoryResult = await db.query(
            `SELECT name FROM categories WHERE id = $1`,
            [category_id]
        );
        const category_name = categoryResult.rows[0]?.name || ""

        res.status(201).json({
            message: 'Product created successfully',
            product: {
                ...product,
                images: imageUrls,
                category_name,
                colors
            }
        });
    } catch (error) {
        console.error('Tạo sản phẩm thất bại:', error)
        res.status(500).json({ error: 'Lỗi server!' })
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        const deletedCount = await deleteProductByIdFromDB(id)

        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Product not found' })
        }

        res.json({ message: 'Product deleted successfully' })
    } catch (error) {
        console.error('Failed to delete product:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}