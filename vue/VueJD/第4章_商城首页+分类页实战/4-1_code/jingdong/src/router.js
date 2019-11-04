import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import componentA from './components/ComponentA'
import componentB from './components/ComponentB'
import Home from './views/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Register.vue')
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
