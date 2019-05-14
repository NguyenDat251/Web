var express = require('express');
var router = express.Router();
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
