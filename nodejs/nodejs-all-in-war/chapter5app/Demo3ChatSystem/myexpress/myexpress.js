/***********************************************************
 * @Description : 自定义的web 服务器
 * @author      : 梁山广
 * @date        : 2017/12/2 18:25
 * @email       : liangshanguang2@gmail.com
 ***********************************************************/
const url = require("url");
const fs = require("fs");

function createMyServer(req, res) {
    let urlObj = url.parse(req.url);
    let content = "Not Found!!";
    if (fs.existsSync("www" + urlObj.pathname)) {
        content = fs.readFileSync("www" + urlObj.pathname);
    }
    // 返回指定URL的内容
    res.end(content.toString());
}

module.exports = createMyServer;