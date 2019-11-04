# app

> 移动端Vue项目的基础模板

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 项目结构说明

### 文件夹说明
+ build放的webpack打包的配置
+ config 项目配置文件夹 
    + index.js -- 基础配置信息；
    + dev.env.js -- 开发环境的配置；
    + prod.env.js -- 线上环境配置信息
+ node_modules:依赖包
+ src 源代码
    + assets:存放项目中使用到的图片类资源
    + components:存放项目中使用到的一些小组件(公共组件)
    + pages:存放网站的组合页面，通常是做好骨架后从components中进行组织
    + router/index.js:存放项目的所有路由
    + App.vue:项目最原始的跟组件
    + main.js:项目入口文件
+ static 放的静态资源

### 文件说明
+ .babelrc -- 语法解析器配置项  将vue转换成浏览器能执行的代码
+ .editorconfig -- 编辑器的配置项
+ .eslintignore -- 这里面的配置项不受eslint工具(.eslintrc.js里配置的)的检测
+ .eslintrc.js -- 配置了一些代码的规范
+ .gitignore -- 配置不需要上传的文件
+ .postcssrc.js -- postcss的配置文件
+ index.html -- 项目入口，整个项目的挂载点
+ package.json -- 存放依赖包
+ package-lock.json -- package锁文件 确定第三方包的版本
+ README.md --项目说明包
+ LICENSE -- 开源协议的说明

### 代码的说明

+ 1. router，路由就是根据网址的不同，返回不同的内容给用户。
+ 2. router-view，显示的是当前路由地址所对应的内容。
+ 3. es6 语法中，键值对相同时只写一个就可以。
+ 4. @符号表示 src 目录

### 页面的跳转
+ 使用方式 
    ```vue
      <router-link to="跳转页面的router"></router-link>
    ```
+ 多页应用：每次页面跳转，后端返回新的HTML文件，优点：首屏时间快，SEO效果好，缺点：页面切换慢。
+ 单页应用：每次页面跳转，JS感知到路由的变化，于是清除当前页面的内容，挂载新的内容到页面中。优点：页面切换快，缺点：首屏时间稍慢，SEO差。

### 移动端项目的初始化
#### 1. 防止手指放大,在index.html中添加如下内容
```html
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
```

#### 2. 基础样式修饰，在main.js中引入如下内容
```javascript
import './assets/styles/reset.css'
```

#### 3. 移动端1像素边框,在main.js中引入如下内容
```javascript
import './assets/styles/border.css'
```

#### 4. 300ms点击延迟
  + 安装fastclick,**--** save表示在打包的时候也是需要的:
   `npm install fastclick --save` 
  + 在main.js中引入如下内容: 
    ```javascript
      import fastClick from 'fastclick'
      fastClick.attach(document.body)
    ```

#### 5. iconfont注册、创建项目
> https://www.iconfont.cn
+ 首页-->图标管理-->新建项目-->搜索图标-->添加到购物车-->进入购物车选择图标-->添加到指定项目

#### 6.代码优化
+ 一、添加全局颜色主题样式增加维护性：  
  + 1.在styles中增加varibles.styl文件里面写 `$bgColor = #00bcd4`，之后将Header.vue中的`background: $bgColor`。
  + 2.在Header.vue中的styles下加入 `@import '~@/assets/styles/varibles.styl'` 即可
> 注意：
  + 1.import在CSS中前必须加@  JS中不用加。
  + 2.@import里面的内容 ‘ ~@’在@=src前加~
+ 二、因为styles目录路径不仅在Header.vue中和main.js中反复出现，所以得想办法干掉，起一个别名。
  + 1.在build里面的**webpack,base.conf.j**s中找到resolve下的alias加入 `'styles': resolve('src/assets/styles')` 。
  + 2.在Header.vue中的styles下修改成 `@import ‘ ~styles/varibles.styl’`
  + 3.同理，在main.js中也修改成 `improt ‘styles/reset.css‘`
  + 4.修改完webapck配置项后一定要重启程序
 

