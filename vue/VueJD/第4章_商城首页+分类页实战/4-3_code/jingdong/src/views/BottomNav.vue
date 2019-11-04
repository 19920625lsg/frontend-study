<template>
  <div>
    <!-- 嵌套路由 -->
    <router-view/>
    <!-- 底部菜单栏 -->
    <cube-tab-bar
      v-model="selectedLabelDefault"
      :data="tabs"
      @click="clickHandler"
      @change="changeHandler" class="bottom_nav">
    </cube-tab-bar>
  </div>
</template>

<script>
export default {
  name: 'BottomNav',
  data () {
    return {
      selectedLabelDefault: '首页',
      tabs: [
        {
          label: '首页',
          icon: 'cubeic-home'
        },
        {
          label: '分类',
          icon: 'cubeic-tag'
        },
        {
          label: '搜索',
          icon: 'cubeic-search'
        },
        {
          label: '购物车',
          icon: 'cubeic-mall'
        },
        {
          label: '我的',
          icon: 'cubeic-person'
        }
      ]
    }
  },
  methods: {
    clickHandler (label) {
      // if you clicked home tab, then print 'Home'
      console.log(label)
    },
    // 点击与自身不同的其他tab
    changeHandler (label) {
      // if you clicked different tab, this methods can be emitted
      switch (label) {
        case '首页':
          this.$router.push({ path: '/bottomNav/home' })
          break
        case '分类':
          this.$router.push({ path: '/bottomNav/list' })
          break
        case '搜索':
          this.$router.push({ path: '/bottomNav/search' })
          break
        case '购物车':
          this.$router.push({ path: '/bottomNav/cart' })
          break
        case '我的':
          this.$router.push({ path: '/bottomNav/me' })
          break
      }
    }
  }
}
</script>

<style lang="stylus">
  .cube-tab-bar.bottom_nav
    position: fixed
    bottom 0
    left 0
    z-index 1000
    width 100%
    background white

    .cube-tab div
      font-size 14px
      padding-top 3px

    i
      font-size !important 20px
</style>
