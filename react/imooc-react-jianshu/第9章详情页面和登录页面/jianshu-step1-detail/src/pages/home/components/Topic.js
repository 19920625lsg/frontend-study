import React, {Component} from 'react';
import {TopicItem, TopicWrapper} from "../style";
import {connect} from "react-redux";
import {actionCreators} from "../store";

class Topic extends Component {
    render() {
        return (
            <TopicWrapper>
                {
                    this.props.topicList.map((item) => {
                        return (
                            <TopicItem key={item.get("id")}>
                                <img
                                    className="topicPic"
                                    src={item.get("imgUrl")}
                                    alt=""
                                />
                                {item.get("title")}
                            </TopicItem>
                        )
                    })
                }
            </TopicWrapper>
        );
    }

    componentDidMount() {
        // 网页加载完毕后加载热点列表
        this.props.getTopicList();
    }
}


// 映射store中的state和组件中props里对应的值
const mapStateToProps = (state) => {
    // state和props的映射关系。数据边页面自动变，不需要再自己订阅啦~
    return {
        // 组件变量 : store中的变量.利用combineReducers加了一层home，所以需要多加一层home
        topicList: state.get("home").get("topicList")
    }
};

// 把store.dispatch方法挂载到props上(想要改变store中的内容，然后自动刷新到组件的props中)
const mapDispatchToProps = (dispatch) => {
    return {
        getTopicList() {
            // 从ajax获取数据
            dispatch(actionCreators.getTopicList());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Topic);
