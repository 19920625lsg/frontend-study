<!-- The ref attr used to find the swiper instance -->
<template>
  <div class="swiper-wrapper">
    <swiper :options="swiperOption">
      <!-- slides -->
      <swiper-slide v-for="item in swiperList" :key="item.id">
        <img class="swiper-img" :src="item.imgUrl" alt="">
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  // require styles
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    name: 'Carousel',
    components: {
      swiper,
      swiperSlide
    },
    data () {
      return {
        swiperOption: {
          pagination: '.swiper-pagination',
          // 支持循环轮播
          loop: true,
          // 自动播放，更多配置见 https://segmentfault.com/a/1190000014609379
          // autoplay: {
          //   delay: 300
          // }
        },
        swiperList: [
          {
            id: 1,
            imgUrl: 'http://img2.imgtn.bdimg.com/it/u=2082300221,3872063947&fm=11&gp=0.jpg'
          },
          {
            id: 2,
            imgUrl: 'http://img0.imgtn.bdimg.com/it/u=4254790060,191829108&fm=11&gp=0.jpg'
          },
          {
            id: 3,
            imgUrl: 'http://img1.imgtn.bdimg.com/it/u=3215474639,4229933100&fm=26&gp=0.jpg'
          },
          {
            id: 4,
            imgUrl: 'http://img2.imgtn.bdimg.com/it/u=2275006027,986065945&fm=26&gp=0.jpg'
          }
        ]
      }
    }
  }
</script>

<style lang="stylus" scoped>
  // 下面两行表示样式穿透，拜托scoped受限于当前组件的问题
  .swiper-wrapper >>> .swiper-pagination-bullet-active
    background #fff !important

  .swiper-wrapper
    // 下面3行是防止页面抖动
    width 100%
    height 0%
    padding-bottom 31.25%

    .swiper-img
      width 100%
      height 200px
      background #eee
</style>
