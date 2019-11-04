// 引入自定义模块
const circle = require("./circle");

// 调用自定义函数
console.log(circle.s(10));
console.log(circle.l(10));
// 调用自定义变量
console.log(circle.a);
// 调用一次性全部导出的
// console.log(circle.d(Math.PI));
// console.log(circle.m);