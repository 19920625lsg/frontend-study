# 第5章 JS基础之异步

## 5.1 同步和异步的区别

### 常见题目
+ 同步和异步的区别是什么？
+ 手写用Promise加载一张图片
+ 前端使用异步的场景有哪些？
+ 下面代码的输出是啥？
    ```javascript
    // 下面代码的输出顺序是啥 1 3 5 4 2
    console.log(1);
    setTimeout(function () {
        console.log(2)
    }, 1000);
    console.log(3);
    setTimeout(function () {
        console.log(4);
    }, 0);
    console.log(5);
    ```

### 知识点

+ 单线程与异步
+ 应用场景
+ callback hell和Promise

### 单线程与异步
> 异步是由于JS的单线程背景而来地

+ JS是单线程语言，只能同时做一件事
+ 浏览器和nodejs已支持JS启动进程，如Web Worker
+ JS和DOM渲染公用一个线程，因为JS可以修改DOM结构
+ 遇到等待(网络请求，定时任务)不能卡住

### 异步和同步举例

异步举例

```javascript
// 异步,这里的定时器实际是同步callback回调函数来实现的
console.log(100);
setTimeout(function () {
    console.log(200)
}, 1000);
console.log(300);
/**
 * 100
 * 300
 * 200
 */
```

同步举例

```javascript
// 同步，任何异步阻塞都会导致下面的代码无法执行
console.log(100);
alert(200); // 这一步会阻塞下面的所有操作
console.log(300);
```

### 异步和同步的总结

+ 基于JS是单线程语言
+ 异步不会阻塞代码执行
+ 同步会阻塞代码执行

