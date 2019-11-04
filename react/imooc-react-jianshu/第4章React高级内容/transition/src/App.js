import React, {Component, Fragment} from 'react';
// 自定义的CSS动画
import './App.css'
// 第三方动画组件库
import "animate.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true,
            fadeName: 'animated bounceInLeft'
        };
        // 方法绑定当前对象，提高性能、简化写法
        this.handleToggle = this.handleToggle.bind(this);
    }

    render() {
        return (
            <Fragment>
                {/*1. 自己实现的CSS动画效果*/}
                <div className={this.state.show ? 'Show' : 'Hide'}>hello</div>
                <button onClick={this.handleToggle}>toggle</button>

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
            </Fragment>
        );
    }

    // 取反动画
    handleToggle() {
        this.setState({
            show: !this.state.show,
            fadeName:'animated bounceInRight'
        });
    }
}

export default App;
