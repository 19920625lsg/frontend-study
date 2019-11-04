import React, {Component} from 'react';
import {Addition, Button, HeaderWrapper, Logo, Nav, NavItem, NavSearch, SearchWrapper} from "./style";
import {CSSTransition} from 'react-transition-group'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false
        };
        this.handleInputFocus = this.handleInputFocus.bind(this);
        this.handleInputBlur = this.handleInputBlur.bind(this);
    }

    render() {
        return (
            <HeaderWrapper>
                <Logo/>
                <Nav>
                    <NavItem className='left active'>首页</NavItem>
                    <NavItem className='left'>下载</NavItem>
                    <SearchWrapper>
                        <CSSTransition timeout={200} in={this.state.focused} classNames="slide">
                            <NavSearch className={this.state.focused ? "focused" : ""}
                                       onFocus={this.handleInputFocus}
                                       onBlur={this.handleInputBlur}
                            />
                        </CSSTransition>
                        <span className={this.state.focused ? 'focused iconfont' : 'iconfont'}>&#xe653;</span>
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

    handleInputFocus() {
        this.setState({
            focused: true
        });
    }

    handleInputBlur(){
        this.setState({
            focused: false
        });
    }
}

export default Header;
