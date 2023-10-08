var express = require('express')
var pkg = require('../package.json')

var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send({
    name: pkg.name,
    version: pkg.version,
    enviroment: process.env.ENV,
  })
})

module.exports = router
