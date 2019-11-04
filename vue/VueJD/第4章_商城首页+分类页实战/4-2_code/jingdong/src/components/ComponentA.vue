<template>
  <div class="componentsA">
    <P class="title">组件A</P>
    <P class="titleName">餐馆名称：{{this.$store.state.resturantName}}</P>
    <div>
      <!-- 点击修改 为 A 餐馆 -->
      <button class="btn" @click="modifyAName('A餐馆')">修改为A餐馆</button>
    </div>
    <div class="marTop">
      <button class="btn" @click="trunToB">跳转到B页面</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'A',
  data () {
    return {}
  },
  methods: {
    modifyAName (name) {
      this.$store.commit('modifyAName', name)
    },
    trunToB () {
      this.$router.push({ path: '/componentB' }) // 路由跳转到B
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title, .titleName {
    color: blue;
    font-size: 20px;
  }

  .btn {
    width: 160px;
    height: 40px;
    background-color: blue;
    border: none;
    outline: none;
    color: #ffffff;
    border-radius: 4px;
  }

  .marTop {
    margin-top: 20px;
  }
</style>
