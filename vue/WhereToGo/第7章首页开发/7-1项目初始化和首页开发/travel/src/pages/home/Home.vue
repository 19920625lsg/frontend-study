<template>
  <div class="home">
    <home-header></home-header>
  </div>
</template>

<script>
  import HomeHeader from './components/Header'

  export default {
    name: 'Home',
    components: {
      HomeHeader
    }
  }
</script>

<style scoped>
  h1 {
    color: brown;
  }
</style>
