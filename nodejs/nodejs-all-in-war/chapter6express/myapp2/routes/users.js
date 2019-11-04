var express = require('express');
var router = express.Router();

/* GET users listing. 根路径下加users*/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', function(req, res, next) {
    res.send('注册');
});
module.exports = router;
