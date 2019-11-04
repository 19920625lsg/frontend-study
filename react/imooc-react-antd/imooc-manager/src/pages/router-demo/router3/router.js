import React, {Component} from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import Topic from "../router1/Topic";
import About from "../router1/About";
import Main from "../router1/Main";
import Home from "./Home";
import Info from "./Info";

class IRouter extends Component {
    render() {
        return (
            <Router>
                <Home>
                    {/*下面会允许加载多个路由，4.0新增的，需要加exact属性为true来精确匹配*/}
                    <Route exact={true} path='/' component={Main}/>
                    <Route path='/about' component={About}/>
                    <Route path='/topic' component={Topic}/>
                    <Route path='/info/:infoId' component={Info}/>
                </Home>
            </Router>
        );
    }
}

export default IRouter;
