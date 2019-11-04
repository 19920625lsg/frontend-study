import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Home extends Component {
    render() {
        return (
            <div>
                <h2>路径单独拿出来</h2>
                <ul>
                    <li><Link to="/">主页面</Link></li>
                    <li><Link to="/about">关于页面</Link></li>
                    <li><Link to="/topic">话题页面</Link></li>
                </ul>
                <hr/>
                {this.props.children}
            </div>
        );
    }
}

export default Home;
