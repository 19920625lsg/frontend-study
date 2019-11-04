/***********************************************************
 * @Description : 第一个demo
 * @author      : 梁山广
 * @date        : 2017/12/2 20:25
 * @email       : liangshanguang2@gmail.com
 ***********************************************************/
const express = require('express');

const app = express();
// 下面是自定义的路由
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/liangshanguang', function (req, res) {
    res.send('爱王蕊');
});

const server = app.listen(3000, "127.0.0.1", function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log(host + port);
    console.log('Example app listening at http://%s:%s', host, port);
});