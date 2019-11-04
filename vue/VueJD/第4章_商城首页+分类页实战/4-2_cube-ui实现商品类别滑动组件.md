# 4-2_cube-ui实现商品类别滑动组件

> 还是使用[Slide组件](https://didi.github.io/cube-ui/#/zh-CN/docs/slide)，不过这次的数据是二维数组，需要两层循环

涉及到的文件修改如下

## data.json

> 添加rolling_list字段

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
    ],
    "rolling_list":[
      [
        {
          "url": "https://m.xdclass.net",
          "image": "https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png",
          "label": "分类一"
        },
        {
          "url": "https://m.xdclass.net",
          "image": "https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png",
          "label": "分类一"
        },
        {
          "url": "https://m.xdclass.net",
          "image": "https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png",
          "label": "分类一"
        },
        {
          "url": "https://m.xdclass.net",
          "image": "https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png",
          "label": "分类一"
        },
        {
          "url": "https://m.xdclass.net",
          "image": "https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png",
          "label": "分类一"
        },
        {
          "url": "https://m.xdclass.net",
          "image": "https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png",
          "label": "分类一"
        },
        {
          "url": "https://m.xdclass.net",
          "image": "https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png",
          "label": "分类一"
        },
        {
          "url": "https://m.xdclass.net",
          "image": "https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png",
          "label": "分类一"
        },
        {
          "url": "https://m.xdclass.net",
          "image": "https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png",
          "label": "分类一"
        },
        {
          "url": "https://m.xdclass.net",
          "image": "https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png",
          "label": "分类一"
        }
      ],
      [
        {
          "url": "https://m.xdclass.net",
          "image": "https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/bat.png",
          "label": "分类一"
        },
        {
          "url": "https://m.xdclass.net",
          "image": "https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/bat.png",
          "label": "分类一"
        },
        {
          "url": "https://m.xdclass.net",
          "image": "https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/bat.png",
          "label": "分类一"
        },
        {
          "url": "https://m.xdclass.net",
          "image": "https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/bat.png",
          "label": "分类一"
        },
        {
          "url": "https://m.xdclass.net",
          "image": "https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/bat.png",
          "label": "分类一"
        },
        {
          "url": "https://m.xdclass.net",
          "image": "https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/bat.png",
          "label": "分类一"
        },
        {
          "url": "https://m.xdclass.net",
          "image": "https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/bat.png",
          "label": "分类一"
        },
        {
          "url": "https://m.xdclass.net",
          "image": "https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/bat.png",
          "label": "分类一"
        },
        {
          "url": "https://m.xdclass.net",
          "image": "https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/bat.png",
          "label": "分类一"
        },
        {
          "url": "https://m.xdclass.net",
          "image": "https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/bat.png",
          "label": "分类一"
        }
      ]
    ]
  }
}
```

## vue.config.js

> 添加`/api/rollinglist`接口

```javascript
/**
 * 每次更改这个配置文件后都需要重启应用
 */

const appData = require('./data') // 获取json数据
const userPool = appData.login_data.user_pool // 用户池
const banners = appData.home_data.banners
const rollingList = appData.home_data.rolling_list

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

        // 滚动分类接口
        app.get('/api/rollinglist', (req, res) => {
          res.json({
            rollinglist: rollingList
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

> 调用`/api/rollinglist`获取数据，二维数组要用双循环，好好体会下

```vue
<template>
  <div id="home">
    <!--  轮播图  -->
    <cube-slide ref="slide" :data="banners" @change="changePage">
      <cube-slide-item v-for="(item, index) in banners" :key="index" @click.native="clickHandler(item, index)">
        <a :href="item.url">
          <img class="banner" :src="item.image">
        </a>
      </cube-slide-item>
    </cube-slide>
    <!--  滚动分类  -->
    <cube-slide :auto-play="false" ref="slidelists" :data="rollinglist" @change="changePage">
      <cube-slide-item v-for="(list, index_list) in rollinglist" :key="index_list" @click.native="clickHandler(list, index_list)">
        <ul class="listul">
          <li class="listli" v-for="(item, index) in list" :key="index">
            <a :href="item.url">
              <img :src="item.image" alt="">
            </a>
          </li>
        </ul>
      </cube-slide-item>
    </cube-slide>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      banners: [], // 轮播图数组
      rollinglist: [] // 滚动分类数组，里面有多个分类，每个分类也是一个数组,可以理解成二维数组
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
      const data1 = await this.$axios.get('/api/banners')
      this.banners = data1.banners

      // 获取滚动数据
      const data2 = await this.$axios.get('/api/rollinglist')
      this.rollinglist = data2.rollinglist
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

    .listul
      display flex
      flex-wrap wrap

    .listli
      width 20%
      justify-content center

      img
        width 35px
        height 35px
        border-radius 50%
        padding 5px 0

      p
        font-size 14px
        padding-bottom 10px
</style>
```
