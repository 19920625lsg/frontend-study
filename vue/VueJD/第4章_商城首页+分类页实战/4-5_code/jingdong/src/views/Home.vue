<template>
  <div id="home">
    <!--  轮播图  -->
    <cube-slide ref="slide" :data="banners" @change="changePage">
      <cube-slide-item v-for="(item, index) in banners" :key="index" @click.native="clickHandler(item, index)">
        <a :href="item.url">
          <img class="banner" :src="item.image">
        </a>
      </cube-slide-item>
    </cube-slide>
    <!--  滚动分类  -->
    <cube-slide :auto-play="false" ref="slidelists" :data="rollinglist" @change="changePage">
      <cube-slide-item v-for="(list, index_list) in rollinglist" :key="index_list" @click.native="clickHandler(list, index_list)">
        <ul class="listul">
          <li class="listli" v-for="(item, index) in list" :key="index">
            <a :href="item.url">
              <img :src="item.image" alt="">
            </a>
          </li>
        </ul>
      </cube-slide-item>
    </cube-slide>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      banners: [], // 轮播图数组
      rollinglist: [] // 滚动分类数组，里面有多个分类，每个分类也是一个数组,可以理解成二维数组
    }
  },
  methods: {
    changePage (current) {
      console.log('当前轮播图序号为:' + current)
    },
    clickHandler (item, index) {
      console.log(item, index)
    }
  },
  async created () {
    try {
      // 获取轮播图数据
      const data1 = await this.$axios.get('/api/banners')
      this.banners = data1.banners

      // 获取滚动数据
      const data2 = await this.$axios.get('/api/rollinglist')
      this.rollinglist = data2.rollinglist
    } catch (e) {
      console.log(e.message)
    }
  }
}
</script>

<style lang="stylus" scoped>
  #home
    a
      .banner
        display block
        width 100%
        height 175px

    .listul
      display flex
      flex-wrap wrap

    .listli
      width 20%
      justify-content center

      img
        width 35px
        height 35px
        border-radius 50%
        padding 5px 0

      p
        font-size 14px
        padding-bottom 10px
</style>
