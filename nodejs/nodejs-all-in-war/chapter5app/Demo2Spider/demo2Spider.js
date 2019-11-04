// 爬虫
const http = require("http");
const fs = require("fs");
// 一个类似jQuery的模块,https://github.com/cheeriojs/cheerio,仔细看下文档
const cheerio = require("cheerio");

const localtion = "http://news.baidu.com/?tn=news";
let srcHtml = "";
let results = [];
http.get(localtion, function (res) {
    res.on("data", function (chunk) {
        srcHtml += chunk;
    });
    res.on("end", function () {
        let menus = [];
        // console.log(srcHtml);
        let $ = cheerio.load(srcHtml);
        $("#channel-all li").each((index, item) => {
            console.log($(item).text());
            menus.push({id: index, txt: $(item).text()});
        });
        console.log(menus);
        console.log(JSON.stringify(menus));
        fs.writeFileSync("BaiduNews.txt", JSON.stringify(menus));
    });
});
