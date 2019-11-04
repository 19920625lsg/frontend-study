import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'amfe-flexible'
import setaxios from './setaxios'

setaxios() // 拦截htpp的请求和响应

Vue.config.productionTip = false
Vue.prototype.$axios = axios

// 路由拦截守卫：没有登录的用户不能访问某些页面
router.beforeEach((to, from, next) => {
  // 无论是刷新还是跳转路由，都要先进入这个路由前置钩子函数
  store.commit('setToken', localStorage.token) // 把token设置到组件中
  if (to.meta.requireAuth) {
    // 当前页面需要鉴权地话
    if ((store.state.token) && (store.state.token !== 'undefined') && (store.state.token !== '')) {
      // 如果vuex中有token说明用户已经登录,按照正常流程跳到下一个该去的页面
      next()
    } else {
      // 如果用户没登录，就跳转到登录界面
      next({
        path: '/login',
        // 用户登录时可能携带登录后要重定向的地址，比如第三方网站使用w3进行鉴权，登录时就携带了重定向地址
        query: { redirect: to.fullPath }
      })
    }
  } else {
    // 当前页面不需要鉴权,按照正常流程跳到下一个该去的页面
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
