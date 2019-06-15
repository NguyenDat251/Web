var express = require('express');
var router = express.Router();
var Gio_hang_Controller = require('../controllers/Gio_hang_controller');
/* GET home page. */

router.get('/', Gio_hang_Controller.index);


//router.post('/main_sign_in', danh_sach_tai_khoan_admin_controller.sign_in);

router.get('/:id', Gio_hang_Controller.addProduct);

router.get('/removeInCart/:id', Gio_hang_Controller.removeProduct);


module.exports = router;
