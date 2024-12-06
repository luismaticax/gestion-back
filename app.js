import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'

import {authRoutes, statusRoutes, userRoutes, roleRoutes} from './routes/index.js'
import authentication from './middlewares/authentication.js'
import authorization from './middlewares/authorization.js'

const app = express()

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(authorization)

app.use('/', statusRoutes)
app.use('/auth', authRoutes)
app.use('/users', authentication, userRoutes)
app.use('/role', roleRoutes)

export default app
