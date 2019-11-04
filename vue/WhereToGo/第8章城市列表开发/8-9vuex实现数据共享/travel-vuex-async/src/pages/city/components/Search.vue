<template>
  <div>
    <div class="search">
      <input v-model="keyword" class="search-input" type="text" placeholder="输出城市名或拼音">
    </div>
    <div class="search-content" ref="search" v-show="keyword">
      <ul>
        <li class="search-item border-bottom" v-for="item in list" :key="item.id">
          {{item.name+'-'+item.spell}}
        </li>
        <li class="search-item border-bottom" v-show="noData">
          没有找到匹配数据
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Bscroll from 'better-scroll'

  export default {
    name: 'Search',
    props: {
      cities: Object
    },
    data () {
      return {
        keyword: '',
        list: [],
        timer: null
      }
    },
    computed: {
      noData () {
        return !this.list.length
      }
    },
    watch: {
      keyword () {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        if (!this.keyword) {
          // 用户输入为空时，搜索结果列表清空
          this.list = []
          return
        }
        this.timer = setTimeout(() => {
          const result = []
          for (let i in this.cities) {
            this.cities[i].forEach((value) => {
              if (value.spell.indexOf(this.keyword) > -1 || value.name.indexOf(this.keyword) > -1) {
                // 如果城市拼音或者名字包含搜索的关键词就执行如下操作
                result.push(value)
              }
            })
          }
          this.list = result
        }, 100)
      }
    },
    mounted () {
      this.scroll = new Bscroll(this.$refs.search)
    }
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

  .search-content
    z-index: 1
    overflow hidden
    top 79px
    left 0
    right 0
    bottom 0
    background #eee
    position absolute

    .search-item
      padding-left 10px
      color #666
      background #fff
      line-height 31px
</style>
