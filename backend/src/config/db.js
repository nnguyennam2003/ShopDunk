import pkg from 'pg';
import { config } from 'dotenv';

config();

const { Pool } = pkg;

const db = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false, // cần thiết khi dùng Neon
    }
});

export default db;
