<!-- Created By Liang Shan Guang at 2019-04-28 23:27 -->
<template>
  <div class="panels-box">
    <cube-scroll class="left-panels">
      <ul>
        <li v-for="(list, index) in tabsLabel" @click="selectList(index)" :class="list.active?'active':''" :key="index">
          {{list.label}}
        </li>
      </ul>
    </cube-scroll>
    <cube-scroll class="right-panels">
      <ul>
        <li v-for="(tag, index) in tags" :key="index">
          <img :src="tag.image" alt="">
          <p>{{tag.label}} <i class="cubeic-add" @click="addToCart($event, tag)"></i></p>
        </li>
      </ul>
    </cube-scroll>
  </div>
</template>

<script>
export default {
  name: 'List',
  data () {
    return {
      tabsLabel: [
        {
          label: '热门推荐',
          active: true
        },
        {
          label: '手机数码',
          active: false
        },
        {
          label: '家用电器',
          active: false
        },
        {
          label: '家用空调',
          active: false
        },
        {
          label: '电脑产品',
          active: false
        },
        {
          label: '计生情趣',
          active: false
        },
        {
          label: '美妆护肤',
          active: false
        },
        {
          label: '口红',
          active: false
        },
        {
          label: '手袋',
          active: false
        },
        {
          label: '金银财宝',
          active: false
        },
        {
          label: '手机数码',
          active: false
        },
        {
          label: '生活',
          active: false
        }
      ],
      tags: []
    }
  },
  created () {
    this.getClassify(0) // 页面初始化时加载下标为0的tab
  },
  mounted () {
    // 计算滚动合作的高度
    const leftpanels = document.querySelector('.left-panels')
    const rightpanels = document.querySelector('.right-panels')
    // 获取窗口可视高度
    const bodyheight = document.documentElement.clientHeight
    leftpanels.style.height = bodyheight - 57 + 'px'
    rightpanels.style.height = bodyheight - 57 + 'px'
  },
  methods: {
    // 获取每个tab分类下的数据
    async getClassify (index) {
      const result = await this.$axios.get('/api/classify', { params: { type: index } })
      this.tags = result.data
    },
    // 点击左侧tab切换分类数据
    selectList (index) {
      this.tabsLabel.forEach((val, ind) => {
        if (index === ind) {
          val.active = true
        } else {
          val.active = false
        }
      })
      this.getClassify(index)
    },
    // 添加商品到购物车
    addToCart (e, tag) {
      this.$store.commit('addGoodToCart', tag)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .panels-box
    display flex

    .left-panels
      width 30%

      li
        height 50px
        line-height 50px
        border-bottom 1px solid #fff
        color #333
        background #f8f8f8
        font-size 14px

      .active
        background #fff
        color #e93b3d

    .right-panels
      width 70%

      ul
        display flex
        flex-wrap wrap

        li
          width 50%
          justify-content center
          align-items center
          font-size 15px

          img
            width 80px
            height 80px

          i
            font-size 18px
</style>
