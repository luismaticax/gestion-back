const express = require('express')
const User = require('../schemas/user')
const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getUserById)

async function getAllUsers(req, res, next) {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (err) {
    next(err)
  }
}

async function getUserById(req, res, next) {
  if (!req.params.id) {
    res.status(404).send('Id not found')
  }
  try {
    const user = await User.findById(req.params.id)
    if (!user || user.length == 0) {
      res.status(404).send('User not found')
    } else {
      res.send(user)
    }
  } catch (err) {
    next(err)
  }
}

module.exports = router
