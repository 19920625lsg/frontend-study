# 3-7_深入剖析vuex并存储token

## 参考资料

+ [vuex原理和使用](../../WhereToGo/去哪网课程笔记.md#11vuex原理和使用)
+ [vuex最详细完整的使用用法](https://blog.csdn.net/qq_35430000/article/details/79412664)

## 使用async...await来实现异步调用同步化

> async...await是es7中的语法，可以把异步方法进行同步调用,这样写更符合传统编程的调用思维

可以参考文章[异步神器async-await](异步神器async-await.md)

用到这个特性的地方是Login.vue组件中调用登陆接口时：

```javascript
methods: {
  // async...await是es7中的语法，可以把异步方法进行同步调用,这样写更符合传统编程的调用思维
  async submitHandler (e) {
    e.preventDefault() // 阻止默认事件，防止页面刷新
    try {
      const result = await this.$axios.get('/api/login', { params: this.model })
      let data = result.data
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

```

## 从登陆接口返回数据取出token，放到localStorage中

> vuex使用的方法见教程 [vuex最详细完整的使用用法](../vuex_demo/vuex最详细完整的使用用法.md)

### state.js中声明token，并设置默认值

```javascript
let defaultToken = ''

try {
  if (localStorage.token) {
    // localstorage中已经有city这个属性，就用localStorage中的。当浏览器刷新是会走到这一步
    defaultToken = localStorage.token
  }
} catch (e) {
  console.log(e.message)
}

// 首先声明一个需要全局维护的状态 state,比如 我这里举例的token
export default {
  token: defaultToken // 默认值
  // id: xxx  如果还有全局状态也可以在这里添加
  // name:xxx
}
```

### mutations.js中设置修改token的事件

```javascript
// 提交 mutations是更改Vuex状态的唯一合法方法
export default {
  setToken (state, token) { // 设置登录用户的token
    state.token = token
    localStorage.token = token
  }
}

```

### Login.vue中commit方法来触发修改token的事件setToken

```javascript
methods: {
  // async...await是es7中的语法，可以把异步方法进行同步调用,这样写更符合传统编程的调用思维
  async submitHandler (e) {
    e.preventDefault() // 阻止默认事件，防止页面刷新
    try {
      const result = await this.$axios.get('/api/login', { params: this.model })
      let data = result.data
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
```

## token的作用

> 详细见文章 [彻底理解cookie_session和token](彻底理解cookie_session和token.md)

token放在vue客户端请求后端接口时的http请求的header中，后端接到请求，从Header中取出token进行校验(身份和时限)，确定token有效就把数据返回给vue客户端请求
