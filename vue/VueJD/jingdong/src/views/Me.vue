<!-- Created By Liang Shan Guang at 2019-04-28 23:28 -->
<template>
  <div>
    <img class="header-img" src="http://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1904/member.png" alt="">
    <ul>
      <li v-for="(item, index) in me_arr" class="me-item" @click="itemClick(item)" :key="index">
        <span class="me-title">{{item.label}}</span>
        <i class="cubeic-arrow"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Me',
  data () {
    return {
      me_arr: [
        { label: '商品收藏' },
        { label: '我的足迹' },
        { label: '店铺收藏' },
        { label: '我的订单' },
        { label: '退出', type: 'exit' }
      ]
    }
  },
  methods: {
    itemClick (item) {
      if (item.type === 'exit') {
        this.$store.commit('setToken', '')// 清除vuex中的token
        localStorage.removeItem('token') // 删除localStorage中的token
        this.$router.push({ path: '/login' }) // 清理完毕，跳转到登陆页
        // 注意购物车数据还存在于localStorage和this.$store.state.cartArr中，正常也需要发给后端存入数据库然后清理掉，这里为了演示暂时不清理了
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .me-item
    font-size 14px
    text-align left
    height 50px
    line-height 50px
    padding-left 5%
    border-bottom 1px solid #eee

    .me-title
      display inline-block
      width 90%

  .header-img
    height 150px
    width 100%
</style>
