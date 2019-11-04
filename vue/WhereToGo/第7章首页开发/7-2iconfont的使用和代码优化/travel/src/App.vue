<template>
    <div id="app">
        <!--显示地是当前路由地址所对应的内容，并把内容加到当前App.vue的dom结构中-->
        <router-view/>
    </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
</style>
