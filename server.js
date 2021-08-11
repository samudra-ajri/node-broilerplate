import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'

import homeRoutes from './routes/homeRoutes.js'

import cors from './middleware/corsMiddleware.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

const PORT = process.env.PORT
const ENV = process.env.APP_ENV

if (ENV === 'development' || 'local') {
    app.use(morgan('dev'))
}

app.use(cors)
app.use(express.json())

app.use('/', homeRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, console.log(`Server running in ${ENV} mode on port ${PORT}`))