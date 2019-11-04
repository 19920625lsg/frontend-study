import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'

Vue.use(Vuex)

// vuex进行数据存储和修改的原理见https://vuex.vuejs.org/zh/中的https://vuex.vuejs.org/vuex.png
export default new Vuex.Store({
  // 全局变量，用于存储共享数据
  state,
  mutations
})
