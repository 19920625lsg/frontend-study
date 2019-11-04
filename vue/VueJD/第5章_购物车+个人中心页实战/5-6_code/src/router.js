import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import componentA from './components/ComponentA'
import componentB from './components/ComponentB'
import Home from './views/Home'
import List from './views/List'
import Search from './views/Search'
import Cart from './views/Cart'
import Me from './views/Me'

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
      // 懒加载注册页面
      component: () => import('./views/Register.vue')
    },
    {
      path: '/bottomNav',
      name: 'bottomNav',
      // 懒加载，底部导航组件
      component: () => import('./views/BottomNav.vue'),
      // 嵌套路由，很重要，嵌套路由不需要再加'/'，一定要注意~~
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: 'home',
          name: 'home',
          component: Home
        },
        {
          path: 'list',
          name: 'list',
          component: List
        },
        {
          path: 'search',
          name: 'search',
          component: Search
        },
        {
          path: 'cart',
          name: 'cart',
          meta: {
            requireAuth: true // 当有这个字段的时候，我们就认为这个路由界面时需要权限的
          },
          component: Cart
        },
        {
          path: 'me',
          name: 'me',
          meta: {
            requireAuth: true // 当有这个字段的时候，我们就认为这个路由界面时需要权限的
          },
          component: Me
        }
      ]
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
