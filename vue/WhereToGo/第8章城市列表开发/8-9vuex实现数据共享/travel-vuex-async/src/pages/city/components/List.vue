<template>
  <div class="list" ref="wrapper">
    <div>
      <div class="area">
        <div class="title border-topbottom">当前城市</div>
        <div class="btn-list">
          <div class="btn-wrapper">
            <div class="btn">{{this.$store.state.city}}</div>
          </div>
        </div>
      </div>
      <div class="area">
        <div class="title border-topbottom">热门城市</div>
        <div class="btn-list">
          <div class="btn-wrapper" v-for="item in hotCities" :key="item.id" @click="handleCityClick(item.name)">
            <div class="btn">{{item.name}}</div>
          </div>
        </div>
      </div>
      <div class="area" v-for="(item, key) in cities" :key="key" :ref="key">
        <div class="title border-topbottom">{{key}}</div>
        <div class="item-list">
          <div class="item border-bottom" v-for="innerItem in item" :key="innerItem.id">
            {{innerItem.name}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Bscroll from 'better-scroll'

  export default {
    name: 'List',
    props: {
      // 字符串数组
      hotCities: Array,
      // JSON对象
      cities: Object,
      // 当前界面所在的字母表字母
      activeLetter: String
    },
    methods: {
      handleCityClick (city) {
        // 类似redux
        this.$store.dispatch('changeCity', city)
      }
    },
    mounted () {
      this.scroll = new Bscroll(this.$refs.wrapper)
    },
    watch: {
      /**
       * 监听activeLetter的变化，变化后自动滚动到当前activeLetter的城市列表
       */
      activeLetter () {
        if (this.activeLetter) {
          // 获取对应字母所在的dom元素
          const element = this.$refs[this.activeLetter][0]
          // 利用better-scroll完成滚动到指定dom的功能
          this.scroll.scrollToElement(element)
        }
      }
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
