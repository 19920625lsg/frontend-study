// 路径处理函数(只有文件读写和网络传输才分同步和异步)
const path = require("path");
let mypath = "D:\\l00379880\\GithubProjects\\SpringBoot开发小而美的博客--资料.zip";
// 文件名
console.log(path.basename(mypath));
// 扩展名
console.log(path.extname(mypath));
// 文件夹名称
console.log(path.dirname(mypath));
// 当前路径(文件夹)
console.log(__dirname);
// 当前路径(文件)
console.log(__filename);
// join方法用于连,接指定层级的路径,多几个点就向上返回几层路径
console.log(path.join(mypath,"..", 'a'));
// 解析路径相关的信息
console.log(path.parse(mypath));
