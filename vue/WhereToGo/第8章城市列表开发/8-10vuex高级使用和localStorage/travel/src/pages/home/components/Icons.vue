<template>
  <div class="icons">
    <div class="icon" v-for="item in iconList" :key="item.id">
      <div class="icon-img">
        <img class="img-content" :src="item.imgUrl" alt="">
        <p>{{item.desc}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Icons',
    props: {
      iconList: Array
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../../assets/styles/variables.styl"

  .icons
    overflow hidden
    height 0
    padding-bottom 50%
    margin-top 5px

    .icon
      position relative
      float left
      width 25%
      height 0
      padding-bottom 25%

      .icon-img
        position absolute
        top 0
        left 0
        bottom 22px

        p {
          text-align center
          color $txtDark
        }

        .img-content
          width: 100%
          height 100%

</style>
