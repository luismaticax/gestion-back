const express = require('express')
const pkg = require('../package.json')

const router = express.Router()

/* GET home page. */
router.get('/', function (req, res) {
  res.send({
    name: pkg.name,
    version: pkg.version,
    /* eslint-disable-next-line no-undef */
    enviroment: process.env.ENV,
  })
})

module.exports = router
