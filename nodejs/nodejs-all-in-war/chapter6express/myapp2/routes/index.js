var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // render函数就是用来渲染模板的
  res.render('index', { title: 'Express' });
});

module.exports = router;
