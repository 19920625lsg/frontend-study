<template>
  <div class="home">
    <h1>Home Page</h1>
    当前城市：{{this.$store.state.city}}
  </div>
</template>

<script>
  export default {
    name: 'Home'
  }
</script>

<style scoped>
  h1 {
    color: brown;
  }
</style>
