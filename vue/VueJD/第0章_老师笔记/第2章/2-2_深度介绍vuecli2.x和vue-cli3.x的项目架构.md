### 第二章第二节：深度介绍vuecli2.x和vue-cli3.x的项目架构

#### vuecli3.x:

​	去掉了`2.x` `build`和`config`等目录 ,大部分配置 都集成到`vue.config.js`这里了

​	vue.config.js里大概包括了配置 常用的输出路径名、跟目录、预处理、devServer配置、pwa、dll、第三方插件等等	

​	具体配置可参考(https://www.cnblogs.com/zjhr/p/9472648.html)

​	因为绝大部分的配置和扩展尤大大已经做好了封装的了，我们常用的开发基本可以满足，不满足的我们自己可以自行去扩展

​	webpack的配置在这个属性里修改configureWebpack（Mock也是在这里面的）
