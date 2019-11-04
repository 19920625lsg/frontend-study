# 4-5_cube-ui如何仿照京东实现分类页

> 本章参考：[cube-scroll](https://didi.github.io/cube-ui/#/zh-CN/docs/scroll), 滚动列表，提供了优质的原生滚动体验，便捷的配置项和事件，是一个基于better-scroll进行封装的组件

## 题外话1：登陆后重定向地址的改变

完成上面的路由分配后，在Login.vue中的登陆成功后，路径应当跳转到`/bottomNav/home`，而不是`home`，Login.vue修改如下：

```javascript
methods: {
  // async...await是es7中的语法，可以把异步方法进行同步调用,这样写更符合传统编程的调用思维
  async submitHandler (e) {
    e.preventDefault() // 阻止默认事件，防止页面刷新
    try {
      const data = await this.$axios.get('/api/login', { params: this.model }) // 经过拦截器拦截已经直接拿到data了
      if (data.errno === 0) {
        // 登录成功,就存储token
        this.$store.commit('setToken', data.token)
        this.$router.replace({ path: '/bottomNav/home' }) // 登陆成功跳转到首页,从'/'改成'/bottomNav/home'
      } else {
        // 登录失败
      }
    } catch (err) {
      console.log(err)
    }
  }
}
```

## 题外话2:BottomNav.vue中的样式不生效

把 `<style lang="stylus" scoped>`中的scoped去掉就行了，因为scoped是根据url判断地，当使用嵌套路由时url会略有不同,此时组件内容为

```vue
<template>
  <div>
    <transition :name="transitionName">
      <!-- 嵌套路由 -->
      <router-view class="Router"></router-view>
    </transition>
    <!-- 底部菜单栏 -->
    <cube-tab-bar
      v-model="selectedLabelDefault"
      :data="tabs"
      @click="clickHandler"
      @change="changeHandler" class="bottom_nav">
    </cube-tab-bar>
  </div>
</template>

<script>
export default {
  name: 'BottomNav',
  data () {
    return {
      transitionName: 'slide-right',
      selectedLabelDefault: '首页',
      tabs: [
        {
          label: '首页',
          icon: 'cubeic-home'
        },
        {
          label: '分类',
          icon: 'cubeic-tag'
        },
        {
          label: '搜索',
          icon: 'cubeic-search'
        },
        {
          label: '购物车',
          icon: 'cubeic-mall'
        },
        {
          label: '我的',
          icon: 'cubeic-person'
        }
      ]
    }
  },
  methods: {
    clickHandler (label) {
      // if you clicked home tab, then print 'Home'
      console.log(label)
    },
    // 点击与自身不同的其他tab
    changeHandler (label) {
      // if you clicked different tab, this methods can be emitted
      switch (label) {
        case '首页':
          this.$router.push({ path: '/bottomNav/home' })
          break
        case '分类':
          this.$router.push({ path: '/bottomNav/list' })
          break
        case '搜索':
          this.$router.push({ path: '/bottomNav/search' })
          break
        case '购物车':
          this.$router.push({ path: '/bottomNav/cart' })
          break
        case '我的':
          this.$router.push({ path: '/bottomNav/me' })
          break
      }
    }
  }
}
</script>

<!--这个导航样式因为是公共地，所以不要用scoped-->
<style lang="stylus">
  .cube-tab-bar.bottom_nav
    position: fixed
    bottom 0
    left 0
    z-index 1000
    width 100%
    background white
    .cube-tab div
      font-size 16px
      padding-top 3px
    i
      font-size 20px
  .Router
    position absolute
    width 100%
    transition all 0.8s ease
  .slide-left-enter, .slide-right-leave
    opacity 0
    -webkit-transform translate(100%, 0)
    transform translate(100%, 0)
  .slide-left-leave, .slide-right-enter
    opacity 0
    -webkit-transform translate(-100%, 0)
    transform translate(-100%, 0)
</style>
```

## 3.利用cube-scroll实现商品列表页展示

### 3.1 vue.config.js

> 添加`/api/classify`接口

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

        // 获取分类页的分类接口
        app.get('/api/classify', (req, res) => {
          switch (req.query.type) {
            case '0':
              res.json({
                data: [
                  {
                    image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                    label: '小米'
                  },
                  {
                    image: '//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                    label: '华为'
                  },
                  {
                    image: '//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                    label: '荣耀'
                  },
                  {
                    image: '//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                    label: '雪梨手机'
                  },
                  {
                    image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                    label: '小米'
                  },
                  {
                    image: '//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                    label: '华为'
                  },
                  {
                    image: '//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                    label: '荣耀'
                  },
                  {
                    image: '//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                    label: '雪梨手机'
                  },
                  {
                    image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                    label: '小米'
                  },
                  {
                    image: '//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                    label: '华为'
                  },
                  {
                    image: '//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                    label: '荣耀'
                  },
                  {
                    image: '//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                    label: '雪梨手机'
                  },
                  {
                    image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                    label: '小米'
                  },
                  {
                    image: '//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                    label: '华为'
                  },
                  {
                    image: '//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                    label: '荣耀'
                  },
                  {
                    image: '//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                    label: '雪梨手机'
                  },
                  {
                    image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                    label: '小米'
                  },
                  {
                    image: '//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                    label: '华为'
                  },
                  {
                    image: '//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                    label: '荣耀'
                  },
                  {
                    image: '//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                    label: '雪梨手机'
                  }

                ]
              })
              break
            case '1':
              res.json({
                data: [
                  {
                    image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                    label: '小米'
                  },
                  {
                    image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                    label: '小米'
                  },
                  {
                    image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                    label: '小米'
                  },
                  {
                    image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                    label: '小米'
                  }
                ]
              })
              break
            case '2':
              res.json({
                data: [
                  {
                    image: '//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                    label: '华为'
                  },
                  {
                    image: '//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                    label: '华为'
                  },
                  {
                    image: '//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                    label: '华为'
                  },
                  {
                    image: '//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                    label: '华为'
                  }
                ]
              })
              break
            case '3':
              res.json({
                data: [
                  {
                    image: '//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                    label: '荣耀'
                  },
                  {
                    image: '//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                    label: '荣耀'
                  },
                  {
                    image: '//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                    label: '荣耀'
                  },
                  {
                    image: '//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                    label: '荣耀'
                  }
                ]
              })
              break
            case '4':
              res.json({
                data: [
                  {
                    image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                    label: '小米'
                  },
                  {
                    image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                    label: '小米'
                  },
                  {
                    image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                    label: '小米'
                  },
                  {
                    image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                    label: '小米'
                  }
                ]
              })
              break
            case '5':
              res.json({
                data: [
                  {
                    image: '//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                    label: '雪梨手机'
                  },
                  {
                    image: '//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                    label: '雪梨手机'
                  },
                  {
                    image: '//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                    label: '雪梨手机'
                  },
                  {
                    image: '//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                    label: '雪梨手机'
                  }
                ]
              })
              break
            case '6':
              res.json({
                data: [
                  {
                    image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                    label: '小米'
                  },
                  {
                    image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                    label: '小米'
                  },
                  {
                    image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                    label: '小米'
                  },
                  {
                    image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                    label: '小米'
                  }
                ]
              })
              break
          }
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

### 3.2 完成List.vue

> 利用了cube-scroll完成自动计算高度和滚动

```vue
<template>
  <div class="panels-box">
    <cube-scroll class="left-panels">
      <ul>
        <li v-for="(list, index) in tabsLabel" @click="selectList(index)" :class="list.active?'active':''" :key="index">
          {{list.label}}
        </li>
      </ul>
    </cube-scroll>
    <cube-scroll class="right-panels">
      <ul>
        <li v-for="(tag, index) in tags" :key="index">
          <img :src="tag.image" alt="">
          <p>{{tag.label}}</p>
        </li>
      </ul>
    </cube-scroll>
  </div>
</template>

<script>
export default {
  name: 'List',
  data () {
    return {
      tabsLabel: [
        {
          label: '热门推荐',
          active: true
        },
        {
          label: '手机数码',
          active: false
        },
        {
          label: '家用电器',
          active: false
        },
        {
          label: '家用空调',
          active: false
        },
        {
          label: '电脑产品',
          active: false
        },
        {
          label: '计生情趣',
          active: false
        },
        {
          label: '美妆护肤',
          active: false
        },
        {
          label: '口红',
          active: false
        },
        {
          label: '手袋',
          active: false
        },
        {
          label: '金银财宝',
          active: false
        },
        {
          label: '手机数码',
          active: false
        },
        {
          label: '生活',
          active: false
        }
      ],
      tags: []
    }
  },
  created () {
    this.getClassify(0) // 页面初始化时加载下标为0的tab
  },
  mounted () {
    // 计算滚动合作的高度
    const leftpanels = document.querySelector('.left-panels')
    const rightpanels = document.querySelector('.right-panels')
    // 获取窗口可视高度
    const bodyheight = document.documentElement.clientHeight
    leftpanels.style.height = bodyheight - 57 + 'px'
    rightpanels.style.height = bodyheight - 57 + 'px'
  },
  methods: {
    // 获取每个tab分类下的数据
    async getClassify (index) {
      const result = await this.$axios.get('/api/classify', { params: { type: index } })
      this.tags = result.data
    },
    // 点击左侧tab切换分类数据
    selectList (index) {
      this.tabsLabel.forEach((val, ind) => {
        if (index === ind) {
          val.active = true
        } else {
          val.active = false
        }
      })
      this.getClassify(index)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .panels-box
    display flex

    .left-panels
      width 30%

      li
        height 50px
        line-height 50px
        border-bottom 1px solid #fff
        color #333
        background #f8f8f8
        font-size 14px

      .active
        background #fff
        color #e93b3d

    .right-panels
      width 70%

      ul
        display flex
        flex-wrap wrap

        li
          width 50%
          justify-content center
          align-items center
          font-size 15px

          img
            width 80px
            height 80px
</style>
```
