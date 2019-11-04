import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home/Home'
import HelloWorld from '../comm/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
