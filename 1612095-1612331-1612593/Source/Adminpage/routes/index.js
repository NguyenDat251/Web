var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/', function(req, res) {
//   res.redirect('/catalog');
// });

router.get('/danh_sach_tai_khoan', function(req, res, next) {
  res.render('danh_sach_tai_khoan', { title: 'Express' });
});

router.get('/danh_sach_cho_duyet', function(req, res, next) {
  res.render('danh_sach_cho_duyet', { title: 'Express' });
});

router.get('/thay_doi_thong_tin', function(req, res, next) {
  res.render('thay_doi_thong_tin', { title: 'Express' });
});

router.get('/danh_sach_cua_hang', function(req, res, next) {
  res.render('danh_sach_cua_hang', { title: 'Express' });
});

router.get('/danh_sach_san_pham', function(req, res, next) {
  res.render('danh_sach_san_pham', { title: 'Express' });
});

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
