<template>
  <ul class="list">
    <li class="item" v-for="(item, key) in cities" :key="key" @click="handleLetterClick">{{key}}</li>
  </ul>
</template>

<script>
  export default {
    name: 'Alphabet',
    props: {
      cities: Object
    },
    methods: {
      /**
       * 字母点击自动跳转到对应的城市列表
       * @param e dom元素
       */
      handleLetterClick (e) {
        // 向父组件触发change事件(父组件响应事件，并把传过来的innerText转发给其他子组件)
        this.$emit('change', e.target.innerText)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../../assets/styles/variables.styl"
  .list
    display flex
    flex-direction column
    justify-content center
    right 0
    top: 79px
    bottom 0
    width: 20px
    position absolute

    .item
      line-height 20px
      text-align center
      color $bgColor
</style>
