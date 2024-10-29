import express from 'express'
import pkg from '../package.json' with { type: 'json' }

const router = express.Router()

router.get('/', function (req, res) {
  res.send({
    name: pkg.name,
    version: pkg.version,
    /* eslint-disable-next-line no-undef */
    enviroment: process.env.ENV,
  })
})

export default router
