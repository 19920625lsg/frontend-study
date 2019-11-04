import React, {Component} from 'react';
import {Content, DetailWrapper, Header} from "./style";
import {connect} from "react-redux";
import {actionCreators} from "./store";

class Detail extends Component {
    render() {
        return (
            <DetailWrapper>
                <Header>{this.props.title}</Header>
                {/*div内的内容要进行html渲染*/}
                <Content dangerouslySetInnerHTML={{__html: this.props.content}}/>
            </DetailWrapper>
        );
    }

    componentDidMount() {
        // 获取PathVariable中传递过来的id
        this.props.getDetail(this.props.match.params.id);
    }
}

// 映射store中的state和组件中props里对应的值
const mapStateToProps = (state) => {
    // state和props的映射关系。数据边页面自动变，不需要再自己订阅啦~
    return {
        // 组件变量 : store中的变量.利用combineReducers加了一层header，所以需要多加一层header
        title: state.get("detail").get("title"),
        content: state.get("detail").get("content")
    }
};

// 把store.dispatch方法挂载到props上(想要改变store中的内容，然后自动刷新到组件的props中)
const mapDispatchToProps = (dispatch) => {
    return {
        getDetail(id) {
            dispatch(actionCreators.getDetail(id));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
