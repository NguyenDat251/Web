var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/danh-sach-tai-khoan', function(req, res, next) {
  res.render('danh-sach-tai-khoan', { title: 'Express' });
});

router.get('/danh-sach-cho-duyet', function(req, res, next) {
  res.render('danh-sach-cho-duyet', { title: 'Express' });
});

router.get('/thay-doi-thong-tin', function(req, res, next) {
  res.render('thay-doi-thong-tin', { title: 'Express' });
});

router.get('/danh-sach-cua-hang', function(req, res, next) {
  res.render('danh-sach-cua-hang', { title: 'Express' });
});

router.get('/danh-sach-san-pham', function(req, res, next) {
  res.render('danh-sach-san-pham', { title: 'Express' });
});

router.get('/don-hang', function(req, res, next) {
  res.render('don-hang', { title: 'Express' });
});

router.get('/thong-ke-doanh-so', function(req, res, next) {
  res.render('thong-ke-doanh-so', { title: 'Express' });
});

router.get('/top-10-cua-hang', function(req, res, next) {
  res.render('top-10-cua-hang', { title: 'Express' });
});

router.get('/top-10-san-pham', function(req, res, next) {
  res.render('top-10-san-pham', { title: 'Express' });
});

module.exports = router;
