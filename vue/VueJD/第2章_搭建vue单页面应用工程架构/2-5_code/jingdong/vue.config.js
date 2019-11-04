module.exports = {
  configureWebpack: {
    devServer: {
      port: 9527, // 项目运行端口
      open: true // 项目用npm run serve命令跑起来后自动打开浏览器
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
