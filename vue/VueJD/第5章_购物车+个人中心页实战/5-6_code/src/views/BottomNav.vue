<template>
  <div>
    <transition :name="transitionName">
      <!-- 嵌套路由 -->
      <router-view class="Router"></router-view>
    </transition>
    <!-- 底部菜单栏 -->
    <cube-tab-bar
      v-model="selectedLabelDefault"
      :data="tabs"
      @click="clickHandler"
      @change="changeHandler" class="bottom_nav">
    </cube-tab-bar>
    <span class="goods-total">{{goodsTotal}}</span>
  </div>
</template>

<script>
export default {
  name: 'BottomNav',
  data () {
    return {
      transitionName: 'slide-right',
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
  created () {
    switch (this.$route.path) {
      case '/bottomNav/index':
        this.selectedLabelDefault = '首页'
        break
      case '/bottomNav/list':
        this.selectedLabelDefault = '分类'
        break
      case '/bottomNav/search':
        this.selectedLabelDefault = '搜索'
        break
      case '/bottomNav/cart':
        this.selectedLabelDefault = '购物车'
        break
      case '/bottomNav/me':
        this.selectedLabelDefault = '我的'
        break
    }
  },
  computed: {
    goodsTotal () {
      let num = 0
      this.$store.state.cartArr.forEach(v => {
        num += v.cartCount
      })
      return num
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

<!--这个导航样式因为是公共地，所以不要用scoped-->
<style lang="stylus">
  .cube-tab-bar.bottom_nav
    position: fixed
    bottom 0
    left 0
    z-index 1000
    width 100%
    background white

    .cube-tab div
      font-size 16px
      padding-top 3px

    i
      font-size 20px

  .Router
    position absolute
    width 100%
    transition all 0.8s ease

  .slide-left-enter, .slide-right-leave
    opacity 0
    -webkit-transform translate(100%, 0)
    transform translate(100%, 0)

  .slide-left-leave, .slide-right-enter
    opacity 0
    -webkit-transform translate(-100%, 0)
    transform translate(-100%, 0)

  .goods-total
    position absolute
    bottom 33px
    right 23%
    z-index: 1001
    width 18px
    height 18px
    line-height 18px
    border-radius 50%
    font-size 14px
    background #F62F24
</style>
