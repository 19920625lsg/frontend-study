import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import state from './state'

Vue.use(Vuex)

// 注册上面引入的各大模块
let store = new Vuex.Store({
  state, // 共同维护的一个状态，state里面可以是很多个全局状态
  mutations // 处理数据的唯一途径，state的改变或赋值只能在这里
})

// 每次调用mutation时都会被这个subscribe监听到，从而在这里做一些通用处理，不用再每个组件里都去更新localStorage.cartArr了
store.subscribe((mutations, state) => {
  localStorage.cartArr = JSON.stringify(state.cartArr) // 对象存储务必先JSON化
})

export default store
