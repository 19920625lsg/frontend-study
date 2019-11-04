var express = require('express');
// 引入用户模型
var User = require('../model/User');

var router = express.Router();

/* 自己定义的ajax接口*/
router.get('/', function (req, res, next) {
    let content = {
        name: "梁山广",
        age: 25,
        gender: "male"
    };
    res.send(content);
});

// 注册页面,注意是在views下的相对路径
router.get('/logup', function (req, res, next) {
    res.render("users/logup");
});

// 注册信息提交页面
router.post('/logup', function (req, res, next) {
    console.log(req.body.username);
    console.log(req.body.password);
    let user = new User({
        username: req.body.username,
        password: req.body.password
    });
    user.save(function (err, data) {
        if (err) {
            res.end("register fail!");
        } else {
            res.end("username:" + req.body.username + ",register success");
        }
    });
});

// 自定义注册页面
module.exports = router;
