import db from '../config/db.js'

// Lấy danh sách địa chỉ của user
export const getAddressesDB = async (userId) => {
    const result = await db.query(
        'SELECT * FROM addresses WHERE user_id = $1 ORDER BY is_default DESC, id DESC',
        [userId]
    )
    return result.rows
}

// Thêm địa chỉ mới
export const addAddressDB = async (userId, address_detail, city, district, ward, is_default) => {
    const result = await db.query(
        `INSERT INTO addresses (user_id, address_detail, city, district, ward, is_default)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [userId, address_detail, city, district, ward, is_default || false]
    )
    return result.rows[0]
}

// Cập nhật địa chỉ
export const updateAddressDB = async (userId, addressId, address_detail, city, district, ward, is_default) => {
    const result = await db.query(
        `UPDATE addresses SET address_detail=$1, city=$2, district=$3, ward=$4, is_default=$5
         WHERE id=$6 AND user_id=$7 RETURNING *`,
        [address_detail, city, district, ward, is_default, addressId, userId]
    )
    return result.rows[0]
}

// Xóa địa chỉ
export const deleteAddressDB = async (userId, addressId) => {
    await db.query(
        `DELETE FROM addresses WHERE id=$1 AND user_id=$2`,
        [addressId, userId]
    )
}

// Đặt địa chỉ mặc định
export const setDefaultAddressDB = async (userId, addressId) => {
    await db.query(
        `UPDATE addresses SET is_default = false WHERE user_id = $1`,
        [userId]
    )
    await db.query(
        `UPDATE addresses SET is_default = true WHERE id = $1 AND user_id = $2`,
        [addressId, userId]
    )
}

export const getAddressDefaultDB = async (userId) => {
    const result = await db.query(
        `SELECT * FROM addresses WHERE user_id = $1 AND is_default = true LIMIT 1`,
        [userId]
    )
    return result.rows[0]
}