import React, {Component} from 'react';
import {BackTop, HomeLeft, HomeRight, HomeWrapper} from "./style";
import Topic from "./components/Topic";
import List from "./components/List";
import * as actionCreators from "./store/actionCreators";
import Recommend from "./components/Recommend";
import Writer from "./components/Writer";
import connect from "react-redux/es/connect/connect";

class Home extends Component {

    handleScrollTop() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <HomeWrapper>
                < HomeLeft>
                    <img className='banner-img'
                         src="https://upload.jianshu.io/admin_banners/web_images/4600/67db00190e013279ccac4b00bc5702c5f974b9aa.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"
                         alt=""/>
                    <Topic/>
                    <List/>
                </HomeLeft>
                < HomeRight>
                    <Recommend/>
                    <Writer/>
                </HomeRight>
                {
                    this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>回到顶部</BackTop> : null
                }
            </HomeWrapper>
        );
    }

    componentDidMount() {
        window.addEventListener("scroll", this.props.changeScrollTopShow)
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.props.changeScrollTopShow)
    }
}

// 映射store中的state和组件中props里对应的值
const mapStateToProps = (state) => {
    // state和props的映射关系。数据边页面自动变，不需要再自己订阅啦~
    return {
        // 组件变量 : store中的变量.利用combineReducers加了一层home，所以需要多加一层home
        showScroll: state.get("home").get("showScroll")
    }
};

// 把store.dispatch方法挂载到props上(想要改变store中的内容，然后自动刷新到组件的props中)
const mapDispatchToProps = (dispatch) => {
    return {
        changeScrollTopShow(e) {
            // 显示与隐藏"回到顶部"按钮
            if (document.documentElement.scrollTop > 200) {
                dispatch(actionCreators.toggleBackTop(true));
            } else {
                dispatch(actionCreators.toggleBackTop(false));
            }
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
