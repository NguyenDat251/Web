var express = require('express');
var router = express.Router();

/* GET Logn In page. */
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Log in' });
});



module.exports = router;
