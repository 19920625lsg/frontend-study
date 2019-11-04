<template>
  <div class="componentsB">
    <P class="title">组件B</P>
    <P class="titleName">餐馆名称：{{this.$store.state.resturantName}}</P>
    <div>
      <!-- 点击修改 为 B 餐馆 -->
      <button class="btn" @click="modifyBName('B餐馆')">修改为B餐馆</button>
    </div>
    <div class="marTop">
      <button class="btn" @click="trunToA">跳转到A页面</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'B',
  data () {
    return {}
  },
  methods: {
    modifyBName (name) {
      this.$store.commit('modifyBName', name)
    },
    trunToA () {
      this.$router.push({ path: '/componentA' }) // 路由跳转到A
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title, .titleName {
    color: red;
    font-size: 20px;
  }

  .btn {
    width: 160px;
    height: 40px;
    background-color: red;
    border: none;
    outline: none;
    color: #ffffff;
    border-radius: 4px;
  }

  .marTop {
    margin-top: 20px;
  }
</style>
