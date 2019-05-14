var express = require('express');
var router = express.Router();

var mongo = require('mongodb').MongoClient;

const mongo = require('mongodb').MongoClient;

var objectId = require('mongodb').ObjectID;
var assert = require('assert');
const ObjectId = require('mongodb').ObjectId;
var San_pham_controller = require('../controllers/San_pham_controller');

//const MongoClient = require('mongodb').MongoClient;


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

//router.get('/productInfo', San_pham_controller.info);

var url = 'mongodb+srv://dat:dat251@cluster0-jslyd.mongodb.net/WebDB?retryWrites=true';
//var url = 'mongodb://localhost:27017';
router.get('/productInfo', async function(req, res, next) {
 // var name = [];
 // const data = null;
  await mongo.connect(url,  function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    var dbo = db.db();

    console.log("Connected successfully to database");
    // var cursor = db2.collection('San_pham').find({_id: ObjectId("5cd7df888d899652d46769c0")}).toArray();
    // var data = cursor;
    // console.log(data);
    // res.render('San_pham',{title: 'products.name', data});
    // });

    // db2.createCollection("customers", function (err, res) {
    //   if (err) throw err;
    //   console.log("Collection created!");
    // });

    // dbo.collection("San_pham").find({_id: ObjectId('5cd7df888d899652d46769c0')}).toArray(function(err, result) {
    //   if (err) throw err;
    //   data = result[0];
    //   //res.render('San_pham',{title: 'products.name', result});
    //   //console.log(result[0].name);
    // })

    //res.render('San_pham',{title: 'products.name', data});
    //db2.collection('San_pham').find({}).toArray()
   //console.log(data.name)

    var data1 = dbo.collection("SanPham").find({});//.toArray();
    console.log("Connected successfully to colecction");
   var data = {};
 //res.render('San_pham',{title: 'products.name', data});
  console.log(data1);
  data1.forEach(row => {
      //console.log(row);
    data=row;
    console.log(data);
    res.render('San_pham',{title: 'products.name', data});
  });

  })
});


var url = 'mongodb+srv://dat:dat251@cluster0-jslyd.mongodb.net/WebDB?retryWrites=true';
//var url = 'mongodb://localhost:27017';
router.get('/productInfo', async function(req, res, next) {
    // var name = [];
    // const data = null;
    await mongo.connect(url,  function(err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        var dbo = db.db();

        console.log("Connected successfully to database");

        var data1 = dbo.collection("SanPham").find({});//.toArray();
        console.log("Connected successfully to colecction");
        var data = {};
        //res.render('San_pham',{title: 'products.name', data});
        console.log(data1);
        data1.forEach(row => {
            //console.log(row);
            data=row;
            console.log(data);
            res.render('San_pham',{title: 'products.name', data});
        });

    })
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
