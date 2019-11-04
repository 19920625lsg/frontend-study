var http = require('http');
// http.get('http://www.baidu.com', (res) => {
http.get('http://localhost:3000', (res) => {
    console.log(res.statusCode);
    var result = "";
    res.on('data', (chunk) => {
        result += chunk;
    });

    res.on('end', () => {
        console.log(result);
    });

}).on('error', (e) => {
    console.error(`错误信息:${e.message}`);
});