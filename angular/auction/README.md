# Auction

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# ng set --global packageManager=cnpm
设置angular-cli的包管理工具为cnpm，非常有用的命令哦！！！

# 目录结构分析
## e2e: 端到端测试
## src: 组件开发后的存放
## assets: 资源文件存放
## environments: 执行环境
## angular-cli.json: cli的配置，后面会经常改，从而方便自己定制功能
## polyfills.ts: 兼容老浏览器的时候需要再main.ts中引入 
> import './polyfills.ts'


