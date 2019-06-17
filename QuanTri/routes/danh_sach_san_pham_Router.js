var express = require('express');
var router = express.Router();
var danh_sach_san_pham_controller = require('../controllers/danh_sach_san_pham_controller');
var dataCuaHang = require('../models/danh_sach_cua_hang');
/* GET home page. */

router.get('/', danh_sach_san_pham_controller.index);


//router.post('/main_sign_in', danh_sach_tai_khoan_admin_controller.sign_in);

router.get('/thay_doi_thong_tin_san_pham/:id', danh_sach_san_pham_controller.show_info);
router.get('/xoa_san_pham/:id', danh_sach_san_pham_controller.delete_post);
router.post('/thay_doi_thong_tin_san_pham/:id', danh_sach_san_pham_controller.update_post);
router.post('/them_san_pham', danh_sach_san_pham_controller.add);
router.get('/them_san_pham', function(req, res, next) {
    if (req.isAuthenticated()) {
        dataCuaHang.find()
            .exec(function (err, list_shops) {
                if (err) {
                    console.log("falseeee");
                    return next(err);
                }
                //Successful, so render
                console.log("Successful, so render");
                console.log(list_shops);
                res.render('them_san_pham', { title: 'Express', user: req.user, list_shops: list_shops });
            });

    } else {
        console.log(req.user);
        console.log(req.isAuthenticated());
        res.render('dang_nhap', {
            errorText: ''
        });
    }

});




module.exports = router;
