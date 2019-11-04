<template>
  <div class="header">
    城市选择
    <RouterLink to="/">
      <div class="iconfont icon-fanhui back-icon"></div>
    </RouterLink>
  </div>
</template>

<script>
  export default {
    name: 'Header'
  }
</script>

<style lang="stylus" scoped>
  @import "../../../assets/styles/variables.styl"
  .header
    position relative
    overflow hidden
    height $headerHeight
    line-height $headerHeight
    color #fff
    text-align center
    background $bgColor
    font-size 16px

    .back-icon
      top: 0
      left 0
      position absolute
      text-align center
      font-size 20px
      width 32px
      color #fff
</style>
