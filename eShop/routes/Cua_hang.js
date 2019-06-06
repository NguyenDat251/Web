var express = require('express');
var router = express.Router();
var Cua_hang_Controller = require('../controllers/Cua_hang_controller');
/* GET home page. */

router.get('/', Cua_hang_Controller.index);


//router.post('/main_sign_in', danh_sach_tai_khoan_admin_controller.sign_in);

router.get('/dang_ky', function(req, res, next) {
    res.render('Dang_ky', { title: '' });
});




module.exports = router;
