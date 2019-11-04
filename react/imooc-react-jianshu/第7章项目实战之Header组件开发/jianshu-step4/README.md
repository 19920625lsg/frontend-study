# 简书项目的初始化

## styled-components

### 安装
```git
yarn add styled-components
```
### 使用

+ 创建style.js,然后写入如下内容
    ```javascript
    import { createGlobalStyle } from 'styled-components'
    
    export const GlobalStyle = createGlobalStyle`　
    body{
    　　margin: 0;
    　　padding: 0
    　}`
    ```
+ 在项目主文件App.js中引入GlobalStyle
    ```javascript
    import { Globalstyle } from './style'
    ```
+ 在组件的render函数中用使用组件的方式使用GlobalStyle
    ```javascript
    render() {
        return (
            <div>
                <GlobalStyle/>
                最简单的react案例，可用来当所有react项目的基础模板
            </div>
        );
    }
    ```
    
## 添加reset.css来兼容默认标签在不同浏览器下的表现
> 把 https://meyerweb.com/eric/tools/css/reset/ 网址中的内容添加到style.js中的GlobalStyle中

## 基于react-transition-group完成了搜素框的设计

> https://github.com/reactjs/react-transition-group

## 完成了数据提取到state中，封装成Reducer

## 完成了reducer按照组件拆分，利用combineReducers拆分

## 看到了 《7-8 actionCreators 与 constants 的拆分》 

## 7-9 immutable.js来管理store中的数据
> http://facebook.github.io/immutable-js/
+ 1、immutable库提供一个fromJS方法，可以把一个JS对象转换为immutable（不可变）对象；
+ 2、使用immutable.js之后，不能用“.”访问store中的对象，要使用get()方法；
+ 3、使用immutable.js之后，修改store中的数据时，要使用set方法；
+ 4、immutable对象的set方法，会结合之前immutable对象的值和设置的值，返回一个全新的对象，并没有改变原始的state；

## 7-10 使用 redux-immutable 统一数据格式
> https://github.com/gajus/redux-immutable
+ 1 `yarn add redux-immutable` 
+ 2.把 外层store／index.js 中的 commbineReducer 引入的库从redux 改成 redux-immutable；
