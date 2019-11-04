# 第3章_头部组件开发

## 3-1 目录结构 & Header组件

+ 新增common目录，添加需要的字体`fonts`和样式`stylus`(在`src/common`目录下)
+ 添加Header相关的组件support-ico和v-header(在`src/components`目录下)
+ 配置资源路径的别名，方便访问(用~)

## axios封装 & 数据获取

+ 安装axios
  
  ```shell
  npm install axios --save
  ```
  
  > -save 和 -save-dev的区别：https://www.cnblogs.com/limitcode/p/7906447.html
  + 带-save参数安装的模块，会在package文件的dependencies节点下写入依赖,是在项目运行的时候所需要的依赖；
  + 带-save-dev参数安装的模块，会在package文件的devDependencies节点下写入依赖，是在开发是需要的依赖，不随着项目打包的时候一起打包；
  
+ 创建src/api/helpers.js，内容如下：

  ```javascript
  import axios from 'axios'

  // 接口请求成功后的返回码
  const ERR_OK = 0

  export function get (url) {
    return function (params) {
      return axios.get(url, {
        params
      }).then((res) => {
        // 拿到请求返回的数据res, 进行解构和赋值
        const { errno, data } = res.data
        if (errno === ERR_OK) {
          return data
        }
      }).catch((err) => {
        // 打印错误信息
        console.log(err.message)
      })
    }
  }
  ```
  
+ 创建src/api/index.js把接口进行导出

  ```javascript
  // 到处需要的接口和数据

  import { get } from './helpers'

  const getSeller = get('/api/seller')

  export {
    getSeller
  }
  ```

+ 修改App.vue，把seller数据传给VHeader组件

  ```vue
  <template>
  <div id="app">
    <!--把seller数据传给头部组件-->
    <VHeader :seller="seller"></VHeader>
  </div>
  </template>

  <script>
  import VHeader from 'components/v-header/v-header'
  // 导入API的数据
  import { getSeller } from 'api'

  export default {
    name: 'app',
    data () {
      return {
        seller: {}
      }
    },
    created () {
      this._getSeller()
    },
    components: {
      VHeader
    },
    methods: {
      _getSeller () {
        getSeller().then((seller) => {
          // promise函数设置data中的seller值
          this.seller = seller
        })
      }
    }
  }
  </script>
  <style lang="stylus">

  </style>
  ```
 
 v-header组件从属性中接收到seller数据就可以对网页进行渲染了。goods和ratings也是类似的
 
 ## 3-3 header-detail & star 组件
 
从teachercode中的vue-sell中把components下的header-detail和star组件拷贝到mycode的vue-sell中

## 3-4 header-detail交互

主要是v-header中通过create-api实现，相关文档如下:[create-api文档](https://didi.github.io/cube-ui/#/zh-CN/docs/create-api)

**会通过驼峰自动去查找header-detail组件进行调用**

以header-detail.vue组件的调用为例，步骤如下：

+ 在src/register.js中想cube-ui注册header-detail，文件首次需要创建，完成后的内容如下：

```javascript
import { createAPI } from 'cube-ui'

import Vue from 'vue'
import HeaderDetail from 'components/header-detail/header-detail'

createAPI(Vue, HeaderDetail)

```

v-header.vue

```javascript
// v-header.vue
......
 methods: {
    showDetail () {
      this.headerDetailComp = this.headerDetailComp || this.$createHeaderDetail({
        $props: {
          seller: 'seller'
        }
      })
      this.headerDetailComp.show()
    }
  },
 ......
```

+ 在入口文件main.js引入register.js(首次使用register.js时需要),见下面的第4行

  ```javascript
  import Vue from 'vue'
  import './cube-ui'
  import App from './App.vue'
  import './register' // 引入register.js

  Vue.config.productionTip = false

  new Vue({
    render: h => h(App)
  }).$mount('#app')

  ```



 
