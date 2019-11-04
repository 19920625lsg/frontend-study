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
    data () {
      return {
        iconList: [
          {
            id: 1,
            imgUrl: 'http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png',
            desc: '景点门票'
          },
          {
            id: 2,
            imgUrl: 'http://img1.qunarzz.com/piao/fusion/1804/5a/13ceb38dcf262f02.png',
            desc: '一日游'
          },
          {
            id: 3,
            imgUrl: 'http://img1.qunarzz.com/piao/fusion/1804/ff/fdf170ee89594b02.png',
            desc: '上海必游'
          },
          {
            id: 4,
            imgUrl: 'http://img1.qunarzz.com/piao/fusion/1803/76/eb88861d78fb9902.png',
            desc: '动植物园'
          },
          {
            id: 5,
            imgUrl: 'http://img1.qunarzz.com/piao/fusion/1803/b6/37560ece9c62b502.png',
            desc: '城市风光'
          },
          {
            id: 6,
            imgUrl: 'http://img1.qunarzz.com/piao/fusion/1803/ab/6f7d6e44963c9302.png',
            desc: '泡温泉'
          },
          {
            id: 7,
            imgUrl: 'http://img1.qunarzz.com/piao/fusion/1803/b1/528a9e80403b8c02.png',
            desc: '上海欢乐谷'
          },
          {
            id: 8,
            imgUrl: 'http://img1.qunarzz.com/piao/fusion/1803/47/c2b659e048b11602.png',
            desc: '野生动物园'
          }
        ]
      }
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
