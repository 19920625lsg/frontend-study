/**
* Created By liang shan guang on 2017/10/20 14:56
*/
<template>
  <!--一个组件一定要有且只有一个根div元素-->
  <div class="detail">
    <!--学会传参的方式-->
    <h2>{{msg}}</h2>
    <h4>ID: {{$route.params.id}}  Detail:{{$route.params.detail}}</h4>
    <h4></h4>
    <mt-checklist
      title="维修的情况"
      :value.sync="method"
      :options="['更换二维码', '更换轮胎', '更换其他配件']">
    </mt-checklist>

    <mt-button type="primary" @click="repairDone" size="large">维修</mt-button>
    <mt-button type="default" @click="back" size="large">返回</mt-button>
  </div>
</template>

<script>
  export default {
    name: 'Detail',
    data() {
      return {
        msg: '车辆详细信息',
        method: [] //必须是数组类型才能进行绑定
      }
    },
    methods: {
      //这个是es6的新写法,es5的时候还是   repairDone:function(){}
      repairDone() {
//        注释中的接口已经不能用了
//        let id = this.$route.params.id;
//        let method = this.method;
//        fetch(`/api/reapir?id=${id}&method=${this.method}`).then((res) => {
//          return res.json();
//        }).then((json) => {
//          console.log(json);
//          if (json.message) {
//            alert(json.message);
//          }
//        });
        alert("已经修好啦!可以正常使用啦!!");
        console.log("修好啦");
      },
      back() {
        console.log("返回主页啦");
        this.$router.push({path: "/"});
      }
    }
  }
</script>

<!-- CSS样式写在这里,务必记得加scoped -->
<style scoped>
  h2 {
    color: blueviolet;
  }

  h4{
    color: aqua;
  }


  .mint-button--larg {
    width: 90%;
    margin: 10px auto 0 auto;
  }

  .mint-checklist {
    text-align: left;
  }

  .detail{
    background: url("../assets/home.jpg") no-repeat left center;
  }
</style>
