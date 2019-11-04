# 第9章 打包构建和项目部署

## 打包后的文件介绍

> 打包后的文件，xxx是每次打包都会生成的唯一的哈希码

+ 1.`dist/js/chunk-vendors.xxx.js`  依赖的第三方js库
+ 2.`dist/css/chunk-vendors.xxx.css` 依赖的第三方样式库
+ 3.`dist/js/app.xxx.js` 自己开发的vue组件js部分
+ 4.`dist/css/app.xxx.css` 自己开发的vue组件的css部分

## 打包文件大小的优化

在package.json中配置编译目标添加：

```javascript
"report": "vue-cli-service build --report"
```

然后用`npm run report`可以生成带报告的report,里面详细列出了打包文件中每个组件的大小

然后既可以针对性地进行优化了
