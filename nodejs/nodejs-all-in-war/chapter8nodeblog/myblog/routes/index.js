var express = require('express');
var router = express.Router();

/* GET home page. */
// pm2 start ./bin/www --watch 可以实现自动重启,一定不要加--watch哦
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

module.exports = router;
