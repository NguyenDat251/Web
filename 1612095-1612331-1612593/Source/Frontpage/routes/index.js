var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Cua_hang', { title: 'Home' });
});

router.get('/signup', function(req, res, next) {
  res.render('Dang_ky', { title: 'Đăng ký' });
});

router.get('/forgot', function(req, res, next) {
  res.render('Quen_mat_khau', { title: 'Quên mật khẩu' });
});

router.get('/login', function(req, res, next) {
  res.render('Dang_nhap', { title: 'Cửa hàng' });
});

router.get('/productInfo', function(req, res, next) {
  res.render('San_pham', { title: 'Sản phẩm' });
});

router.get('/bucket', function(req, res, next) {
  res.render('Gio_hang', { title: 'Giỏ hàng' });
});

router.get('/logout', function(req, res, next) {
  res.render('Dang_xuat', { title: 'Goodbye!!' });
});

router.get('/editInfo', function(req, res, next) {
  res.render('Sua_thong_tin', { title: 'Sửa thông tin' });
});

module.exports = router;
