var express = require('express');
var router = express.Router();
var danh_sach_cua_hang_controller = require('../controllers/danh_sach_cua_hang_controller');
var thay_doi_thong_tin_controller = require('../controllers/thay_doi_thong_tin_controller');
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

router.get('/thay_doi_thong_tin_cua_hang/:id', thay_doi_thong_tin_controller.ChangeInfo);

router.get('/danh_sach_cua_hang', danh_sach_cua_hang_controller.show_list);

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
