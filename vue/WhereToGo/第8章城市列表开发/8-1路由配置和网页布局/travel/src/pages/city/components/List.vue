<template>
  <div class="list" ref="wrapper">
    <div>
      <div class="area">
        <div class="title border-topbottom">当前城市</div>
        <div class="btn-list">
          <div class="btn-wrapper">
            <div class="btn">上海</div>
          </div>
        </div>
      </div>
      <div class="area">
        <div class="title border-topbottom">热门城市</div>
        <div class="btn-list">
          <div class="btn-wrapper">
            <div class="btn">北京</div>
          </div>
          <div class="btn-wrapper">
            <div class="btn">上海</div>
          </div>
          <div class="btn-wrapper">
            <div class="btn">深圳</div>
          </div>
          <div class="btn-wrapper">
            <div class="btn">广州</div>
          </div>
        </div>
      </div>
      <div class="area">
        <div class="title border-topbottom">A</div>
        <div class="item-list">
          <div class="item border-bottom">阿拉善</div>
          <div class="item border-bottom">阿拉善</div>
          <div class="item border-bottom">阿拉善</div>
          <div class="item border-bottom">阿拉善</div>
          <div class="item border-bottom">阿拉善</div>
          <div class="item border-bottom">阿拉善</div>
          <div class="item border-bottom">阿拉善</div>
        </div>
      </div>
      <div class="area">
        <div class="title border-topbottom">B</div>
        <div class="item-list">
          <div class="item border-bottom">阿拉善</div>
          <div class="item border-bottom">阿拉善</div>
          <div class="item border-bottom">阿拉善</div>
          <div class="item border-bottom">阿拉善</div>
          <div class="item border-bottom">阿拉善</div>
          <div class="item border-bottom">阿拉善</div>
          <div class="item border-bottom">阿拉善</div>
        </div>
      </div>
      <div class="area">
        <div class="title border-topbottom">C</div>
        <div class="item-list">
          <div class="item border-bottom">阿拉善</div>
          <div class="item border-bottom">阿拉善</div>
          <div class="item border-bottom">阿拉善</div>
          <div class="item border-bottom">阿拉善</div>
          <div class="item border-bottom">阿拉善</div>
          <div class="item border-bottom">阿拉善</div>
          <div class="item border-bottom">阿拉善</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Bscroll from 'better-scroll'

  export default {
    name: 'List',
    mounted () {
      this.scroll = new Bscroll(this.$refs.wrapper)
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../../assets/styles/variables.styl"
  .border-topbottom
    &:before
      border-color #ccc

    &:after
      border-color #ccc

  .border-bottom
    &:before
      border-color #ccc

  .list
    overflow hidden
    position absolute
    top 79px
    left 0
    right 0
    bottom 0

    .title
      line-height 22px
      padding-left 10px
      background #eee
      font-size 13px
      color #666

    .btn-list
      overflow hidden
      padding 5px 30px 5px 5px

      .btn-wrapper
        float: left
        width 33.33%

        .btn
          margin 5px
          padding 5px 0
          text-align center
          border 1px solid #ccc
          border-radius 3px

    .item-list
      .item
        line-height 38px
        padding-left 10px
</style>
