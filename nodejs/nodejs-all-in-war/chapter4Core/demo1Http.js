// http
const http = require('http');
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', "text/html");
    res.write("<h1 style='color: red;'>Test</h1>");
    res.end("hello");
});
server.listen("3000", "127.0.0.1", () => {
    console.log("服务已经启动");
});
