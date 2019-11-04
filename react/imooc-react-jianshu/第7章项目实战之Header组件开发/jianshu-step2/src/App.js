import React, {Component} from 'react';
import {GlobalStyle} from "./style";
import Header from "./common/header";
import {IconFont} from "./static/iconfont";
import {Provider} from "react-redux";
import store from "./store";

class App extends Component {
    render() {
        return (
            <div>
                {/*全局css样式配置，用地reset.css+styled-components*/}
                <GlobalStyle/>
                {/*全局图标，从iconfont.cn上下载然后添加了index.js*/}
                <IconFont/>
                {/*Provider用于结合store管理所有的状态数据*/}
                <Provider store={store}>
                    <Header/>
                </Provider>
            </div>
        );
    }
}

export default App;
