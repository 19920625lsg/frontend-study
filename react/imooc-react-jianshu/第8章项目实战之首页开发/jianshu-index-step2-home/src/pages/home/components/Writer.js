import React, {Component} from 'react';
import {WriterInfo, WriterItem, WriterWrapper} from "../style";
import * as actionCreators from "../store/actionCreators";
import connect from "react-redux/es/connect/connect";

class Writer extends Component {
    render() {
        return (
            <WriterWrapper>
                {
                    this.props.writerList.map((item) => {
                        return (
                            <WriterItem key={item.get("id")}>
                                <img
                                    className="writerItemPic"
                                    src={item.get("imgUrl")}
                                    alt=""
                                />
                                <WriterInfo>
                                    <h3 className='title'>{item.get("title")}</h3>
                                    <p className='desc'>{item.get("desc")}</p>
                                </WriterInfo>
                            </WriterItem>
                        )
                    })
                }
            </WriterWrapper>
        );
    }
    componentDidMount() {
        // 网页加载完毕后加载热点列表
        this.props.getWriterList();
    }
}


// 映射store中的state和组件中props里对应的值
const mapStateToProps = (state) => {
    // state和props的映射关系。数据边页面自动变，不需要再自己订阅啦~
    return {
        // 组件变量 : store中的变量.利用combineReducers加了一层home，所以需要多加一层home
        writerList: state.get("home").get("writerList")
    }
};

// 把store.dispatch方法挂载到props上(想要改变store中的内容，然后自动刷新到组件的props中)
const mapDispatchToProps = (dispatch) => {
    return {
        getWriterList() {
            // 从ajax获取数据
            dispatch(actionCreators.getWriterList());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Writer);
