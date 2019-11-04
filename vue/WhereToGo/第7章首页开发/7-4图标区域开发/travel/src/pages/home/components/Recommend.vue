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
    data () {
      return {
        recommendList: [
          {
            id: 1,
            imgUrl: 'http://img1.qunarzz.com/sight/p0/1607/7c/7cda8b6782dabd80b4.img.jpg_200x200_2039e660.jpg',
            title: '上海迪士尼乐园',
            desc: '全球最大的迪士尼城堡,每年接待上千万游客'
          },
          {
            id: 2,
            imgUrl: 'http://img1.qunarzz.com/sight/p0/1502/ba/ba5f873a22327e0f.water.jpg_200x200_9bf5cc14.jpg',
            title: '上海影视乐园',
            desc: '真实艺术地展现上海的历史风貌和人文景观'
          },
          {
            id: 3,
            imgUrl: 'http://img1.qunarzz.com/sight/p0/1612/34/349ee417b69fed40a3.img.jpg_200x200_9c5356e9.jpg',
            title: '上海欢乐谷',
            desc: '敢上1200米长的木质过山车吗？'
          },
          {
            id: 4,
            imgUrl: 'http://img1.qunarzz.com/tuan/team2/1507/2c/83e0e0e7ae082a.jpg_200x200_6d7378b2.jpg',
            title: '东方明珠',
            desc: '259米透明悬空观光廊了解一下~'
          }
        ]
      }
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
