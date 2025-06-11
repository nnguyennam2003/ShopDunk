import db from "../config/db.js"

export const getListColorsFromDB = async () => {
    const result = await db.query(
        'SELECT * FROM colors ORDER BY id',
    )
    return result.rows
}

export const addColorToDB = async (name, css_code) => {
    const result = await db.query(
        'INSERT INTO colors (name, css_code) VALUES ($1, $2) RETURNING *',
        [name, css_code]
    )
    return result.rows[0]
}

export const deleteColorFromDB = async (id) => {
    await db.query('DELETE FROM colors WHERE id = $1', [id])
}