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
