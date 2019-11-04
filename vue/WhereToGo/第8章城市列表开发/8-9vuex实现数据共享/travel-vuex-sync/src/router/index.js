import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home/Home'
import HelloWorld from '../comm/HelloWorld'
import City from '../pages/city/City'

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
    },
    {
      path: '/city',
      name: 'City',
      component: City
    }
  ]
})
