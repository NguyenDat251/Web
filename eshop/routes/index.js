var express = require('express');
var router = express.Router();
var passport = require('passport');
var crypto = require("crypto");
var async = require("async");
var nodemailer = require("nodemailer");

var data = require('../models/tai_khoan');

var San_pham_controller = require('../controllers/San_pham_controller');
//var Dang_nhap_controller = require('../controllers/Dang_nhap_controller');
var Dang_ky_controller = require('../controllers/Dang_ky_controller');
var Cua_hang_controller = require('../controllers/Cua_hang_controller');
var Gio_hang_controller = require('../controllers/Gio_hang_controller');
var Sua_thong_tin_controller = require('../controllers/Sua_thong_tin_controller');

 //router.get('/', San_pham_controller.list);
//
// router.post('/', Dang_nhap_controller.check_log_in
// );

router.get('/', Cua_hang_controller.index
  // if (req.user) {
  //   console.log("Da dang nhap !");
  //   console.log(req.user);
  //   res.redirect('/Cua_hang');
  // } else {
  //   console.log("Chua dang nhap !");
  //   console.log(req.user);
  //   console.log(req.isAuthenticated());
  //   res.render('Dang_nhap', {
  //     errorText: ''
  //   });
  // }

);

router.post('/Dang_ky', Dang_ky_controller.sign_up);
router.get('/Dang_ky', function(req, res, next) {
    res.render('Dang_ky', { title: '' });
});

router.post('/search', Cua_hang_controller.search);

// router.post("/login", passport.authenticate("local",
//     {
//         successRedirect: "/Cua_hang",
//         failureRedirect: "/Dang_nhap",
//         failureFlash: true,
//         successFlash: 'Welcome to'
//     }), function(req, res){
// });

// router.post('/login',
//     passport.authenticate('local', {
//         failWithError: true
//     }),
//     function (req, res) {
//         console.log("Da dang nhap")
//         res.redirect('/Cua_hang');
//     },
//     function (err, req, res, next) {
//         if (req.authError) {
//             console.log("login false!");
//             res.render('Dang_nhap', {
//                 errorText: req.authError
//             });
//         }
//     }
// );

router.get('/Quen_mat_khau', function(req, res, next) {
  res.render('Quen_mat_khau', { title: 'Quên mật khẩu' });
});


router.get('/Dang_nhap', function(req, res, next) {
  res.render('Dang_nhap', { errorText: '' });
});

router.post('/Quen_mat_khau', Dang_ky_controller.forget_password);

router.get('/Doi_mat_khau_moi/:token', function(req, res) {
    console.log(req.params.token);
    data.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
            console.log('index.js/133');
            return res.redirect('/Quen_mat_khau');
        }
        res.render('Doi_mat_khau_moi', {token: req.params.token});
    });
});

router.post('/Doi_mat_khau_moi/:token', Dang_ky_controller.reset_password);



// router.get('/productInfo', function(req, res, next) {
//   // const data = {
//   //   name: 'iPhone XS Max 64 GB',
//   //   brand: 'Apple',
//   //   price: '28,790,000',
//   //   color: ['Bạc', 'Vàng', 'Xám'],
//   //   shortInfo: ['Hệ điều hành: iOS 12', 'RAM: 4 GB', 'ROM: 64 GB', 'Chip xử lý: A12 Bionic 64-bit 7nm'],
//   //   info: {
//   //     screen: '6.5 inches',
//   //     ram: '4 GB',
//   //     rom: '64 GB',
//   //     frontCamera: '7 MP, f / 2.2, 32mm',
//   //     backCamera: '12 MP',
//   //     os: 'iOS 12',
//   //     sim: '1',
//   //     pin: '3174 mAh'
//   //   }
//   // };
//   //
//   // // var Object={
//   // //   title: 'Sản phẩm',
//   // //       data: 'haha'
//   // // }
//   //
//   // res.render('San_pham', {title: 'Sản phẩm', data});
//
// });

router.get('/productInfo/:id', Cua_hang_controller.info);
router.post('/productInfo/:id/comment', Cua_hang_controller.comment);
router.get('/productInfo/:id/Page', Cua_hang_controller.moveCommentPage);
router.get('/type/:type', San_pham_controller.type);

router.get('/Gio_hang', Gio_hang_controller.index);

router.get('/Dang_xuat', function(req, res, next) {
  req.logout();
  res.redirect('Cua_hang');
});

router.get('/Sua_thong_tin', function(req, res, next) {
  res.render('Sua_thong_tin', { title: 'Sửa thông tin' });
});

router.post('/Sua_thong_tin', Sua_thong_tin_controller.update_post);

router.get('/Page', Cua_hang_controller.moveNextPage);

module.exports = router;

