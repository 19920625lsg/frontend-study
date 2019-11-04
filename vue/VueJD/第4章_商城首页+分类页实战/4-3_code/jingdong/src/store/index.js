import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import state from './state'

Vue.use(Vuex)

// 注册上面引入的各大模块
export default new Vuex.Store({
  state, // 共同维护的一个状态，state里面可以是很多个全局状态
  mutations // 处理数据的唯一途径，state的改变或赋值只能在这里
})
