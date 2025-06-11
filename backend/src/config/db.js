import pkg from 'pg'
import { config } from 'dotenv'

config()

const { Pool } = pkg

const isProduction = process.env.NODE_ENV === 'production'

const db = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false, // ✅ Bắt buộc với Neon
    },
})
export default db
