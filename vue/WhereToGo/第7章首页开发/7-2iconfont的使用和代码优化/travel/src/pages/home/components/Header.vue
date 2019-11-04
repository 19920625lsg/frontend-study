<template>
  <div class="header">
    <div class="header-left">
      <div class="iconfont icon-fanhui back-icon"></div>
    </div>
    <div class="header-input">
      <span class="iconfont icon-sousuo"></span>
      输入城市/景点/游玩主题
    </div>
    <div class="header-right">
      城市
      <span class="iconfont icon-jiantou"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HomeHeader'
  }
</script>

<style lang="stylus" scoped>
  // 也可以把 "~@/assets/styles/variables.styl"，js里用@即可，但是css里要用~@
  @import "../../../assets/styles/variables.styl"

  // 1rem = html里的font-size = 50px
  .header
    display flex
    line-height 42px
    background $bgColor
    color #fff

    .header-left
      width 32px
      float left

      .icon-fanhui
        text-align center
        font-size 20px

    .header-input
      flex 1
      height 32px
      line-height 32px
      margin-left 10px
      margin-top 6px
      background #fff
      color #ccc
      border-radius 5px

    .header-right
      width: 62px
      float right
      text-align center

      .icon-jiantou
        font-size 12px !important
        margin-left -2px
</style>
