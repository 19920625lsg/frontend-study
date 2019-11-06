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

### 六、深拷贝



### 知识点--变量计算

