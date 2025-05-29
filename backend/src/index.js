import { config } from 'dotenv';
config(); 

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import productRouter from './routes/product.route.js';
import categoryRouter from './routes/category.route.js';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:5137'],
    credentials: true,
}));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/category', categoryRouter)
app.use('/api/product', productRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});