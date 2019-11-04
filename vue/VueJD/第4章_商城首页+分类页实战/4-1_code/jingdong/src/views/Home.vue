<!-- Created By Liang Shan Guang at 2019-04-28 23:09 -->
<template>
  <div id="home">
    <cube-slide ref="slide" :data="items" @change="changePage">
      <cube-slide-item v-for="(item, index) in items" :key="index" @click.native="clickHandler(item, index)">
        <a :href="item.url">
          <img class="banner" :src="item.image">
        </a>
      </cube-slide-item>
    </cube-slide>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      items: []
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
      const data = await this.$axios.get('/api/banners')
      this.items = data.banners
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
</style>
