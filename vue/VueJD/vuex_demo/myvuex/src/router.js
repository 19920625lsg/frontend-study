import Vue from 'vue'
import Router from 'vue-router'
import componentA from './views/ComponentA'
import componentB from './views/ComponentB'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'componentA',
      component: componentA
    },
    {
      path: '/componentA',
      name: 'componentA',
      component: componentA
    },
    {
      path: '/componentB',
      name: 'componentB',
      component: componentB
    }
  ]
})
