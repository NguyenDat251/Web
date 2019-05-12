var express = require('express');
var router = express.Router();

// Require controller modules.
var Cua_hang_controller = require('../controllers/Cua_hang_controller');
var Dang_ky_controller = require('../controllers/Dang_ky_controller');
var Dang_nhap_controller  = require('../controllers/Dang_nhap_controller');
var Dang_xuat_controller = require('../controllers/Dang_xuat_controller');
var error_controller = require('../controllers/error_controller');
var Gio_hang_controller = require('../controllers/Gio_hang_controller');
var Quen_mat_khau_controller = require('../controllers/Quen_mat_khau_controller');
var San_pham_controller = require('../controllers/San_pham_controller');
var Sua_thong_tin_controller = require('../controllers/Sua_thong_tin_controller');

router.get('/Cua_hang', Cua_hang_controller.show_list);

router.get('/Dang_ky', Dang_ky_controller.show_list);

router.get('/Dang_nhap', Dang_nhap_controller.show_list);

router.get('/Dang_xuat', Dang_xuat_controller.show_list);

router.get('/Gio_hang', Gio_hang_controller.show_list);

router.get('/Quen_mat_khau', Quen_mat_khau_controller.show_list);

router.get('/San_pham', San_pham_controller.info);

router.get('/Sua_thong_tin', Sua_thong_tin_controller.show_list);


module.exports = router;