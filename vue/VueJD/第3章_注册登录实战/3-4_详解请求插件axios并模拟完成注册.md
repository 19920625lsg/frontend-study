# 3-4详解请求插件axios并模拟完成注册

## 安装axios

```shell
npm install axios
```

## 配置axios

在main.js中加入如下内容

```javascript
......
import axios from 'axios'
......
Vue.prototype.$axios = axios
```

## 在组件中使用axios

```javascript
methods: {
    submitHandler (e) {
      e.preventDefault() // 阻止默认事件，防止页面刷新
      this.$axios.get('/api/register', { params: this.model })
        .then(res => {
          console.log('注册成功')
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
```

## 详情见如下commit

[本节commit记录](https://github.com/19920625lsg/VueStudy/commit/8feb5a8d17b8c566aac9141b38574f5424af1166)