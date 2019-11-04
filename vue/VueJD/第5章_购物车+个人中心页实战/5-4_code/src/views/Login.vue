<template>
  <div>
    <img class="headerimg"
         src="http://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1904/rocketmq_banner.png" alt="">
    <cube-form
      :model="model"
      :schema="schema"
      @submit="submitHandler">
    </cube-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      model: {
        username: '',
        password: ''
      },
      schema: {
        fields: [
          {
            // 用户名配置
            type: 'input',
            modelKey: 'username',
            label: '用户名',
            props: {
              // 提示详细
              placeholder: '请输入用户名'
            },
            rules: {
              // 校验规则,参考文档https://didi.github.io/cube-ui/#/zh-CN/docs/validator#cube-%E8%A7%84%E5%88%99-anchor
              required: true,
              type: 'string',
              min: 3,
              max: 15
            },
            trigger: 'blur',
            messages: {
              required: '用户名不能为空！',
              min: '用户名不能少于3个字符',
              max: '用户名不能大于15个字符'
            }
          },
          {
            // 密码配置
            type: 'input',
            modelKey: 'password',
            label: '密码',
            props: {
              // 提示详细
              placeholder: '请输入密码',
              type: 'password',
              eye: {
                open: false // 默认查看密码的小眼睛关闭
              }
            },
            rules: {
              // 校验规则,参考文档https://didi.github.io/cube-ui/#/zh-CN/docs/validator#cube-%E8%A7%84%E5%88%99-anchor
              required: true
            },
            trigger: 'blur'
          },
          {
            // 提交按钮
            type: 'submit',
            label: '登录'
          }
        ]
      }
    }
  },
  methods: {
    // async...await是es7中的语法，可以把异步方法进行同步调用,这样写更符合传统编程的调用思维
    async submitHandler (e) {
      e.preventDefault() // 阻止默认事件，防止页面刷新
      try {
        const data = await this.$axios.get('/api/login', { params: this.model }) // 经过拦截器拦截已经直接拿到data了
        if (data.errno === 0) {
          // 登录成功,就存储token
          this.$store.commit('setToken', data.token)
          // 判断登录时是否携带了登陆后要重定向的地址，有的话就在登陆后跳转过去，没有地话就按照原计划跳转到首页
          if (this.$route.query.redirect) {
            // 请求url携带重定向地址，那么就跳转到重定向地址
            this.$router.replace({ path: this.$route.query.redirect })
          } else {
            // 登陆成功且请求不携带重定向参数，那么就跳转到首页,把'/'改成'/bottomNav/home'
            this.$router.replace({ path: '/bottomNav/home' })
          }
        } else {
          // 登录失败
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .headerimg
    height: 150px
    width: 100%
</style>
