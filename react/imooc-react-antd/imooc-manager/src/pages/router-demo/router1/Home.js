import React, {Component} from 'react'
import {HashRouter, Route, Link} from 'react-router-dom'
import Main from "./Main";
import About from "./About";
import Topic from "./Topic";

class Home extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <ul>
                        <li><Link to="/">主页面</Link></li>
                        <li><Link to="/about">关于页面</Link></li>
                        <li><Link to="/topic">话题页面</Link></li>
                    </ul>
                    <hr/>
                    {/*下面会允许加载多个路由，4.0新增的，需要加exact属性为true来精确匹配*/}
                    <Route exact={true} path='/' component={Main}/>
                    <Route path='/about' component={About}/>
                    <Route path='/topic' component={Topic}/>
                </div>
            </HashRouter>
        );
    }
}

export default Home;
