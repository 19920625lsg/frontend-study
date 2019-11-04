import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'

Vue.use(Vuex)

// vuex进行数据存储和修改的原理见https://vuex.vuejs.org/zh/中的https://vuex.vuejs.org/vuex.png
export default new Vuex.Store({
  // 全局变量，用于存储共享数据
  state,
  // // 接收组件的事件然后传递给mutations。之所以用action时为了进行数据修改的异步操作
  // // 非异步操作可以在City/List组件中的handleCityClick中直接用this.$store.commit('changeCity', city)就行了，actions这层可去掉
  // actions: {
  //   /**
  //    * 接收City/List组件发过来的changeCity事件，
  //    * @param ctx vuex中的上下文对象，用于执行commit方法
  //    * @param city 组件传过来地要修改的值
  //    */
  //   changeCity (ctx, city) {
  //     ctx.commit('changeCity', city)
  //   }
  // },
  //
  // 接收actions(异步)或者组件(同步)的commit事件并修改state中的值
  mutations
})
