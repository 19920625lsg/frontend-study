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

### 异步和同步的区别

+ 基于JS是单线程语言
+ 异步不会阻塞代码执行
+ 同步会阻塞代码执行

## 5.2 应用场景

+ 网络请求，如ajax请求、图片加载
+ 定时任务，如setTimeout、setInterval

### 网络请求，如ajax请求、图片加载

```javascript
// ajax请求
console.log('start')
$.get('./data1.json', function(data1){
    console.log(data1)
})
console.log('end')
```

```javascript
// 图片加载
console.log('start')
let img = document.createElement('img')
img.onload = function(){
    console.log('loaded')
}
img.src = './xxx.png'
console.log('end')
```

### 定时任务，如setTimeout(一次性)、setInterval(间隔循环执行)

```javascript
// setTimeout,定时指定时间后执行指定函数
console.log(100);
setTimeout(function () {
    console.log(200)
}, 1000);
console.log(300);
```

```javascript
// setInterval,定时指定时间循环执行指定函数
console.log(100);
setInterval(function () {
    console.log(200)
}, 1000);
console.log(300);
```

## 5.3 promise

### callback hell，回调函数的噩梦，比如下面不断嵌套调用ajax

```javascript
// 获取第一份数据
$.get(url1, (data1)=>{
    console.log(data1);

    // 获取第二份数据
    $.get(url2, (data2)=>{
        console.log(data2);

        // 获取第三份数据
        $.get(url3, (data3)=>{
            console.log(data3);

            // ...还可以嵌套请求更多的数据...越陷越深...
        })
    })
})
```

### 上面callback hell的Promise实现,要简单明了地多

```javascript
// 定义Promise函数
function getData(url){
    return new Promise((resolve, reject) => {
        $ajax({
            url,
            success(data){
                resolve(data);
            },
            error(err){
                reject(err);
            }
        })
    })
}

// 链式语法
const url1 = '/data1.json';
const url2 = '/data2.json';
const url3 = '/data3.json';
getData(url1).then(data1 => {
    console.log(data1);
    return getData(url2);
}).then(data2 => {
    console.log(data2);
    return getData(url3);
}).then(data3 => {
    console.log(data3);
}).catch(err =>{
    console.log(err);
})
```

## 5.4 问题解答与总结

### 使用异步Promise加载一张图片

```javascript
function loadImg(src) {
    return new Promise((resolve, reject) => { // resolve和reject都是函数
        const img = document.createElement('img');
        img.onload = () => {
            resolve(img);
        };
        img.onerror = () => {
            let err = new Error(`图片加载失败！${src}`);
            reject(err);
        };
        img.src = src
    })
}

// 使用Promise
const url = 'https://i.loli.net/2019/11/02/WjfdAirGBtRZC7U.jpg';
loadImg(url).then(img => { // 第一个then起resolve的作用
    console.log(img.width);
    return img; // 第一个then的结果传给第二个then
}).then(img => {
    console.log(img.height); // 不继续return就不用往下继续return了
}).catch(ex => { // 起reject的作用
    console.log(ex)
});
```

### 使用异步Promise加载多张图片

```javascript
function loadImg(src) {
    return new Promise((resolve, reject) => { // resolve和reject都是函数
        const img = document.createElement('img');
        img.onload = () => {
            resolve(img);
        };
        img.onerror = () => {
            let err = new Error(`图片加载失败！${src}`);
            reject(err);
        };
        img.src = src
    })
}

// 使用Promise
const url1 = 'https://i.loli.net/2019/11/02/WjfdAirGBtRZC7U.jpg';
const url2 = 'https://i.loli.net/2019/11/02/3YAkm4F8alHwdD6.jpg';
loadImg(url1).then(img1 => { // 第一个then起resolve的作用
    console.log(img1.width);
    return img1; // 第一个then的结果传给第二个then，return一个普通对象
}).then(img1 => {
    console.log(img1.height); // 继续加载第二张图片
    return loadImg(url2); // 返回一个Promise实例，下一个then直接拿到img2
}).then(img2 => {
    console.log(img2.width);
    return img2;
}).then(img2 => {
    console.log(img2.height);
}).catch(ex => { // 起reject的作用
    console.log(ex)
});
```