var express = require('express');
var controller = require('../controllers/revision.server.controller');
var router = express.Router();

router.get('/revisions/:title', controller.getByTitle);

module.exports = router;