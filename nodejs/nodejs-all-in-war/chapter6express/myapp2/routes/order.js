/***********************************************************
 * @Description : 订单查询
 * @author      : 梁山广
 * @date        : 2017/12/2 21:21
 * @email       : liangshanguang2@gmail.com
 ***********************************************************/
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    // render函数取views目录下找到对应的jade的文件
    res.render('order', {msg: "我的订单首页", title: "订单首页"});
});
router.get('/list', function (req, res, next) {
    res.send('订单列表');
});
module.exports = router;