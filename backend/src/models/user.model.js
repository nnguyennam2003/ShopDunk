import db from '../config/db.js';

// Tạo user
export const createUserFromDB = async (email, phone, fullName, gender, birthday, password, role = 'user') => {
    const result = await db.query(
        `INSERT INTO users (email, phone, full_name, gender, birthday, password, role)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [email, phone, fullName, gender, birthday, password, role]
    );
    return result.rows[0]; // Trả về user vừa tạo
};

// Lấy user theo email
export const getUserByEmail = async (email) => {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
};

// Lấy danh sách users
export const getUsersFromDB = async () => {
    const result = await db.query("SELECT * FROM users");
    return result.rows;
};

// Lấy user theo id
export const getUserByIdFromDB = async (id) => {
    const result = await db.query(
        "SELECT id, email, phone, full_name, gender, birthday, role FROM users WHERE id = $1",
        [id]
    );
    return result.rows[0];
};

// Cập nhật user
export const editUserFromDB = async (id, email, phone, fullName, gender, birthday, role) => {
    const result = await db.query(
        `UPDATE users
         SET email = $1, phone = $2, full_name = $3, gender = $4, birthday = $5, role = $6
         WHERE id = $7 RETURNING *`,
        [email, phone, fullName, gender, birthday, role, id]
    );
    return result.rows[0];
};

// Xoá user
export const deleteUserFromDB = async (id) => {
    const result = await db.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    return result.rows[0]; // Trả về thông tin user đã xoá nếu cần
};
