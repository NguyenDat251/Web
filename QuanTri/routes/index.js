var express = require('express');
var router = express.Router();
var danh_sach_cua_hang_controller = require('../controllers/danh_sach_cua_hang_controller');
var danh_sach_san_pham_controller = require('../controllers/danh_sach_san_pham_controller');
var danh_sach_loai_san_pham_controller = require('../controllers/danh_sach_loai_san_pham_controller');
var danh_sach_tai_khoan_controller = require('../controllers/danh_sach_tai_khoan_controller');
var danh_sach_tai_khoan_admin_controller = require('../controllers/danh_sach_tai_khoan_admin_controller');
/* GET home page. */

// router.get('/', function(req, res, next) {
//   res.render('dang_nhap', { title: '' });
// });

// router.post('/', danh_sach_tai_khoan_admin_controller.check_log_in
// );

router.get('/', function (req, res, next) {

    if (req.user) {
        console.log(req.user);
        res.redirect('/main');
    } else {
        console.log(req.user);
        console.log(req.isAuthenticated());
        res.render('dang_nhap', {
            errorText: ''
        });
    }

});



router.get('/main', function(req, res, next) {
    console.log("main session: " + req.session);
    console.log("main: " + req.user);
    console.log("main: isAuthen " + req.isAuthenticated());
    res.render('main', { title: 'Express' });
});

router.post('/main_sign_in', danh_sach_tai_khoan_admin_controller.sign_in);

router.get('/dang_ky', function(req, res, next) {
    res.render('dang_ky', { title: '' });
});


// router.get('/', function(req, res) {
//   res.redirect('/catalog');
// });

router.get('/thay_doi_thong_tin_tai_khoan/:id', danh_sach_tai_khoan_controller.show_info);
router.get('/xoa_tai_khoan/:id', danh_sach_tai_khoan_controller.delete_post);
router.post('/thay_doi_thong_tin_tai_khoan/:id', danh_sach_tai_khoan_controller.update_post);
router.post('/them_tai_khoan', danh_sach_tai_khoan_controller.add);
router.get('/them_tai_khoan', function(req, res, next) {
    res.render('them_tai_khoan', { title: 'Express' });
});

router.get('/danh_sach_cho_duyet', function(req, res, next) {
  res.render('danh_sach_cho_duyet', { title: 'Express' });
});

router.get('/thay_doi_thong_tin', function(req, res, next) {
  res.render('thay_doi_thong_tin', { title: 'Express' });
});

router.get('/thay_doi_thong_tin_cua_hang/:id', danh_sach_cua_hang_controller.show_info);
router.get('/xoa_cua_hang/:id', danh_sach_cua_hang_controller.delete_post);
router.post('/thay_doi_thong_tin_cua_hang/:id', danh_sach_cua_hang_controller.update_post);
router.post('/them_cua_hang', danh_sach_cua_hang_controller.add);
router.get('/them_cua_hang', function(req, res, next) {
  res.render('them_cua_hang', { title: 'Express' });
});

router.get('/thay_doi_thong_tin_san_pham/:id', danh_sach_san_pham_controller.show_info);
router.get('/xoa_san_pham/:id', danh_sach_san_pham_controller.delete_post);
router.post('/thay_doi_thong_tin_san_pham/:id', danh_sach_san_pham_controller.update_post);
router.post('/them_san_pham', danh_sach_san_pham_controller.add);
router.get('/them_san_pham', function(req, res, next) {
    res.render('them_san_pham', { title: 'Express' });
});

router.get('/thay_doi_thong_tin_loai_san_pham/:id', danh_sach_loai_san_pham_controller.show_info);
router.get('/xoa_loai_san_pham/:id', danh_sach_loai_san_pham_controller.delete_post);
router.post('/thay_doi_thong_tin_loai_san_pham/:id', danh_sach_loai_san_pham_controller.update_post);
router.post('/them_loai_san_pham', danh_sach_loai_san_pham_controller.add);
router.get('/them_loai_san_pham', function(req, res, next) {
    res.render('them_loai_san_pham', { title: 'Express' });
});


router.get('/danh_sach_tai_khoan', danh_sach_tai_khoan_controller.show_list);

router.get('/danh_sach_cua_hang', danh_sach_cua_hang_controller.show_list);

router.get('/danh_sach_san_pham', danh_sach_san_pham_controller.show_list);

router.get('/danh_sach_loai_san_pham', danh_sach_loai_san_pham_controller.show_list);


router.get('/don_hang', function(req, res, next) {
  res.render('don_hang', { title: 'Express' });
});

router.get('/thong_ke_doanh_so', function(req, res, next) {
  res.render('thong_ke_doanh_so', { title: 'Express' });
});

router.get('/top_10_cua_hang', function(req, res, next) {
  res.render('top_10_cua_hang', { title: 'Express' });
});

router.get('/top_10_san_pham', function(req, res, next) {
  res.render('top_10_san_pham', { title: 'Express' });
});

module.exports = router;
