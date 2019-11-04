# 4-1_使用cube-ui实现轮播图并进行内部扩展.md

> 参考文档 https://didi.github.io/cube-ui/#/zh-CN/docs/slide

下面是涉及到的文件的修改

## data.json

> 添加banners图片数据,home_data-->banners

```json
{
  "login_data": {
    "user_pool": [
      {
        "username": "zhangsan",
        "password": "123456"
      },
      {
        "username": "lisi",
        "password": "abcdef"
      },
      {
        "username": "wangwu",
        "password": "ABCDEF"
      }
    ]
  },
  "home_data": {
    "banners": [
      {
        "url": "https://m.xdclass.net",
        "image": "https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png"
      },
      {
        "url": "https://m.xdclass.net",
        "image": "https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/upload/banner/devpay.png"
      },
      {
        "url": "https://m.xdclass.net",
        "image": "https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/bat.png"
      }
    ]
  }
}
```

## vue.config.js

> 利用json数据构建/api/banners接口

```javascript
/**
 * 每次更改这个配置文件后都需要重启应用
 */

const appData = require('./data') // 获取json数据
const userPool = appData.login_data.user_pool // 用户池
const banners = appData.home_data.banners

module.exports = {
  configureWebpack: {
    devServer: {
      port: 9537, // 项目运行端口
      open: true, // 项目用npm run serve命令跑起来后自动打开浏览器
      before: app => {
        // 查看当前的所有用户
        app.get('/api/users', function (req, res) {
          // 返回当前的用户池
          return res.json({
            errno: 0,
            data: userPool
          })
        })
        // 用户注册接口
        app.get('/api/register', function (req, res) {
          const { username, password } = req.query // 从请求体中解析用户名和密码
          const userLength = userPool.filter(v => v.username === username).length // 过滤筛选，返回找到了几个这个用户名的用户
          if (userLength > 0) {
            res.json({
              errno: -1,
              message: '用户名已经存在!'
            })
          } else {
            // 用户不存在，就把用户加到内存池中
            res.json({
              errno: 0,
              message: '注册成功'
            })
          }
        })
        // 登录接口
        let tokenKey = 'huawei'
        app.get('/api/login', function (req, res) {
          const { username, password } = req.query // 从请求体中解析用户名和密码
          const userLength = userPool.filter(v => v.username === username).length // 过滤筛选，返回找到了几个这个用户名的用户
          if (userLength > 0) {
            // 只要用户名在列表里就好了，不校验密码，认为登录成功
            res.json({
              errno: 0,
              // 模拟拼接token，最后的时间戳是过期时间，这里设置为1小时
              token: tokenKey + '-' + username + '-' + (new Date().getTime() + 60 * 60 * 1000),
              message: '登录成功!'
            })
          } else {
            res.json({
              errno: 1,
              message: '用户名或密码错误!'
            })
          }
        })

        // 首页轮播图数据接口
        app.get('/api/banners', (req, res) => {
          res.json({
            banners: banners
          })
        })
      }
    }
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}
```

## Home.vue

> 创建Home组件，使用cube-ui的轮播图组件 + `/api/banners`接口得到的数据渲染出轮播效果

```vue
<template>
  <div id="home">
    <cube-slide ref="slide" :data="items" @change="changePage">
      <cube-slide-item v-for="(item, index) in items" :key="index" @click.native="clickHandler(item, index)">
        <a :href="item.url">
          <img class="banner" :src="item.image">
        </a>
      </cube-slide-item>
    </cube-slide>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      items: []
    }
  },
  methods: {
    changePage (current) {
      console.log('当前轮播图序号为:' + current)
    },
    clickHandler (item, index) {
      console.log(item, index)
    }
  },
  async created () {
    try {
      // 获取轮播图数据
      const data = await this.$axios.get('/api/banners')
      this.items = data.banners
    } catch (e) {
      console.log(e.message)
    }
  }
}
</script>

<style lang="stylus" scoped>
#home
  a
    .banner
      display block
      width 100%
      height 175px
</style>
```

## router.js

> 在router中添加Home组件的路由

```javascript
import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import componentA from './components/ComponentA'
import componentB from './components/ComponentB'
import Home from './views/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Register.vue')
    },
    {
      path: '/componentA',
      name: 'componentA',
      component: componentA
    },
    {
      path: '/componentB',
      name: 'componentB',
      component: componentB
    }
  ]
})

```
