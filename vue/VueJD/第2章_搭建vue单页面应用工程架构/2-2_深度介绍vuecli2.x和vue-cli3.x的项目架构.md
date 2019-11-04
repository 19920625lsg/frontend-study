# 2-2_深度介绍vuecli2.x和vue-cli3.x的项目架构

> vuecli3.x的改变

+ 去掉了`2.x` `build`和`config`等目录 ,大部分配置 都集成到`vue.config.js`这里了
+ vue.config.js里大概包括了配置 常用的输出路径名、跟目录、预处理、devServer配置、pwa、dll、第三方插件等等,具体配置可参考
  + [vue-cli3.0配置详解](https://www.cnblogs.com/zjhr/p/9472648.html)
  + [如何配置 vue-cli 3.0 的 vue.config.js](https://segmentfault.com/a/1190000016101954),
  + 更多选项可以参考 [vue.config.js的所有可配置选项及例子和注释](../../VueSell/第2章_项目准备工作/vue.config.all.js)
+ 因为绝大部分的配置和扩展尤大大已经做好了封装的了，我们常用的开发基本可以满足，不满足的我们自己可以自行去扩展
+ webpack的配置在这个属性里修改configureWebpack(Mock也是在这里面的)
