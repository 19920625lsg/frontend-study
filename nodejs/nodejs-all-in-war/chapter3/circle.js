// 1. 直接导出函数
exports.s = function (r) {
    return Math.PI * r * r;
};

// 2.先定义函数后导出
function zhouChang(r) {
    return 2 * Math.PI * r;
}

exports.l = zhouChang;
// 3.自定义变量
exports.a = "梁山广";


// 4.一次性全部导出,不推荐
// function zhiJing(r) {
//     return 2 * r;
// }
// module.exports = {
//     d: zhiJing,
//     m: "Hello World"
// };