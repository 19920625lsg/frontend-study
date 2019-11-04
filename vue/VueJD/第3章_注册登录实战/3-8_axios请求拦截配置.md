# 3-8_axios请求拦截配置

> 主要是拦截所有http请求，在其header中加上token，方便后端验证。拦截器可以省去在每个接口中做同样操作的重复劳动

## setaxios.js

+ 拦截http请求的请求request，把token加到header中，传给后端进行身份验证
+ 拦截http请求的响应response,实现
  + 判断错误码等于-2说明token过期页面应该跳到登陆页
  + 把response.data的层次简化为data，这样就不用每个接口都麻烦地去再取一遍data了
  
```javascript
/**
 * http全局拦截
 * 把token放在我们http请求的header里带给后端
 */

import axios from 'axios'
import store from './store'
import router from './router'

export default function setAxios () {
  // 请求request拦截
  axios.interceptors.request.use(
    config => {
      if (store.state.token) {
        // 如果本地有token就把token放到请求头中
        config.headers.token = store.state.token
      }
      return config
    }
  )

  // 响应response拦截
  axios.interceptors.response.use(
    resp => {
      if (resp.status === 200) {
        const data = resp.data
        if (data.errno === -1) {
          // 接口请求失败

        } else if (data.errno === -2) {
          // 登陆有效期过期
          store.commit('setToken', '') // 清空vuex的token
          localStorage.token = '' // 清空localStorage的token
          router.replace({ path: '/login' }) // 跳转到登陆页
        }
        return data
      }
      return resp
    }
  )
}
```

## vue.config.js

> 配置接口，尤其注册错误码errno

```javascript
/**
 * 每次更改这个配置文件后都需要重启应用
 */

const appData = require('./data') // 获取json数据
const userPool = appData.login_data.user_pool // 用户池

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

## main.js

> 引入拦截器setaxios.js并调用拦截器函数setaxios()

```javascript
import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'amfe-flexible'
import setaxios from './setaxios' // 引入拦截器

setaxios() // 拦截htpp的请求和响应

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

```

## Register.vue和Login.vue

> 修改接口取数据的不是，不需要用resp.data来获取了，直接用data就能拿到后端接口的json数据

### Register.vue

```vue
<template>
  <div>
    <img class="headerimg" src="http://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1904/springcloud_banner.png" alt="">
    <cube-form
      :model="model"
      :schema="schema"
      @submit="submitHandler">
    </cube-form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      model: {
        username: '',
        password: ''
      },
      schema: {
        fields: [
          {
            // 用户名配置
            type: 'input',
            modelKey: 'username',
            label: '用户名',
            props: {
              // 提示详细
              placeholder: '请输入用户名'
            },
            rules: {
              // 校验规则,参考文档https://didi.github.io/cube-ui/#/zh-CN/docs/validator#cube-%E8%A7%84%E5%88%99-anchor
              required: true,
              type: 'string',
              min: 3,
              max: 15
            },
            trigger: 'blur',
            messages: {
              required: '用户名不能为空！',
              min: '用户名不能少于3个字符',
              max: '用户名不能大于15个字符'
            }
          },
          {
            // 密码配置
            type: 'input',
            modelKey: 'password',
            label: '密码',
            props: {
              // 提示详细
              placeholder: '请输入密码',
              type: 'password',
              eye: {
                open: false // 默认查看密码的小眼睛关闭
              }
            },
            rules: {
              // 校验规则,参考文档https://didi.github.io/cube-ui/#/zh-CN/docs/validator#cube-%E8%A7%84%E5%88%99-anchor
              required: true
            },
            trigger: 'blur'
          },
          {
            // 提交按钮
            type: 'submit',
            label: '注册'
          }
        ]
      }
    }
  },
  methods: {
    submitHandler (e) {
      e.preventDefault() // 阻止默认事件，防止页面刷新
      this.$axios.get('/api/register', { params: this.model })
        .then(data => { // 经过拦截器拦截直接就拿到data了
          console.log('注册成功')
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .headerimg
    height: 150px
    width: 100%
</style>
```

### Login.vue

```vue
<template>
  <div>
    <img class="headerimg"
         src="http://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1904/rocketmq_banner.png" alt="">
    <cube-form
      :model="model"
      :schema="schema"
      @submit="submitHandler">
    </cube-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      model: {
        username: '',
        password: ''
      },
      schema: {
        fields: [
          {
            // 用户名配置
            type: 'input',
            modelKey: 'username',
            label: '用户名',
            props: {
              // 提示详细
              placeholder: '请输入用户名'
            },
            rules: {
              // 校验规则,参考文档https://didi.github.io/cube-ui/#/zh-CN/docs/validator#cube-%E8%A7%84%E5%88%99-anchor
              required: true,
              type: 'string',
              min: 3,
              max: 15
            },
            trigger: 'blur',
            messages: {
              required: '用户名不能为空！',
              min: '用户名不能少于3个字符',
              max: '用户名不能大于15个字符'
            }
          },
          {
            // 密码配置
            type: 'input',
            modelKey: 'password',
            label: '密码',
            props: {
              // 提示详细
              placeholder: '请输入密码',
              type: 'password',
              eye: {
                open: false // 默认查看密码的小眼睛关闭
              }
            },
            rules: {
              // 校验规则,参考文档https://didi.github.io/cube-ui/#/zh-CN/docs/validator#cube-%E8%A7%84%E5%88%99-anchor
              required: true
            },
            trigger: 'blur'
          },
          {
            // 提交按钮
            type: 'submit',
            label: '登录'
          }
        ]
      }
    }
  },
  methods: {
    // async...await是es7中的语法，可以把异步方法进行同步调用,这样写更符合传统编程的调用思维
    async submitHandler (e) {
      e.preventDefault() // 阻止默认事件，防止页面刷新
      try {
        const data = await this.$axios.get('/api/login', { params: this.model }) // 经过拦截器拦截已经直接拿到data了
        if (data.errno === 0) {
          // 登录成功,就存储token
          this.$store.commit('setToken', data.token)
        } else {
          // 登录失败
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .headerimg
    height: 150px
    width: 100%
</style>

```
