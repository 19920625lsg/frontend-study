<!-- Created By Liang Shan Guang at 2019-04-28 23:27 -->
<template>
  <div>
    <div class="goods" v-for="(item, index) in this.$store.state.cartArr" :key="index">
      {{item.title}}
      <div class="goods-right">
        <i class="cubeic-remove" @click="delGood(index)"></i>
        <span>{{item.cartCount}}</span>
        <i class="cubeic-add" @click="addGood(index)"></i>
      </div>
    </div>
    <cube-button style="margin: 10px 0">下单</cube-button>
    <cube-button @click="clearCart">清空购物车</cube-button>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data () {
    return {}
  },
  methods: {
    // 增加商品
    addGood (index) {
      this.$store.commit('addGood', index)
    },
    // 删除商品
    delGood (index) {
      this.$store.commit('delGood', index)
    },
    // 清空购物车
    clearCart () {
      this.$store.commit('clearCart')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .goods
    padding 10px
    text-align left
    font-size 20px

    .goods-right
      float right

    i
      font-size 18px
</style>
