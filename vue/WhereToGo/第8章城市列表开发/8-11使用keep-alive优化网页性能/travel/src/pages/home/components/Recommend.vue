<template>
  <div>
    <div class="title">推荐列表</div>
    <ul>
      <li class="item border-bottom" v-for="item in recommendList" :key="item.id">
        <img :src="item.imgUrl" alt="" class="item-img">
        <div class="item-info">
          <p class="item-title">{{item.title}}</p>
          <p class="item-desc">{{item.desc}}</p>
          <button class="item-button">查看详情</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Recommend',
    props: {
      recommendList: Array
    }
  }
</script>

<style lang="stylus" scoped>
  .title
    margin-top 10px
    line-height 40px
    background #eee
    text-indent 10px

  .item
    overflow hidden
    display: flex
    height 95px

    .item-img
      width 85px
      height 85px
      padding 5px

    .item-info
      flex 1
      padding 5px

      .item-title
        line-height 27px
        font-size 16px

      .item-desc
        line-height 10px
        font-size 10px
        color #ccc

      .item-button
        line-height 22px
        margin-top 10px
        background #ff9300
        padding 0 5px
        border-radius 3px
        color #fff
</style>
