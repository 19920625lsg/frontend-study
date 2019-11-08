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

### 事件绑定--addEventListener

```javascript
const btn = document.getElementById('btn1');
btn.addEventListener('click', event => {
    console.log('clicked');
})
```

### 事件绑定
> 完成一个通用的事件绑定函数

```javascript
function bingEvent(elem, type, fn) {
    elem.addEventListener(type, fn);
}

const a = docu
```