// fs模块中的其他方法
const fs = require("fs");

// 1.重命名,还是喜欢阻塞式的方法
// fs.renameSync("1.txt", "1rename.txt");
// console.log("重命名成功");

// 2.判断文件是否存在
console.log(fs.existsSync("1.txt"));
// 3.获取文件信息
console.log(fs.statSync("2.txt"));

// 4.此外还有mkdir(创建文件夹,只能一层一层地创建.不能级联创建)、unlink(删除文件)、readdir(获取目录下的所有文件)