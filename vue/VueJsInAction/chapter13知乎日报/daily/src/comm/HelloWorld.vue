<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="text" v-model="city">
    <button @click="handleClick">输入城市后点击</button>
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Hello World',
        city: '德州'
      }
    },
    methods: {
      handleClick() {
        this.$store.commit('changeCity', this.city)
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
