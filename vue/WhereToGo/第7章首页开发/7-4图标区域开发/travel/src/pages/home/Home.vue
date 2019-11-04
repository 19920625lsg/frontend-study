<template>
  <div class="home">
    <HomeHeader></HomeHeader>
    <HomeCarousel></HomeCarousel>
    <HomeIcons></HomeIcons>
    <HomeRecommend></HomeRecommend>
  </div>
</template>

<script>
  // 自己引入组件的时候可以酌情调整名字
  import HomeHeader from './components/Header'
  import HomeCarousel from './components/Carousel'
  import HomeIcons from './components/Icons'
  import HomeRecommend from './components/Recommend'

  export default {
    name: 'Home',
    components: {
      HomeHeader,
      HomeCarousel,
      HomeIcons,
      HomeRecommend
    }
  }
</script>

<style scoped>
  h1 {
    color: brown;
  }
</style>
