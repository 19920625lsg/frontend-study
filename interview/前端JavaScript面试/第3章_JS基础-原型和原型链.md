# 第3章 JS基础 原型和原型链

## 3.1 题目和知识点

### 题目

+ 如何准确判断一个变量是不是数组？
+ 手写一个简易的jQuery,考虑插件和扩展性
+ class的原型本质，怎么理解？

### 知识点

+ class和继承
+ 类型判断`instanceof`
+ 原型和原型链

## 3.2 类和继承

### 类

```javascript
class Student {
    constructor(name, number) {
        this.name = name;
        this.number = number
    }

    sayHi() {
        console.log(`${this.name}, 学号 ${this.number}`)
    }
}

// 通过类new对象/实例
const rose = new Student('Rose', 20, '男');
console.log(rose.name);
console.log(rose.number);
rose.sayHi();
```

### 继承

+ extends
+ super
+ 扩展或重写方法