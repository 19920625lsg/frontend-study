# 第4章 JS基础之作用域和闭包

## 4.1 作用域和闭包

### 常见题目

+ this的不用应用场景，如何取值？
+ 手写bind函数
+ 实际开发中闭包的应用场景，举例说明
+ 创建10个a标签，点击的时候弹出对应的序号
  > ![4_1_创建10个a标签](images/4_1_创建10个a标签.png)

### 作用域分类

+ 全局作用域
+ 函数作用域
+ 块级作用域(ES6新增)

### 自由变量

+ 一个变量在当前作用域没有定义，但被使用了
+ 向上级作用域，一层一层一次寻找，直到找到为止
+ 如果全局作用域都没找到，则报错xx is not defined

## 4.2 闭包

> 作用于应用的特殊情况，有两种表现：

### 函数作为返回值

```javascript
// 函数作为返回值
function create() {
    let a = 100;
    return function () {
        console.log(a)
    }
}

// 返回一个函数
let fn = create();
const a = 200;
fn(); // 打印100
```

### 函数作为参数被传递

```javascript
// 函数作为参数被传递
function print(fn) {
    const a = 200;
    fn();
}
const a = 100;
function fn() {
    console.log(a)
}

print(fn); // 打印100
```

### 从上面两个例子可以引出闭包的概念

闭包：所有的自由变量的查找，是在函数定义的地方，向上级作用于查找，而不是在执行的地方

## 4.3 this

### this的应用场景

> this取什么值是在函数执行的时候确认的，不是在函数定义的时候确认的

+ 场景1.作为普通函数
+ 场景2.使用call apply bind
+ 场景3.作为对象方法被调用
+ 场景4.箭头函数
+ 场景5.在class方法中调用

### 场景1.作为普通函数 && 场景2.使用call apply bind

```javascript
function fn1() {
    console.log(this);
}
// 场景1.作为普通函数
fn1(); // window对象
// 场景2.使用call apply bind
fn1.call({x: 100}); // { x: 100 })  使用call直接运行,call是的this的作用域变了
const fn2 = fn1.bind({x: 200}); // bind不是直接执行，而是返回一个新的函数对象
fn2(); 
```

### 场景3.作为对象方法被调_用内嵌函数 && 场景4.箭头函数中使用this

+ 场景3：对象函数的内嵌函数中使用this会导致this的指向发生变化
  ```javascript
  // 内嵌函数中使用this，作用域会发生变化
  const zhangsan = {
      name: '张三',
      sayHi() {
          // this即当前对象
          console.log(this);
      },
      wait() {
          setTimeout(function () {
              // this === window对象
              console.log(this);
          })
      }
  };
  zhangsan.sayHi();
  zhangsan.wait();
  /**
   { name: '张三', sayHi: [Function: sayHi], wait: [Function: wait] }
  Timeout {
    _called: true,
    _idleTimeout: 1,
    _idlePrev: null,
    _idleNext: null,
    _idleStart: 60,
    _onTimeout: [Function],
    _timerArgs: undefined,
    _repeat: null,
    _destroyed: false,
    [Symbol(unrefed)]: false,
    [Symbol(asyncId)]: 5,
    [Symbol(triggerId)]: 1 }
  */
  ```
+ 场景4.箭头函数中的this是指向上级函数的作用域,箭头内的this作用域相对于父级不会发生变化
  ```javascript
  // 箭头函数中使用this，this指向上一级的作用域，箭头函数内的this作用域不会发生变化
  const zhangsan = {
      name: '张三',
      sayHi() {
          // this即当前对象
          console.log(this);
      },
      wait() {
          setTimeout(() => {
              // this === 当前对象
              console.log(this);
          })
      }
  };
  zhangsan.sayHi();
  zhangsan.wait();
  /**
   { name: '张三', sayHi: [Function: sayHi], wait: [Function: wait] }
   { name: '张三', sayHi: [Function: sayHi], wait: [Function: wait] }
  */
  ```
### 场景5：类中使用this

> 类中的this指向当前实例

```javascript
class Student {
    constructor(name, number) {
        // this指向当前对象
        this.name = name;
        this.number = number
    }

    sayHi() {
        // this指向当前对象
        console.log(`${this.name}, 学号 ${this.number}`)
    }
}

// 通过类new对象/实例
const zhangsan = new Student('张三', 20, '男');
console.log(zhangsan.name);
console.log(zhangsan.number);
zhangsan.sayHi();
```
