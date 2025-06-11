import { config } from 'dotenv'
config()

import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import productRouter from './routes/product.route.js'
import categoryRouter from './routes/category.route.js'
import cartRouter from './routes/cart.route.js'
import addressRoute from './routes/address.route.js'
import orderRouter from './routes/order.route.js'
import colorRouter from './routes/color.route.js'

const app = express()
const PORT = process.env.PORT || 8000

const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URL_PROD,
    'http://localhost:5173',
    'http://localhost:5137'
].filter(Boolean)

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}))

app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/category', categoryRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRoute)
app.use('/api/checkout', orderRouter)
app.use('/api/color', colorRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})