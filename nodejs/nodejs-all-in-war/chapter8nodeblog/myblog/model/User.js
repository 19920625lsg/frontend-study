/***********************************************************
 * @Description : 用户的模型类
 * @author      : 梁山广
 * @date        : 2017/12/3 18:52
 * @email       : liangshanguang2@gmail.com
 ***********************************************************/
const mongoose = require("mongoose");
// 连接指定的数据库
mongoose.connect('mongodb://localhost/myblog', {useMongoClient: true});
mongoose.Promise = global.Promise;
// 指定数据模型
let userSchema = mongoose.Schema({
    username: String,
    password: String,
    createTime: {
        default: Date().toLocaleString(),
        type: Date
    }
});
// 模型映射
let User = mongoose.model('User', userSchema);

module.exports = User;