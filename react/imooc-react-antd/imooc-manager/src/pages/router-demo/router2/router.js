import React, {Component} from 'react'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import Topic from "../router1/Topic";
import About from "../router1/About";
import Main from "../router1/Main";
import Home from "./Home";

class IRouter extends Component {
    render() {
        return (
            <Router>
                <Home>
                    {/*下面会允许加载多个路由，4.0新增的，需要加exact属性为true来精确匹配*/}
                    <Route exact={true} path='/' component={Main}/>
                    <Route path='/about' component={About}/>
                    <Route path='/topic' component={Topic}/>
                </Home>
            </Router>
        );
    }
}

export default IRouter;
