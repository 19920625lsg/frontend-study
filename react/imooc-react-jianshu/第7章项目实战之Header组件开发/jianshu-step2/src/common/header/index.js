import React, {Component} from 'react';
import {Addition, Button, HeaderWrapper, Logo, Nav, NavItem, NavSearch, SearchWrapper} from "./style";
import {CSSTransition} from 'react-transition-group'
import {connect} from "react-redux";
import {getSearchBlurAction, getSearchFocusAction} from "../../store/actionCreators";

class Header extends Component {
    render() {
        return (
            <HeaderWrapper>
                <Logo/>
                <Nav>
                    <NavItem className='left active'>首页</NavItem>
                    <NavItem className='left'>下载</NavItem>
                    <SearchWrapper>
                        <CSSTransition timeout={200} in={this.props.focused} classNames="slide">
                            <NavSearch className={this.props.focused ? "focused" : ""}
                                       onFocus={this.props.handleInputFocus}
                                       onBlur={this.props.handleInputBlur}
                            />
                        </CSSTransition>
                        <span className={this.props.focused ? 'focused iconfont' : 'iconfont'}>&#xe653;</span>
                    </SearchWrapper>
                    <NavItem className='right'>登录</NavItem>
                    <NavItem className='right'>
                        <span className="iconfont">&#xe636;</span>
                    </NavItem>
                </Nav>
                <Addition>
                    <Button className='writing'>
                        <span className="iconfont">&#xe60e;</span>
                        写文章
                    </Button>
                    <Button className='reg'>注册</Button>
                </Addition>
            </HeaderWrapper>
        );
    }

}

// 映射store中的state和组件中props里对应的值
const mapStateToProps = (state) => {
    // state和props的映射关系。数据边页面自动变，不需要再自己订阅啦~
    return {
        // 组件变量 : store中的变量
        focused: state.focused
    }
};

// 把store.dispatch方法挂载到props上(想要改变store中的内容，然后自动刷新到组件的props中)
const mapDispatchToProps = (dispatch) => {
    return {
        handleInputFocus() {
            const action = getSearchFocusAction();
            dispatch(action);
        },

        handleInputBlur() {
            const action = getSearchBlurAction();
            dispatch(action);
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
