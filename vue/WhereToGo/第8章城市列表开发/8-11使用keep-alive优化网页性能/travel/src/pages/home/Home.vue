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
        data: '',
        lastCity: ''
      }
    },
    methods: {
      getHomeData () {
        // 之所以加上一个参数是为了当城市改变时能重新请求，否则会被keep-alive优化掉从而主页一直不变
        axios.get('/api/home.json?city=' + this.$store.state.city)
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
      this.lastCity = this.$store.state.city
      this.getHomeData()
    },
    // 页面内容变化需要重新缓存时被调用，和keep-alive是配套地
    activated () {
      // 如果当前城市city变化了(搜索页面点了其他城市)就重新请求
      if (this.lastCity !== this.$store.state.city) {
        // 前一次的城市和当前store中的城市不同了
        this.getHomeData()
      }
    }
  }
</script>

<style scoped>
  h1 {
    color: brown;
  }
</style>
