var express = require('express');
var router = express.Router();

// Require controller modules.
var danh_sach_cho_duyet_controller = require('../controllers/danh-sach-cho-duyet-controller');
var danh_sach_cua_hang_controller = require('../controllers/danh-sach-cua-hang-controller');
var danh_sach_san_pham_controller  = require('../controllers/danh-sach-san-pham-controller ');
var danh_sach_tai_khoan_controller = require('../controllers/danh-sach-tai-khoan-controller');
var don_hang_controller = require('../controllers/don-hang-controller');
var error_controller = require('../controllers/error-controller');
var index_controller = require('../controllers/index-controller');
var thay_doi_thong_tin_controller = require('../controllers/thay-doi-thong-tin-controller');
var thong_ke_doanh_so_controller = require('../controllers/thong-ke-doanh-so-controller');
var top_10_cua_hang_controller = require('../controllers/top-10-cua-hang-controller');
var top_10_san_pham_controller = require('../controllers/top-10-san-pham-controller');

router.get('/don-hang', don_hang_controller.show_list);

router.get('/danh-sach-cho-duyet', danh_sach_cho_duyet_controller.show_list);

router.get('/danh-sach-cua-hang', danh_sach_cua_hang_controller.show_list);

router.get('/danh-sach-san-pham', danh_sach_san_pham_controller.show_list);

router.get('/danh-sach-tai-khoan', danh_sach_tai_khoan_controller.show_list);

router.get('/index', index_controller.show_list);

router.get('/thay-doi-thong-tin', thay_doi_thong_tin_controller.show_list);

router.get('/thong-ke-doanh-so', thong_ke_doanh_so_controller.show_list);

router.get('/top-10-cua-hang', top_10_cua_hang_controller.show_list);

router.get('/top-10-san-pham', top_10_san_pham_controller.show_list);

module.exports = router;