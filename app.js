const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const statusRouter = require('./routes/status')
const userRouter = require('./routes/user')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// This is to aviod error
app.get('/favicon.ico', (req, res) => res.status(204))

app.use('/', statusRouter)
app.use('/users', userRouter)

module.exports = app
