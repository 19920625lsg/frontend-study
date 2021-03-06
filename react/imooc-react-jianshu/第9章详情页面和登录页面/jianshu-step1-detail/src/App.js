import React, {Component} from 'react';
import {GlobalStyle} from "./style";
import Header from "./common/header";
import {IconFont} from "./static/iconfont";
import {Provider} from "react-redux";
// BrowserHistory被BrowserRouter替代，react-router v4修改地
import {BrowserRouter, Route} from 'react-router-dom'
import store from "./store";
import Detail from "./pages/detail";
import Home from "./pages/home";
import Login from './pages/login';
import Write from './pages/write';

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
                    {/*Provider下只能有一个div*/}
                    <BrowserRouter>
                        {/*Router下只能有一个div*/}
                        <div>
                            <Header/>
                            {/*精准匹配url可以防止访问到多个url*/}
                            <Route path='/' exact component={Home}/>
                            {/*:id类似PathVariable*/}
                            <Route path='/detail/:id' exact component={Detail}/>
                            <Route path='/login' exact component={Login}/>
                            <Route path='/write' exact component={Write}/>
                        </div>
                    </BrowserRouter>
                </Provider>
            </div>
        );
    }
}

export default App;
