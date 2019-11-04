// 文件读取模块
const fs = require('fs');

// 一、readFile是非阻塞式的方法,要想让程序按照顺序执行(阻塞式)应该用readFileSync,见注释掉的部分
// 1.异步读取,非阻塞
// fs.readFile("1.txt", (err, data) => {
//     console.log(data.toString());
// });
// 2.同步读取,阻塞
const data = fs.readFileSync("1.txt");
console.log(data.toString());
console.log('读完了!');

// 二、写入文件
// 1.异步写入,非阻塞式
// 写入式
fs.writeFile("3.txt", data.toString(), (err) => {
    console.log("异步写入成功!")
});
// 追加式
fs.writeFile("3.txt", data.toString(), {flag: "a"}, (err) => {
    console.log("异追加成功!!");
});
// 2、同步写入,阻塞式
// 覆盖写入,flag默认是"w"即写入
fs.writeFileSync("2.txt", data.toString());
// 追加写入
fs.writeFileSync("2.txt", data.toString(), {flag: "a"});
