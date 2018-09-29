var express = require('express')
var controller = require('../controllers/revision.server.controller.js')
var model = require('../models/revision.js')
var router = express.Router()
console.log(controller.showTitleForm)
router.get('/', controller.showTitleForm)
router.get('/getLatest', controller.getLatest);

module.exports = router
