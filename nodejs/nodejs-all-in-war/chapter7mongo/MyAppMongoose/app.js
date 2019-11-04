/***********************************************************************
 * @Description : MongoDB学习(利用Nodejs和Mongoose操作MongoDB的方法)
 * @author      : 梁山广
 * @date        : 2017/12/3 16:48
 * @email       : liangshanguang2@gmail.com
 **********************************************************************/
let Student = require("./model/Student");
// // 添加数据
// let wr = new Student({name: "王蕊", gender: "male", age: 25});
// wr.save();
// let wn = new Student({name: "王娜", gender: "male", age: 25});
// wn.save();
// let wy = new Student({name: "王燕", gender: "male", age: 25});
// wy.save();

// 数据修改
Student.update({age: {$gt: 20}}, {multi: true}, {age: 33}, function (err) {
    if (err) return console.error(err);
    console.log("修改成功!");
});

// 数据查询,最好符合单复数的原则
Student.find(function (err, students) {
    if (err) return console.error(err);
    console.log(students);
});

Student.find({age: 25}, function (err, students) {
    if (err) return console.error(err);
    console.log(students);
});


