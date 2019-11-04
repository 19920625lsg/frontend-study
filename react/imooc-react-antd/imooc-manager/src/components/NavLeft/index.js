import React, {Component} from 'react'
import {Menu} from 'antd'
import './index.less'
import MenuConfig from '../../config/menuConfig.js'
import {NavLink} from "react-router-dom";

const SubMenu = Menu.SubMenu;

class NavLeft extends Component {
    /**
     * react自带地生命周期函数，不能用es6写法
     */
    componentWillMount() {
        const menuTreeNode = this.renderMenu(MenuConfig);
        this.setState({
            menuTreeNode
        });
    }

    /**
     * 递归渲染菜单函数，es6写法
     */
    renderMenu = (data) => {
        return data.map((item) => {
            if (item.children) {
                // 有子节点的话就不断递归调用
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key}>
                {/*key和title见MenuConfig.js*/}
                <NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item>
        });
    };

    render() {
        return (
            <div>
                <div className='logo'>
                    {/*默认服务器路径是在public下*/}
                    <img src="/assets/logo-ant.svg" alt=""/>
                    <h1>CID Work</h1>
                </div>
                <Menu theme='dark'>
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        );
    }
}

export default NavLeft;
