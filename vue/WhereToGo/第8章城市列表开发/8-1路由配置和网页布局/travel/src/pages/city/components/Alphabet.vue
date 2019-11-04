<template>
  <ul class="list">
    <li class="item">A</li>
    <li class="item">B</li>
    <li class="item">C</li>
    <li class="item">D</li>
    <li class="item">E</li>
    <li class="item">F</li>
    <li class="item">G</li>
    <li class="item">H</li>
  </ul>
</template>

<script>
  export default {
    name: 'Alphabet'
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
