var express = require('express');
var router = express.Router();
var don_hang_controller = require('../controllers/don_hang_controller');

router.get('/', don_hang_controller.index);
module.exports = router;
