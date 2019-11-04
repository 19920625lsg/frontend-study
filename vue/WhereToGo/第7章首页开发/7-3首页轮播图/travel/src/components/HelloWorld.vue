<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <router-link to="/">返回首页</router-link>
    </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Hello World'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1 {
        color: red;
    }
</style>
