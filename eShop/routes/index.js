var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Cua-hang', { title: 'Home' });
});

router.get('/signup', function(req, res, next) {
  res.render('Dang-ky', { title: 'Đăng ký' });
});

router.get('/forgot', function(req, res, next) {
  res.render('Quen-mat-khau', { title: 'Quên mật khẩu' });
});

router.get('/login', function(req, res, next) {
  res.render('Dang-nhap', { title: 'Cửa hàng' });
});

router.get('/productInfo', function(req, res, next) {
  res.render('San-pham', { title: 'Sản phẩm' });
});

router.get('/bucket', function(req, res, next) {
  res.render('Gio-hang', { title: 'Giỏ hàng' });
});

router.get('/logout', function(req, res, next) {
  res.render('Dang-xuat', { title: 'Goodbye!!' });
});

router.get('/editInfo', function(req, res, next) {
  res.render('Sua-thong-tin', { title: 'Sửa thông tin' });
});

module.exports = router;
