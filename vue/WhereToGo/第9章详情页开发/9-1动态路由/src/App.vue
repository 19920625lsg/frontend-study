<template>
  <div id="app">
    <!--vue自己提供的网页性能优化组件-->
    <KeepAlive>
      <!--显示地是当前路由地址所对应的内容，并把内容加到当前App.vue的dom结构中-->
      <RouterView/>
    </KeepAlive>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
</style>
