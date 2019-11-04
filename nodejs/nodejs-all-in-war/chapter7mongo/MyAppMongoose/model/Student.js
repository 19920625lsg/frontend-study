/***********************************************************
 * @Description : 数据模型
 * @author      : 梁山广
 * @date        : 2017/12/3 17:05
 * @email       : liangshanguang2@gmail.com
 ***********************************************************/
const mongoose = require("mongoose");
// 连接指定的数据库
mongoose.connect('mongodb://localhost/student', {useMongoClient: true});
mongoose.Promise = global.Promise;
// 指定数据模型
let studentSchema = mongoose.Schema({
    name: String,
    gender: String,
    age: Number
});
// 模型映射
let Student = mongoose.model('Student', studentSchema);

module.exports = Student;