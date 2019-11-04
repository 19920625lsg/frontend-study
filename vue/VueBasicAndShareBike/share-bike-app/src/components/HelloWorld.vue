<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!--路由跳转这个是结合router里面的index.js来进行跳转的-->
    <router-link :to="{name:'Detail',params:{id: 10086}}">跳转到detail组件 </router-link>
  </div>
</template>

<script>

  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Hello World组件'
      }
    }
  }
</script>

<!-- CSS样式写在这里,务必记得加scoped -->
<style scoped>
  h1 {
    font-weight: normal;
  }
</style>
