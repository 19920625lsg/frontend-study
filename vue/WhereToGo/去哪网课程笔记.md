# Vue实战去哪网笔记

> 这是每一章的READEME.md的整合

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
  + comm:存放项目中使用到的一些小组件(公共组件)
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

+ 1.router，路由就是根据网址的不同，返回不同的内容给用户。
+ 2.router-view，显示的是当前路由地址所对应的内容。
+ 3.es6 语法中，键值对相同时只写一个就可以。
+ 4.@符号表示 src 目录

### 页面的跳转

+ 使用方式

```vue
  <router-link to="跳转页面的router"></router-link>
```

+ 多页应用：每次页面跳转，后端返回新的HTML文件，优点：首屏时间快，SEO效果好，缺点：页面切换慢。
+ 单页应用：每次页面跳转，JS感知到路由的变化，于是清除当前页面的内容，挂载新的内容到页面中。优点：页面切换快，缺点：首屏时间稍慢，SEO差。

### 移动端项目的初始化

#### 1.防止手指放大,在index.html中添加如下内容

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

#### 7.轮播图

+ 1.安装轮播插件，并固定版本号

  ```bash
  npm install vue-awesome-swiper@2.6.7 --save
  ```

+ 2.在入口文件引入

  ```ecmascript 6
  import VueAwesomeSwiper from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'
  ```

+ 3.下面写上

    ```javascript 6
    Vue.use(VueAwesomeSwiper)
    ```

+ 4.swiper标签代码直接从官方复制
+ 5.data里写上swiperOption
+ 6.在组件中使用见[官方文档](https://github.com/surmon-china/vue-awesome-swiper),我的home/components/Carousel组件就是这么用地

#### 8.引入和使用axios

+ 1.安装axios

  ```bash
  npm install axios --save
  ```

+ 2.在组件中引入axios

  ```bash
  import axios from 'axios'
  ```

+ 3.使用生命周期函数mounted 获取ajax数据.
+ 4.请求url

  ```javascript
  axios.get('/api/index.json')
  ````

+ 5.axios返回的是Promise对象，可以使用then
  > 345的完整代码如下

  ```javascript
  methods: {
    getHomeData () {
      axios.get('/api/index.json')
        .then(this.getHomeDataSuccess)
    },
    getHomeDataSuccess (res) {
      console.log(res)
    }
  },
  mounted () {
    this.getHomeData()
  }
  ```

+ 6.模拟后端数据
  > 类似react项目的public路径，可以在vue项目的static路径存放json文件,然后通过http请求得到json文件中的内容，然后通过父子组件传值传给子组件

#### 9.[转发机制-代理]webpack的功能

+ 需求：当请求地址为/api开头时，把该请求转发到本地的 /static/mock 目录
+ 目的：模拟真实路径，防止上线后再修改请求路径而出现问题
+ 方法：在config/index.js里面的 dev -> proxyTable中 设置如下（详情如图）

  ```javascript
  proxyTable: {
    '/api': {
      target: 'http://localhost:8080',
      pathRewrite: {
        '^/api': '/static/mock'
      }
    }
  }
  ```

#### 10.vue-项目中使用 better-scroll

> https://github.com/ustbhuangyi/better-scroll

+ 1.安装
  `npm i better-scroll --save`
+ 2.组件中引入

  ```javascript
  import bscroll form 'better-scroll'
  ```

+ 3.使用

  ```javascript
  const wrapper = document.querySelector('.wrapper')
  const scroll = new BScroll(wrapper)
  ```

#### 11.vuex原理和使用

+ 安装

  ```sh
  npm install vuex
  ```

+ 使用
  + 在src目录下创建store目录(vuex涉及的内容太多，所以单独创建目录去搞)，store下创建index.js，写入如下内容

    ```javascript
    import Vue from 'vue'
    import Vuex from 'vuex'

    Vue.use(Vuex)

    export default new Vuex.Store({
      state: {
        // state相当于全局变量用于存储各个组件的公共数据
        city: '德州'
      }
    })
    ```

  + 在main.js中引入如下内容(15和25行)

    ```javascript
    // The Vue build version to load with the `import` command
    // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
    import Vue from 'vue'
    import App from './App'
    import router from './router'
    // 解决移动端点击300ms延迟问题
    import fastClick from 'fastclick'
    // 解决基础样式修饰问题
    import './assets/styles/reset.css'
    // 解决多倍屏里面1像素边框会被显示多像素的问题需要引入
    import './assets/styles/border.css'
    // 从http://iconfont.cn自定义的图标
    import './assets/styles/iconfont/iconfont.css'
    // 从store目录(引入vuex涉及的操作比较多，所以单独创建目录去搞)中引入vuex
    import store from './store'

    Vue.config.productionTip = false
    fastClick.attach(document.body)

    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      // vuex的存储
      store,
      components: {App},
      template: '<App/>'
    })
    ```

  + 在需要使用city属性的组件中通过`{{this.$store.state.city}}`进行引用,如下面的Home/Header组件

    ```javascript
     <RouterLink to="/city">
        <div class="header-right">
          {{this.$store.state.city}}
          <span class="iconfont icon-jiantou"></span>
        </div>
      </RouterLink>
    ```

  ![vuex原理图](https://vuex.vuejs.org/vuex.png)

+ 举例
  > 子组件dispatch传递事件**changeCity**给vuex中的actions，actions接收组件的**changeCity**事件然后传递给mutations。之所以用action时为了进行数据修改的异步操作
  + 1.src/Home/List.vue组件dispatch时间传给actions

    ```javascript
    <div class="area">
      <div class="title border-topbottom">热门城市</div>
      <div class="btn-list">
        <div class="btn-wrapper" v-for="item in hotCities" :key="item.id" @click="handleCityClick(item.name)">
          <div class="btn">{{item.name}}</div>
        </div>
      </div>
    </div>
    ```

    ```javascript
    methods: {
      handleCityClick (city) {
        // 类似redux
        this.$store.dispatch('changeCity', city)
      }
    }
    ```

  + 2.store/index.js中actions接收子组件的dispatch事件**changeCity**，然后commit给mutations

    ```javascript
    actions: {
      /**
       * 接收City/List组件发过来的changeCity事件，
       * @param ctx vuex中的上下文对象，用于执行commit方法
       * @param city 组件传过来地要修改的值
       */
      changeCity (ctx, city) {
        ctx.commit('changeCity', city)
      }
    }
    ```

  + 3.store/index.js中在mutations中接收actions所commit过来的事件修改state中的**city**值

    ```javascript
    // 接收actions的commit事件并修改state中的值
    mutations: {
      /**
       * 接收actions中commit过来的changeCity事件，来改变state中的city值
       * @param state
       * @param city
       */
      changeCity (state, city) {
        state.city = city
      }
    }
    ```

  > 非异步操作可以在City/List组件中的handleCityClick中直接用this.$store.commit('changeCity', city)就行了，actions这层可去掉
  + 1.src/Home/List.vue组件dispatch时间传给actions

    ```javascript
    <div class="area">
      <div class="title border-topbottom">热门城市</div>
      <div class="btn-list">
        <div class="btn-wrapper" v-for="item in hotCities" :key="item.id" @click="handleCityClick(item.name)">
          <div class="btn">{{item.name}}</div>
        </div>
      </div>
    </div>
    ```

    ```javascript
    methods: {
      handleCityClick (city) {
        // 类似redux
        this.$store.commit('changeCity', city)
      }
    }
    ```

  + 2.store/index.js中在mutations中接收actions所commit过来的事件修改state中的**city**值

    ```javascript
    // 接收actions(异步)或者组件(同步)的commit事件并修改state中的值
    mutations: {
      /**
       * 接收actions中commit过来的changeCity事件，来改变state中的city值
       * @param state
       * @param city
       */
      changeCity (state, city) {
        state.city = city
      }
    }
    ```

#### 12.页面跳转

+ template中

  ```html
  <router-link :to="router中的路由url">
  ```

+ script中

  ```javascript
  this.$router.push('router中的路由url')
  ```

#### 13.简化this.$store.state.xxx之mapState和mapMutations的使用

+ 1、引入mapState, mapMutations

    ```javascript
    import {mapState, mapMutations} from 'vuex'
    ```

+ 2、把mapState添加到计算属性（computed）中，把mapMutations添加到方法（methods）中

    ```javascript
    computed: {
        ...mapState({
          // 把this.$store.state中的city值映射到当前的vue组件中的currentCity
          // 然后再组件中就可以用{{this.currentCity}}来调用了
          currentCity: 'city'
        })
      },
      methods: {
        // 把this.$store.mutations中的changeCity方法映射到当前的vue组件中的changeCity
        // 然后再组件中就可以用@click='changeCity'来调用了
        ...mapMutations(
         ['changeCity']
        )
      }
    ```

#### 14.利用`<KeepAlive>`组件和activated()钩子函数实现网页智能缓存

+ 把App.vue的路由用KeepAlive包裹起来

  ```html
  <template>
    <div id="app">
      <!--vue自己提供的网页性能优化组件-->
      <KeepAlive>
        <!--显示地是当前路由地址所对应的内容，并把内容加到当前App.vue的dom结构中-->
        <RouterView/>
      </KeepAlive>
    </div>
  </template>
  ```

+ 在组件Home.vue中的activated()钩子函数添加判断条件，主页内容变化时进行网页刷新

  ```javascript
  // 页面内容变化需要重新缓存时被调用，和keep-alive是配套地
  activated () {
    // 如果当前城市city变化了(搜索页面点了其他城市)就重新请求
    if (this.lastCity !== this.$store.state.city) {
      // 前一次的城市和当前store中的城市不同了
      this.getHomeData()
    }
  }
  ```

#### 15.动态路由

+ 在router中通过 **:参数** 来指定动态参数，如下面

  ```vue
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail
  }
  ```

+ 在组件中通过RouterLink指定动态路由

> `<RouterLink>` 组件支持用户在具有路由功能的应用中 (点击) 导航。 通过 to 属性指定目标地址，默认渲染成带有正确链接的 <a> 标签，可以通过配置 tag 属性生成别的标签.。官方文档地址：https://router.vuejs.org/zh/api/

  ```html
  <RouterLink class="item border-bottom" v-for="item in recommendList"
    :key="item.id" tag="li" :to="'/detail/'+item.id">
  ```

+ 在组件中通过$route获取动态路由

  ```html
  <template>
    <div>
      Detail:{{$route.params.id}}
    </div>
  </template>
  ```

#### 16.项目联调测试发布过程中的小技巧

+ 接口转发
  > 通过修改config/index.js中的proxyTable,可以省去书写"IP:端口"的麻烦，如下图的意思是当在组件中
  > 访问'/api/city'时会默认转发到http://liangshanguang.huawei.com:9999/static/mock/city

  ```javascript
  proxyTable: {
    '/api': {
      target: 'http://liangshanguang.huawei.com:9999',
      pathRewrite: {
        // 当请求地址为/api开头时，把该请求转发到本地的 /static/mock 目录
        '^/api': '/static/mock'
      }
    }
  }
  ```

+ 支持外网访问(默认只是inline,只能在本机上访问)

> wenpack-dev-server 默认不支持ip打开项目，因此需要在**package.json**配置中进行添加：`--host 0 0 0 0` 代码如下

  ```json
  "scripts": {
      "dev": "webpack-dev-server --host 0.0.0.0 --inline --progress --config build/webpack.dev.conf.js",
      "start": "npm run dev",
      "lint": "eslint --ext .js,.vue src",
      "build": "node build/build.js"
    },
  ```

+ 适配后端的自适应路径
  + 进入项目目录：npm run build。生成一个dist目录(就是要上线的内容)。后端同学放到了根路径下，即可访问。
  + 一般后端会创建一个单独放前端代码的目录，这样就需要更改vue打包编译的根目录，要在前端config/index.js的bulid中，将assetPublishPath：'/目录名称'，目录名称需要和后端创建的目录名称相同

    ```javascript
    build: {
       // Template for index.html
       index: path.resolve(__dirname, '../dist/index.html'),

       // Paths
       assetsRoot: path.resolve(__dirname, '../dist'),
       assetsSubDirectory: 'static',
       // 修改这里即可适配后端自定义发布路径
       assetsPublicPath: '/'
     }
    ```

+ 实现异步组件的按需加载
  + 1.为什么要按需加载？
     > 答：当项目变得越来越庞大的时候，文件内存也会相应增大，过大的文件对于移动应用（App/WebApp）来说非常不友好，加载速度也会相应变慢，此时使用按需加载是一个绝佳的解决办法。
  + 2.打包后的各部分作用
    manifest：配置文件；vendor：公用代码；app：所有页面的业务逻辑，app过于庞大会影响性能
  + 3.怎样实现按需加载?
    > 在src-router的index.js文件中，将各个路由的component改为箭头函数引用

    比如 `compoent: () => import('@/pages/home/Home'`，完整的引用范例如下
