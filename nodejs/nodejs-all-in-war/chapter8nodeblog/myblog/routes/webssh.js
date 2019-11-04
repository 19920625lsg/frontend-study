const express = require('express');
const router = express.Router();

/* 自己定义的ajax接口*/
router.get('/', function (req, res, next) {
    let Client = require('ssh2').Client;
    let conn = new Client();
    conn.on('ready', function () {
        // 下面的'ls'即为命令
        conn.exec('ls', function (err, stream) {
            if (err) throw err;
            stream.on('close', function (code, signal) {
                conn.end();
            }).on('data', function (data) {
                console.log('STDOUT: ' + data);
                res.send("连接并返回成功！！\n" + data);
            }).stderr.on('data', function (data) {
                console.log('STDERR: ' + data);
            });
        });
    }).connect({
        host: '10.102.26.103',
        port: 22,
        username: 'root',
        password: '123456'
    });

});

// 注册页面,注意是在views下的相对路径
router.get('/login', function (req, res, next) {
    res.send("登录成功！！");
});

router.get('/:username/:password', function (req, res, next) {
    res.send(req.params.username + "登录成功！！");
});


// 自定义注册页面
module.exports = router;
