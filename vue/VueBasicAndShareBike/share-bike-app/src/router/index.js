import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Detail from '@/components/Detail'
import Map from '@/components/Map'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: HelloWorld
    },
    {
      //在Detail组件中使用"{{$route.params.id}}"来获取id参数
      path: '/detail/:id/:detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/',
      name: 'Map',
      component: Map
    }
  ]
})
