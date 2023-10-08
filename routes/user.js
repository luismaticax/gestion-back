const express = require('express')
const User = require('../schemas/user')
const router = express.Router()

router.get('/', function (req, res) {
  res.send('respond with a resource')
})

router.get('/all', async function (req, res) {
  const users = await User.find()
  res.send(users)
})

module.exports = router
