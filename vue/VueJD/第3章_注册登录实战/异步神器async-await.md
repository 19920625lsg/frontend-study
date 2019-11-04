# 异步神器async-await

> 转载自文章：[异步神器async-await](https://segmentfault.com/a/1190000011526612)

关于异步处理，ES5的回调使我们陷入地狱，ES6的Promise使我们脱离魔障，终于、ES7的async-await带我们走向光明。今天就来学习一下 async-await。

## async-await和Promise的关系

经常会看到`有了 async-await, promise 还有必要学习吗?`、`async-await优于promise的几个特点`，接收了这些信息后，就蒙圈了。现在才知道，**async-await是promise和generator的语法糖**。只是为了让我们书写代码时更加流畅，当然也增强了代码的可读性。简单来说：**async-await 是建立在 promise机制之上的，并不能取代其地位**

## 基本语法

```javascript
async function basicDemo() {
    let result = await Math.random();
    console.log(result);
}

basicDemo();
// 0.6484863241051226
//Promise {[[PromiseStatus]]: "resolved", [[PromiseValue]]: undefined}
```

## async

async用来表示函数是异步的，定义的函数会返回一个promise对象，可以使用then方法添加回调函数。

```javascript
async function demo01() {
    return 123;
}

demo01().then(val => {
    console.log(val);// 123
});
```

若 async 定义的函数有返回值，return 123;相当于Promise.resolve(123),没有声明式的 return则相当于执行了Promise.resolve();

## await

await 可以理解为是 async wait 的简写。await 必须出现在 async 函数内部，不能单独使用。

```javascript
function notAsyncFunc() {
    await Math.random();
}
notAsyncFunc();//Uncaught SyntaxError: Unexpected identifier
```

await 后面可以跟任何的JS 表达式。虽然说 await 可以等很多类型的东西，但是**它最主要的意图是用来等待 Promise 对象的状态被 resolved**。如果`await的是promise对象会造成异步函数停止执行并且等待promise的解决`,如果等的是正常的表达式则立即执行。

```javascript
function sleep(second) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(' enough sleep~');
        }, second);
    })
}
function normalFunc() {
    console.log('normalFunc');
}
async function awaitDemo() {
    await normalFunc();
    console.log('something, ~~');
    let result = await sleep(2000);
    console.log(result);// 两秒之后会被打印出来
}
awaitDemo();
// normalFunc
// VM4036:13 something, ~~
// VM4036:15  enough sleep~
```

希望通过上面的 demo，大家可以理解我上面的话。

## 实例

举例说明啊，你有三个请求需要发生，第三个请求是依赖于第二个请求的解构第二个请求依赖于第一个请求的结果。若用 ES5实现会有3层的回调，若用Promise 实现至少需要3个then。一个是代码横向发展，另一个是纵向发展。今天指给出 async-await 的实现哈~

```javascript
//我们仍然使用 setTimeout 来模拟异步请求
function sleep(second, param) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(param);
        }, second);
    })
}

async function test() {
    let result1 = await sleep(2000, 'req01');
    let result2 = await sleep(1000, 'req02' + result1);
    let result3 = await sleep(500, 'req03' + result2);
    console.log(`
        ${result3}
        ${result2}
        ${result1}
    `);
}

test();
//req03req02req01
//req02req01
//req01
```

## 错误处理

上述的代码好像给的都是resolve的情况，那么reject的时候我们该如何处理呢？

```javascript
function sleep(second) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('want to sleep~');
        }, second);
    })
}

async function errorDemo() {
    let result = await sleep(1000);
    console.log(result);
}
errorDemo();// VM706:11 Uncaught (in promise) want to sleep~

// 为了处理Promise.reject 的情况我们应该将代码块用 try catch 包裹一下
async function errorDemoSuper() {
    try {
        let result = await sleep(1000);
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

errorDemoSuper();// want to sleep~
// 有了 try catch 之后我们就能够拿到 Promise.reject 回来的数据了。
```

## 小心你的并行处理!!!

我这里为啥加了三个感叹号呢~，因为对于初学者来说一不小心就将 ajax 的并发请求发成了阻塞式同步的操作了，我就真真切切的在工作中写了这样的代码。`await 若等待的是 promise 就会停止下来`。业务是这样的，我有三个异步请求需要发送，相互没有关联，只是需要当请求都结束后将界面的 loading 清除掉即可。
刚学完 async await 开心啊，到处乱用~

```javascript
function sleep(second) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('request done! ' + Math.random());
        }, second);
    })
}

async function bugDemo() {
    await sleep(1000);
    await sleep(1000);
    await sleep(1000);
    console.log('clear the loading~');
}

bugDemo();
```

loading 确实是等待请求都结束完才清除的。但是你认真的观察下浏览器的 timeline 请求是一个结束后再发另一个的（若观察效果请发真实的 ajax 请求）
那么，正常的处理是怎样的呢？

```javascript
async function correctDemo() {
    let p1 = sleep(1000);
    let p2 = sleep(1000);
    let p3 = sleep(1000);
    await Promise.all([p1, p2, p3]);
    console.log('clear the loading~');
}
correctDemo();// clear the loading~
```

恩， 完美。看吧~ async-await并不能取代promise.

## await in for 循环

最后一点了，await必须在async函数的上下文中的。

```javascript
// 正常 for 循环
async function forDemo() {
    let arr = [1, 2, 3, 4, 5];
    for (let i = 0; i < arr.length; i ++) {
        await arr[i];
    }
}
forDemo();//正常输出
// 因为想要炫技把 for循环写成下面这样
async function forBugDemo() {
    let arr = [1, 2, 3, 4, 5];
    arr.forEach(item => {
        await item;
    });
}
forBugDemo();// Uncaught SyntaxError: Unexpected identifier
```

## 参考文章

+ [async 函数的含义和用法](http://www.ruanyifeng.com/blog/2015/05/async.html)
+ [ES7 Async Await 聖經](http://www.ruanyifeng.com/blog/2015/05/async.html)
+ [Understanding JavaScript’s async await](https://ponyfoo.com/articles/understanding-javascript-async-await)