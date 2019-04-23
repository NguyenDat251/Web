var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/danh-sach-tai-khoan', function(req, res, next) {
  res.render('danh-sach-tai-khoan', { title: 'Express' });
});
module.exports = router;
