<template>
  <div class="home">
    <HomeHeader></HomeHeader>
    <HomeCarousel :swiperList="data.swiperList"></HomeCarousel>
    <HomeIcons :iconList="data.iconList"></HomeIcons>
    <HomeRecommend :recommendList="data.recommendList"></HomeRecommend>
  </div>
</template>

<script>
  // 自己引入组件的时候可以酌情调整名字
  import HomeHeader from './components/Header'
  import HomeCarousel from './components/Carousel'
  import HomeIcons from './components/Icons'
  import HomeRecommend from './components/Recommend'
  import axios from 'axios'

  export default {
    name: 'Home',
    components: {
      HomeHeader,
      HomeCarousel,
      HomeIcons,
      HomeRecommend
    },
    data () {
      return {
        // 存放的各个子组件的数据
        data: ''
      }
    },
    methods: {
      getHomeData () {
        axios.get('/api/home.json')
          .then(this.getHomeDataSuccess)
      },
      getHomeDataSuccess (res) {
        let result = res.data
        if (result.ret && result.data) {
          this.data = result.data
        }
      }
    },
    mounted () {
      this.getHomeData()
    }
  }
</script>

<style scoped>
  h1 {
    color: brown;
  }
</style>
