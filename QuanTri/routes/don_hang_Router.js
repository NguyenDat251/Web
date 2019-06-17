var express = require('express');
var router = express.Router();
var dat_hang_controller = require('../controllers/don_hang_controller');

router.get('/', dat_hang_controller.index);
router.get('/dang_giao', dat_hang_controller.shipping);
module.exports = router;
