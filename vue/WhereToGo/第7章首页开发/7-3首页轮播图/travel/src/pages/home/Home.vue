<template>
  <div class="home">
    <home-header></home-header>
    <home-carousel></home-carousel>
  </div>
</template>

<script>
  // 自己引入组件的时候可以酌情调整名字
  import HomeHeader from './components/Header'
  import HomeCarousel from './components/Carousel'

  export default {
    name: 'Home',
    components: {
      HomeHeader,
      HomeCarousel
    }
  }
</script>

<style scoped>
  h1 {
    color: brown;
  }
</style>
