import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Input, LoginBox, LoginWrapper} from "./style";
import {actionCreators} from "./store";
import {Redirect} from "react-router-dom";

class Login extends Component {
    render() {
        if (!this.props.loginState) {
            // 没登录就还停留在登录界面
            return (
                <LoginWrapper>
                    <LoginBox>
                        <Input placeholder="账号"
                               ref={(input) => {
                                   this.account = input
                               }}
                        />
                        <Input placeholder="密码" type='password'
                               ref={(input) => {
                                   this.password = input
                               }}
                        />
                        <Button onClick={() => this.props.login(this.account, this.password)}>登录</Button>
                    </LoginBox>
                </LoginWrapper>
            );
        } else {
            // 登录成功跳转到首页
            return <Redirect to='/'/>
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
    return {
        login(accountElem, passwordElem) {
            // 两个入参都是dom
            dispatch(actionCreators.login(accountElem.value, passwordElem.value));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
