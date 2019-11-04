<template>
  <div class="header">
    <div class="header-left">返回</div>
    <div class="header-input">内容</div>
    <div class="header-right">城市</div>
  </div>
</template>

<script>
  export default {
    name: 'HomeHeader'
  }
</script>

<style lang="stylus" scoped>
  // 1rem = html里的font-size = 50px
  .header
    display flex
    line-height 42px
    background #00bcd4
    color #fff

    .header-left
      width 32px
      float left

    .header-input
      flex 1
      height 32px
      margin-left 10px
      margin-top 6px
      background #fff
      border-radius 5px

    .header-right
      width: 62px
      float right
      text-align center
</style>
