# 2-1_对比vue-cli2.x和vue-cli3.0的搭建

> 搭建前提条件：

+ 1.node环境
  + node是傻瓜式安装的，直接去官网下载安装不断下一步
  + 命令行输入node -v查询版本号，有版本号即安装成功
  + node自带npm包管理工具（安装好node也可以输入npm -v查看版本号）
  + npm太慢，下载国内淘宝镜像cnpm(npm install -g cnpm --registry=https://registry.npm.taobao.org)

+ 2.安装webpack
  + 运行npm install webpack -g

+ 3.安装vue-cli  2.x
  + `npm install vue-cli -g`  
  + 创建项目：`vue init webpack 项目名`(不要取中文名字)

+ 4.安装vue-cli  3.x
  + npm install @vue/cli -g
  + 创建项目：vue create  项目名（不要取中文名字）

+ 5.注意事项
  + 不添加指定版本号就是下载最新稳定版本
  + 安装3.x时可能需要先卸载已经安装的2.x，具体可见教程[vue-cli3安装](../../VueSell/第2章_项目准备工作/README.md#安装)
  + 使用3.x创建Vue项目可以选择命令行或者Vue UI两方式，可以见教程[vue-cli3.x创建项目的两种方式](../../VueSell/第2章_项目准备工作/README.md#创建项目)
