import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

class Write extends Component {
    render() {
        if (this.props.loginState) {
            return (
                <div>
                    写文章
                </div>
            );
        } else {
            return <Redirect to='/login'/>
        }

    }
}

// 映射store中的state和组件中props里对应的值
const mapStateToProps = (state) => {
    // state和props的映射关系。数据边页面自动变，不需要再自己订阅啦~
    return {
        // 获取header中设置的登录状态标志位
        loginState: state.get('login').get('login')
    }
};

// 把store.dispatch方法挂载到props上(想要改变store中的内容，然后自动刷新到组件的props中)
const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Write);
