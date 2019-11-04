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
  // vuex的存储，会被派发到每一个子组件中
  store,
  components: {App},
  template: '<App/>'
})
