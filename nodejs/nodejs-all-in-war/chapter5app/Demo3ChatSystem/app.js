// 模块加载
const http = require('http');
// 引入自定义的模块:web服务器创建模块
const myexpress = require("./myexpress/myexpress")
// 初始变量声明
const hostname = "127.0.0.1";
const port = 3000;
// myexpress后面不要加括号!!
const server = http.createServer(myexpress);
// 获取io对象
let io = require("socket.io")(server);
// 创建连接
io.on('connection', function (socket) {
    //监听用户进入和退出
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    // 监听客户端事件
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        // 把详细广播出去
        socket.broadcast.emit("clientBroadCast",msg);
    });
});
server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`)
});