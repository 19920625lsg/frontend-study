import React, {Component} from 'react';
import {RecommendItem, RecommendWrapper} from "../style";
import * as actionCreators from "../store/actionCreators";
import connect from "react-redux/es/connect/connect";

class Recommend extends Component {
    render() {
        return (
            <RecommendWrapper>
                {
                    this.props.recommendList.map((item) => {
                        return (
                            <RecommendItem
                                key={item.get("id")}
                                imgUrl={item.get("imgUrl")}
                            />
                        )
                    })
                }
            </RecommendWrapper>
        );
    }

    componentDidMount() {
        // 网页加载完毕后加载热点列表
        this.props.getRecommendList();
    }
}


// 映射store中的state和组件中props里对应的值
const mapStateToProps = (state) => {
    // state和props的映射关系。数据边页面自动变，不需要再自己订阅啦~
    return {
        // 组件变量 : store中的变量.利用combineReducers加了一层home，所以需要多加一层home
        recommendList: state.get("home").get("recommendList")
    }
};

// 把store.dispatch方法挂载到props上(想要改变store中的内容，然后自动刷新到组件的props中)
const mapDispatchToProps = (dispatch) => {
    return {
        getRecommendList() {
            // 从ajax获取数据
            dispatch(actionCreators.getRecommendList());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Recommend);
