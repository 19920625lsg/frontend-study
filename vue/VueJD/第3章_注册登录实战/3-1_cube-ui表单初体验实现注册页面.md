# cube-ui实现注册界面

## 参考文档

+ [Form表单](https://didi.github.io/cube-ui/#/zh-CN/docs/form#cube-Form-anchor)
+ [校验规则rules](https://didi.github.io/cube-ui/#/zh-CN/docs/validator#cube-%E8%A7%84%E5%88%99-anchor)

## 注意事项

+ 默认submit后页面会刷新，所以需要在`submitHandler(e)`事件中阻止冒泡`e.preventDefault()`
+ rules里面的校验规则很实用，要好好学习下

## 完整代码

```vue
<template>
  <div>
    <cube-form
      :model="model"
      :schema="schema"
      @submit="submitHandler">
    </cube-form>
  </div>
</template>

<script>
export default {
  name: 'Register',
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
            label: '注册'
          }
        ]
      }
    }
  },
  methods: {
    submitHandler (e) {
      e.preventDefault() // 阻止默认事件，防止页面刷新
      console.log('注册成功')
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
```
