# React中的动画

> 用的是animate.css这个第三方库

> [库主页](https://github.com/daneden/animate.css)

### 安装

```bash
yarn add animate.css
yarn add react-addons-css-transition-group
```

### 导入到组件

```javascript
import "animate.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
```

### 使用范例

```html
<ReactCSSTransitionGroup
    transitionEnter={true}
    transitionLeave={true}
    transitionEnterTimeout={2500}
    transitionLeaveTimeout={1500}
    transitionName="animated"
>
    {/*这里一定要加上key*/}
    {/*className是animate.css中的类名，显示不同动画,见https://github.com/daneden/animate.css*/}
    <div key="amache" className={this.state.fadeName} >
        <img src="https://gw.alipayobjects.com/zos/rmsportal/tXlLQhLvkEelMstLyHiN.svg" alt="" />
    </div>
</ReactCSSTransitionGroup>
```

### 更多的动画效果见下图

![animate.css全部的动画效果](animate.css-all-transitions.png)



