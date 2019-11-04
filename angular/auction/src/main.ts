// 引入核心模块，关闭Angular的开发者模式
import {enableProdMode} from '@angular/core';
// 告诉Angular使用哪个模块来启动整个应用
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
// 导入模块配置，所有的组件会汇总进一个app.module中
import {AppModule} from './app/app.module';
// 导入环境配置，默认是生产环境
import {environment} from './environments/environment';
import {AppComponent} from './app/app.component';
// 如果当前是生产环境，就调用enableProdMode方法关闭开发者模式
if (environment.production) {
  enableProdMode();
}
// 传入AppModule作为启动模块来启动应用。这里是整个Angular启动的起点。从AppModule一层层往回找AppModule->bootstrap->AppComponent->selector->app-root
platformBrowserDynamic().bootstrapModule(AppModule);
