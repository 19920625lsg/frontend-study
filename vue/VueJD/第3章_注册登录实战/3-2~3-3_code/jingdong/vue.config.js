/**
 * 每次更改这个配置文件后都需要重启应用
 */

const appData = require('./data') // 获取json数据
const userPool = appData.login_data.user_pool // 用户池

module.exports = {
  configureWebpack: {
    devServer: {
      port: 9537, // 项目运行端口
      open: true, // 项目用npm run serve命令跑起来后自动打开浏览器
      before: app => {
        // 查看当前的所有用户
        app.get('/api/users', function (req, res) {
          // 返回当前的用户池
          return res.json({
            errno: 0,
            data: userPool
          })
        })
        // 用户注册接口
        app.get('/api/register', function (req, res) {
          const { username, password } = req.query // 从请求体中解析用户名和密码
          const userLength = userPool.filter(v => v.username === username).length // 过滤筛选，返回找到了几个这个用户名的用户
          if (userLength > 0) {
            res.json({
              errno: false,
              message: '用户名已经存在!'
            })
          } else {
            // 用户不存在，就把用户加到内存池中
            res.join({
              success: true,
              message: '注册成功'
            })
          }
        })
        // app.get('/api/ratings', function (req, res) {
        //   res.json({
        //     errno: 0,
        //     data: ratings
        //   })
        // })
      }
    }
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}
