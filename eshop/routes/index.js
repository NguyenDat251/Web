var express = require('express');
var router = express.Router();


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

router.post('/sign_up', Dang_ky_controller.sign_in);

router.post('/search', Cua_hang_controller.search);

router.get('/sign_up', function(req, res, next) {
  res.render('Dang_ky', { title: '' });
});

router.get('/forgot', function(req, res, next) {
  res.render('Quen_mat_khau', { title: 'Quên mật khẩu' });
});

router.get('/login', function(req, res, next) {
  res.render('Dang_nhap', { errorText: '' });
});

router.get('/Page/:idPage', Cua_hang_controller.moveNextPage);


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

router.get('/bucket', function(req, res, next) {
  res.render('Gio_hang', { title: 'Giỏ hàng' });
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('Cua_hang');
});

router.get('/editInfo', function(req, res, next) {
  res.render('Sua_thong_tin', { title: 'Sửa thông tin' });
});

module.exports = router;

