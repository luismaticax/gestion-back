import { Router } from 'express'
import UserModel from '../models/user.model.js'

import generateUserToken from '../utils/generate-user-and-token.js'

const router = new Router()

router.post('/', createUserToken)

async function createUserToken(req, res, next) {
  console.log(`Creating user token for ${req.body.email}`)

  if (!req.body.email) {
    console.error('Missing email parameter. Sending 400 to client')
    return res.status(400).end()
  }

  if (!req.body.password) {
    console.error('Missing password parameter. Sending 400 to client')
    return res.status(400).end()
  }

  try {
    const user = await UserModel.findOne({ email: req.body.email }, '+password')

    if (!user) {
      console.error('UserModel not found. Sending 404 to client')
      return res.status(401).end()
    }

    console.log('Checking user password')
    const result = await user.checkPassword(req.body.password)

    if (result.isLocked) {
      console.error('UserModel is locked. Sending 400 (Locked) to client')
      return res.status(400).end()
    }

    if (!result.isOk) {
      console.error('UserModel password is invalid. Sending 401 to client')
      return res.status(401).end()
    }

    const response = await generateUserToken(req, user)

    res.status(201).json(response)
  } catch (err) {
    next(err)
  }
}

export default router
