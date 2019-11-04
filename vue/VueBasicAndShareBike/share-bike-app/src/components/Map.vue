/**
* Created By liang shan guang on 2017/10/20 15:27
*/
<template>
  <div class="map" id="container">

  </div>
</template>

<script>
  import bikeLogo from '../assets/bike.jpg'

  export default {
    name: 'Map',
    data() {
      return {
        msg: '百度地图组件'
      }
    },
    methods: {
      addMarker: function (map, point, data) {  // 创建图标对象
        var myIcon = new BMap.Icon(bikeLogo, new BMap.Size(23, 25), {
          anchor: new BMap.Size(10, 25),
        });
        var self = this;
        var marker = new BMap.Marker(point, {icon: myIcon});
        map.addOverlay(marker);
        marker.addEventListener("click", function () {
          // 这里的data会自动解析到id和detail里面的,尽管里路由中配置即可
          self.$router.push({name: "Detail", params: data})
        })
      }
    },
    //等组件都加载完了再进行地图加载,即mounted生命周期
    mounted() {
      // 百度地图API功能
      var map = new BMap.Map("container");          // 创建地图实例
      var point = new BMap.Point(116.404, 39.915);  // 创建点坐标

      // 定位
      var self = this;
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          // alert('您的位置：'+r.point.lng+','+r.point.lat);
          point = new BMap.Point(r.point.lng, r.point.lat);
        }
        else {
          alert('failed' + this.getStatus());
        }
        // 初始化地图，设置中心点坐标和地图级别
        map.centerAndZoom(point, 14);

        // 取得数据
        console.log(r.point);
        fetch(`/api/broken-bikes?lat=${r.point.lat}&lng=${r.point.lng}`)
          .then((res) => {
            console.log(res);
            return res.json();
          }).then((json) => {
          for (let i = 0; i < json.length; i++) {
            let point = new BMap.Point(json[i].lng, json[i].lat);
            self.addMarker(map, point, json[i]);
          }
        })
      }, {enableHighAccuracy: true})
    }
  }
</script>

<!-- CSS样式写在这里,务必记得加scoped -->
<style scoped>
  #container {
    height: 500px;
  }

</style>
