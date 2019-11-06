# 第2章 JS基础-变量类型和计算

## 2.1 值类型和引用类型

### 相关题目

+ typeof能判断哪些类型
+ 何时使用===,何时使用==
+ 值类型和引用类型
+ 手写深拷贝

### 知识点--变量类型

#### 一、值类型与应用类型

+ 值类型：原变量a赋值给新变量b，改变新变量b的值，打印a变量，则a变量值未变
+ 引用类型:改变变量b，则a变量也会改变

#### 二、深入分析

+ 值类型：堆里面是变量a与变量b的直接赋值和操纵，所以打印的都是他们原始的值。
+ 引用类型：它是堆里面将a变量赋值给内存地址，将a变量赋值给了b变量时，其实是赋值给他了内存地址，所以在堆里面，当b变量的值改变时，赋给了同一个内存地址，所以a的值也会发生改变。（这也是为了计算机引擎和性能上的优化）。

#### 三、常见的值类型

```javascript
let  a// underfind
const e='love'//字符串类型
const i=100//数字类型
const o=true//布尔类型
const u =Symbol('s')//es6新增Symbol类型
```

#### 四、常见的引用类型
+ 1.对象(obj)类型
  ```javascript
  const obj = { x: 100 } // 复制时需要用Object.assign(target, source)
  ```
+ 2.数组(Array)类型
  ```javascript
  const arr = { 'a', 'b', 'c' } // 复制时需要循环拷贝
  ```
+ 3.空类型
  ```javascript
  const n = null // 特殊引用类型，指针指向为空地址
  ```
+ 4.函数(function)类型
  ```javascript
  function fn() {} //特殊引用类型，不用于存储数据，所以没有“拷贝、赋值函数”一说，其实函数类型可以归为第5类，即函数类型
  ```

### 五、typeof运算符

+ 识别所有值类型
  ```javascript
  let a; // typeof(a) 返回 undefined
  const str = 'abc'; // typeof(str) 返回 string
  const n = 100; // typeof(n) 返回 number
  const b = true; // typeof(b) 返回 boolean
  const s = Symbol('s'); // typeof(s) 返回 symbol
  ```
+ 识别函数
  ```javascript
  typeof(console.log) // function
  typeof(function (){}) // function
  ```
+ 判断是否是引用类型(不可再细分往下识别)
  ```javascript
  typeof(null) // object
  typeof(['a', 'b']) // object
  typeof({ x: 100 }) // object
  ```

### 六、浅拷贝和深拷贝

#### 什么是对象的拷贝

将一个对象赋值给另外一个对象，我们称之为对象的拷贝

#### 浅拷贝

> 将A对象赋值给B对象，修改B独享的属性和方法会影响A对象的属性和方法，我们称之为浅拷贝

```javascript
function Person(name, age, dog) {
    this.name = name;
    this.age = age;
    this.say = function () {
        console.log(this.name, this.age);
    };
    this.dog = dog;
 }
 var p1 = new Person("luodou", 13, {
     name: "wc",
     age: "3"
 });

 // 1.对象之间的直接赋值
 /*
 // 将p1对象赋值给p2对象
 // 本质上是p1和p2都指向了同一块存储空间
 // 所以无论是修改p1还是p2都会影响到另外一个
 // 所以下列代码是浅拷贝
 var p2 = p1;
 console.log(p1.name);
 p2.name = "zq";
 console.log(p1.name);
 */

 // 2.对象属性的逐一赋值
 var p2 = new Person();

 copy(p1, p2);
 function copy(o1, o2){
     for(var key in o1){
         o2[key] = o1[key];
     }
 }

 console.log(p2);

 console.log(p1.dog.name);  //wc
 p1.dog.name = "mm";
 console.log(p1.dog.name);  //mm
```

#### 深拷贝

> 将A对象赋值给B对象，修改B对象的属性和方法不会影响到A对象的属性和方法，我们称之为深拷贝

```javascript
function Person(name, age, dog) {
    this.name = name;
    this.age = age;
    this.say = function () {
        console.log(this.name, this.age);
    };
    this.dog = dog;
}
// var p1 = new Person("lnj", 13, {
//     name: "wc",
//     age: "3"
// });
var p1 = new Person("lnj", 13,{
    name: "wc",
    age: "3"
});
/*
//若传入的是数组也一样，数组也是对象
var p1 = new Person("lnj", 13,[1,3,5]);
*/
var p2 = new Person();

function deepCopy(o1, o2){
    // 取出第一个对象的每一个属性
    for(var key in o1){
        // 取出第一个对象当前属性对应的值
        var item = o1[key]; // dog
        // 判断当前的值是否是引用类型
        // 如果是引用类型, 我们就重新开辟一块存储空间
        if(item instanceof Object){
            var temp = new Object();
            /*
            {name: "wc",age: "3"}
                */
            deepCopy(item, temp);   //递归
            o2[key] = temp;
        }else{
            // 基本数据类型
            o2[key] = o1[key];
        }
    }
}

deepCopy(p1, p2);
console.log(p1.dog.name); // wc
p2.dog.name = "mm";
console.log(p1.dog.name); // wc

/*
deepCopy(p1, p2);
console.log(p1.dog); // wc
p2.dog = [2,4,6];
console.log(p2);
console.log(p1.dog); // wc
*/
```

#### 深拷贝和浅拷贝的注意事项

+ 默认情况下对象之间的直接赋值都是浅拷贝
+ 默认情况下一个对象的属性如果是基本数据类型，那么都是深拷贝(Object.assign)
+ 如果对象的数据包含了引用数据类型，才真正地区分深拷贝和浅拷贝

### 知识点--变量计算

#### 字符串拼接

```javascript
const a = 100 + 10; // 110
const b = 100 + '10' // '10010'
const c = true + '10' // 'true10'
```

#### ==运算符

```javascript
100 == '100' // true
0 == '' // true
0 == false // true
false == '' // true
null == undefined // true
```

除了`==null`之外，其他一律用`===`,例如：

```javascript
const obj = { x: 100 }
if(obj.a == null){}
```
相当于：

```javascript
if(obj.a === null || obj.a === undefined){}
```

#### if语句和逻辑运算(truly变量和falsely变量)

+ truly变量：`!!a === true`的变量,即默认值可以当成true的变量
+ falsely变量：`!!a === false`变量，即默认值可以当成false的变量

> 以下是falsely变量，除此以外都是truly变量

```javascript
!!0 === false
!!NaN === false
!!'' === false
!!null === false
!!undefined === false
!!false === false
```

下面是truly变量例子
```javascript
const a = true
if(a){
    // ......
}

const b = 100
if(b) {
    // ......
}
```

下面是falsely变量

```javascript
const c = ''
if(c){
    // ......
}

const d = null
if(d) {
    // ...
}
let e;
if(e){
    //......
}
```

下面是一些特殊的例子

```javascript
console.log(10 && 0) // 0
console.log('' || 'abc') // 'abc'
console.log(!window.abc) // true
```

## 2.4 题目解决

### typeof能判断哪些类型

+ 识别所有值类型
+ 识别函数
+ 判断是否是引用类型(不可再细分)

### 何时使用===，何时使用==

```javascript
// 除了`==null`之外，其他一律用`===`,例如：
const obj = { x: 100 }
if(obj.a == null){}
// 相当于：
if(obj.a === null || obj.a === undefined){}
```

### 值类型和引用类型的区别

> 赋值后修改赋值后对象是否影响原来的对象，深拷贝和浅拷贝这里要注意下。

```javascript
const obj1 = { x:100, y:200 }
const obj2 = obj1
let x1 = obj1.x
obj2.x = 101
x1 = 102
console.log(obj1) // { x: 101, y: 200 }
```

### 手写深拷贝

+ 注意判断值类型和引用类型，值类型直接赋值即可，引用类型需要递归取属性赋值
+ 注意判断是数组还是对象

代码如下：

```javascript
function Person(name, age, dog) {
    this.name = name;
    this.age = age;
    this.say = function () {
        console.log(this.name, this.age);
    };
    this.dog = dog;
}
// var p1 = new Person("lnj", 13, {
//     name: "wc",
//     age: "3"
// });
var p1 = new Person("lnj", 13,{
    name: "wc",
    age: "3"
});
/*
//若传入的是数组也一样，数组也是对象
var p1 = new Person("lnj", 13,[1,3,5]);
*/
var p2 = new Person();

function deepCopy(o1, o2){
    // 取出第一个对象的每一个属性
    for(var key in o1){
        // 取出第一个对象当前属性对应的值
        var item = o1[key]; // dog
        // 判断当前的值是否是引用类型
        // 如果是引用类型, 我们就重新开辟一块存储空间
        if(item instanceof Object){
            var temp = new Object();
            /*
            {name: "wc",age: "3"}
                */
            deepCopy(item, temp);   //递归
            o2[key] = temp;
        }else{
            // 基本数据类型
            o2[key] = o1[key];
        }
    }
}

deepCopy(p1, p2);
console.log(p1.dog.name); // wc
p2.dog.name = "mm";
console.log(p1.dog.name); // wc

/*
deepCopy(p1, p2);
console.log(p1.dog); // wc
p2.dog = [2,4,6];
console.log(p2);
console.log(p1.dog); // wc
*/
```