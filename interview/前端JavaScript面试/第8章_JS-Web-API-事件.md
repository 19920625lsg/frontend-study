# 第8章 JS-Web-API-事件

## 8.1 事件绑定和冒泡

### 题目

+ 绑定一个通用的事件监听函数
+ 描述事件冒泡的流程(事件可以在DOM上一层层网上冒，可以在上层DOM上进行截获)
+ 无限下拉的图片列表，如何监听每个图片的点击事件？

### 知识点

+ 事件绑定
+ 事件冒泡
+ 事件代理

### 事件绑定

> 添加事件addEventListener

```javascript
const btn = document.getElementById('btn1');
btn.addEventListener('click', event => {
    console.log('clicked');
})
```

> 完成一个通用的事件绑定函数

```javascript
function bingEvent(elem, type, fn) {
    elem.addEventListener(type, fn);
}

const a = document.getElementById('link1')
bindEvent(a, 'click', e => {
    e.preventDefault(); // 阻止默认行为
    alert('clicked');
})
```

### 事件绑定代码示例

> event.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>事件 演示</title>
    <style>
        div {
            border: 1px solid #ccc;
            margin: 10px 0;
            padding: 0 10px;
        }
    </style>
</head>
<body>
<button id="btn1">一个按钮</button>
<script src="event.js"></script>
</body>
</html>
```

> event.js

```javascript
// 通用的事件绑定函数
function bindEvent(elem, type, fn) {
    elem.addEventListener(type, fn);
}

// 获取元素
const btn1 = document.getElementById('btn1');
bindEvent(btn1, 'click', event => {
    console.log(event.target); // 获取事件触发的元素
    event.preventDefault(); // 阻止默认行为
    alert('clicked');
});
```

### 事件冒泡 代码示例

> 冒泡是沿着DOM结构从低向高冒

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>事件冒泡</title>
    <style>
        div {
            border: 1px solid #ccc;
            margin: 10px 0;
            padding: 0 10px;
        }
    </style>
</head>
<body>
<button id="btn1">一个按钮</button>
<div id="div1">
    <p id="p1">激活</p>
    <p id="p2">取消</p>
    <p id="p3">取消</p>
    <p id="p4">取消</p>
</div>
<div id="div2">
    <p id="p5">取消</p>
    <p id="p6">取消</p>
</div>
<script>
    // 通用的事件绑定函数
    function bindEvent(elem, type, fn) {
        elem.addEventListener(type, fn);
    }

    // 事件冒泡演示，body和p1都绑定了点击事件，触发时都会触发，冒泡是沿着DOM结构从低向高冒
    const p1 = document.getElementById('p1');
    bindEvent(p1, 'click', event => {
        // 注释下面一行体验下事件冒泡，p1的点击事件会往上冒到body上，所以不处理事件冒泡地话，点击p1会先后输出激活和取消
        event.stopPropagation(); // 阻止事件冒泡
        console.log('激活');
    });

    const body = document.body;
    bindEvent(body, 'click', event => {
        console.log('取消');
    });
</script>
</body>
</html>
```

