<!-- The ref attr used to find the swiper instance -->
<template>
  <div class="swiper-wrapper">
    <!--v-if="swiperList!=null"可以防止网站初始化时轮播图在最后一页，这里通过计算属性封装了下-->
    <swiper :options="swiperOption" v-if="showSwiper">
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
    props: {
      swiperList: Array
    },
    data () {
      return {
        swiperOption: {
          pagination: '.swiper-pagination',
          // 支持循环轮播
          loop: true
          // 自动播放，更多配置见 https://segmentfault.com/a/1190000014609379
          // autoplay: {
          //   delay: 300
          // }
        }
      }
    },
    computed: {
      showSwiper () {
        return this.swiperList != null
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
    /*height 0%*/
    /*padding-bottom 31.25%*/

    .swiper-img
      width 100%
      height 200px
      background #eee
</style>
