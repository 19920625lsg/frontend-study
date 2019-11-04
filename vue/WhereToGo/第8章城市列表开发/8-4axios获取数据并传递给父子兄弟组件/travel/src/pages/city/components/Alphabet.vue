<template>
  <ul class="list">
    <li class="item" v-for="(item, key) in cities" :key="key">{{key}}</li>
  </ul>
</template>

<script>
  export default {
    name: 'Alphabet',
    props: {
      cities: Object
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../../assets/styles/variables.styl"
  .list
    display flex
    flex-direction column
    justify-content center
    right 0
    top: 79px
    bottom 0
    width: 20px
    position absolute

    .item
      line-height 20px
      text-align center
      color $bgColor
</style>
