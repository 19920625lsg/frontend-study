<template>
  <div class="city">
    <CityHeader></CityHeader>
    <CitySearch></CitySearch>
    <CityList :hotCities="data.hotCities" :cities="data.cities"></CityList>
    <CityAlphabet :cities="data.cities"></CityAlphabet>
  </div>
</template>

<script>
  import CityHeader from './components/Header'
  import CitySearch from './components/Search'
  import CityList from './components/List'
  import CityAlphabet from './components/Alphabet'
  // 对于ajax的请求我们一般把它放在最外层的组件来，这样一来我们只需要一次请求就可以获取所有页面的内容
  import axios from 'axios'

  export default {
    name: 'City',
    components: {
      CityHeader,
      CitySearch,
      CityList,
      CityAlphabet
    },
    data () {
      return {
        // 存放的各个子组件的数据
        data: ''
      }
    },
    methods: {
      getCityData () {
        axios.get('/api/city.json')
          .then(this.getCityDataSuccess)
      },
      getCityDataSuccess (res) {
        let result = res.data
        if (result.ret && result.data) {
          this.data = result.data
        }
      }
    },
    mounted () {
      this.getCityData()
    }
  }
</script>

<style lang="stylus" scoped>

</style>
