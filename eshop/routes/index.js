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

router.post('/Dang_ky, Dang_ky_controller.sign_up');
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

router.post('/Quen_mat_khau', function(req, res, next) {
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
            data.findOne({ email: req.body.email }, function(err, user) {
                if (!user) {
                    return res.redirect('/Dang_nhap');
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function(err) {
                    done(err, token, user);
                });
            });
        },
        function(token, user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    type:'login',
                    user: 'tancaominh98@gmail.com',
                    pass: process.env.GMAILPW
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'tancaominh98@gmail.com',
                subject: 'Node.js Password Reset',
                text: 'Bạn nhận được tin nhắn này vì bạn (hoặc ai đó) đã yêu cầu thay đổi mật khẩu.\n\n' +
                    'Hãy truy cập vào đường dẫn bên dưới để thay đổi mật khẩu:\n\n' +
                    'http://' + req.headers.host + '/Doi_mat_khau/' + token + '\n\n' +
                    'Nếu bạn không yêu cầu thay đổi mật khẩu, vui lòng bỏ qua tin nhắn này và mật khẩu bạn sẽ không thay đổi.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                console.log('mail sent');
                done(err, 'done');
            });
        }
    ], function(err) {
        if (err) return next(err);
        res.redirect('/Dang_nhap');
    });
});

router.get('/Doi_mat_khau/:token', function(req, res) {
    data.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
            console.log('index.js/133');
            return res.redirect('/Quen_mat_khau');
        }
        res.render('Doi_mat_khau', {token: req.params.token});
    });
});

router.post('/Doi_mat_khau/:token', function(req, res) {
    async.waterfall([
        function(done) {
            data.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
                if (!user) {
                    console.log('index.js/148')
                    return res.redirect('back');
                }
                if(req.body.newPass1 === req.body.newPass2) {
                    user.setPassword(req.body.newPass1, function(err) {
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;

                        user.save(function(err) {
                            req.logIn(user, function(err) {
                                done(err, user);
                            });
                        });
                    })
                } else {
                    console.log('index.js/162')
                    return res.redirect('back');
                }
            });
        },
        function(user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'tancaominh98@gmail.com',
                    pass: process.env.GMAILPW
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'tancaominh98@gmail.com',
                subject: 'Mật khẩu của bạn đã được thay đổi!',
                text: 'Xin chào,\n\n' +
                    'Đây là thông báo rằng mật khẩu của tài khoản ' + user.name + ' đã được thay đổi.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                done(err);
            });
        }
    ], function(err) {
        res.redirect('/Cua_hang');
    });
});



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

router.get('/productInfo/:id', San_pham_controller.info);
router.get('/type/:type', San_pham_controller.type);

router.get('/Gio_hang', function(req, res, next) {
  res.render('Gio_hang', { title: 'Giỏ hàng' });
});

router.get('/Dang_xuat', function(req, res, next) {
  req.logout();
  res.redirect('Cua_hang');
});

router.get('/Sua_thong_tin', function(req, res, next) {
  res.render('Sua_thong_tin', { title: 'Sửa thông tin' });
});

module.exports = router;

