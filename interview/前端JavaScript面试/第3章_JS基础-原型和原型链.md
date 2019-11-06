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
const xialuo = new Student('Rose', 20, '男');
console.log(xialuo.name);
console.log(xialuo.number);
xialuo.sayHi();
```

### 继承

+ extends
+ super
+ 扩展或重写方法

例子如下：

```javascript
// 父类
class People {
    constructor(name) {
        this.name = name;
    }

    eat() {
        console.log(`${this.name} eat something`)
    }
}

// 子类1
class Student extends People {
    constructor(name, number) {
        super(name);
        this.number = number
    }

    sayHi() {
        console.log(`${this.name}, 学号 ${this.number}`)
    }
}

class Teacher extends People {
    constructor(name, major) {
        super(name);
        this.major = major
    }

    teach() {
        console.log(`${this.name}, 专业 ${this.major}`)
    }
}

// 测试代码
// 学生 夏洛
const xialuo = new Student('Rose', 20);
console.log(xialuo.name);
console.log(xialuo.number);
xialuo.sayHi();
xialuo.eat();
// 老师 王老师
const wang = new Teacher('王老师', '语文');
wang.teach();
wang.eat();
```

## 3.3 原型

### 举例

接着上面的代码，执行

```javascript
// 类型判断
console.log(xialuo  instanceof Student); // true
console.log(xialuo  instanceof People); // true
console.log(xialuo  instanceof Object); // true
console.log([] instanceof Array); // true
console.log([] instanceof Object); // true
console.log({} instanceof Object); // true
```

class实际上是函数，是js的一种语法糖，例子如下
```javascript
// class实际上是函数，从下面的例子可以看出实际是语法糖
console.log(typeof People); // 'function'
console.log(typeof Student); // 'function'

// 隐式原型和显示原型
console.log(rose.__proto__); // Student {}
console.log(Student.prototype); // Student {}
console.log(rose.__proto__ === Student.prototype); // true
```
原型图示如下：
![隐式原型和显示原型](https://img.mukewang.com/szimg/5dc285d60001568e19201080.jpg)

### 原型关系

+ 每个class都有显示原型prototype
+ 每个类实例都有隐式原型`__proto__`
+ 实例的__proto__指向对应class的prototype

### 基于原型的执行规则

+ 获取属性xialuo.name或者执行方法xialuo.sayHi()时
+ 先在自身属性和方法中寻找
+ 如果找不到则自动去`__proto__`中查找

## 3.4 原型链和instanceof

### 原型链图示

![原型链](https://img.mukewang.com/szimg/5dc2888600010e1219201080.jpg)

### 原型链验证

![原型链验证](https://img.mukewang.com/szimg/5dc289da0001bcb219201080.jpg)

### 复杂的原型链

![复杂的原型链](https://img.mukewang.com/szimg/5dc2918c00012a2819201080.jpg)

原型链网上找能找到，instanceof就是true

### 重要提示

+ class是ES6语法规范，由ECMA委员会发布
+ ECMA只规定语法规则，即我们代码的书写规范，不规定如何实现
+ 以上实现方式都是V8引擎的实现方式，也是主流的

## 3.5 问题解答和汇总

### 如何准确判断一个变量是不是数组？

```javascript
a instanceof Array
```

### class的原型本质

+ 原型和原型链的图示
+ 属性和方法的执行规则

### 手写简单的jQuery，考虑插件和扩展性

