<template>
  <div class="search">
    <input class="search-input" type="text" placeholder="输出城市名或拼音">
  </div>
</template>

<script>
  export default {
    name: 'Search'
  }
</script>

<style lang="stylus" scoped>
  @import "../../../assets/styles/variables.styl"
  .search
    height 40px
    background $bgColor
    padding 0 5px

    .search-input
      width: 96%
      text-align center
      border-radius 10px
      height 31px
      line-height 31px
      color #666
      padding 0 5px
</style>
