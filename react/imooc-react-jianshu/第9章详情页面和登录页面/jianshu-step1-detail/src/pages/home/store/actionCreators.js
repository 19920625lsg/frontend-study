import * as constants from "./constants";
import axios from 'axios'
import {fromJS} from "immutable";

// getListAction只是在getList函数中使用，所以不需要export
const getTopicListAction = (data) => ({
    type: constants.GET_TOPIC_LIST,
    // 防止data是普通数据而不是immutable地，先用fromJS改一下
    data: fromJS(data)
});

// 用了redux-thunk可以直接返回一个函数
export const getTopicList = () => {
    return (dispatch) => {
        axios.get('/api/topicList.json').then((res) => {
            const data = res.data;
            dispatch(getTopicListAction(data));
        }).catch((err) => {
            console.log(err.message);
        })
    }
};


// getArticleListAction只是在getList函数中使用，所以不需要export
const getArticleListAction = (data) => ({
    type: constants.GET_ARTICLE_LIST,
    // 防止data是普通数据而不是immutable地，先用fromJS改一下
    data: fromJS(data)
});

// 用了redux-thunk可以直接返回一个函数
export const getArticleList = () => {
    return (dispatch) => {
        axios.get('/api/articleList.json').then((res) => {
            const data = res.data;
            dispatch(getArticleListAction(data));
        }).catch((err) => {
            console.log(err.message);
        })
    }
};

// getRecommendListAction只是在getList函数中使用，所以不需要export
const getRecommendListAction = (data) => ({
    type: constants.GET_RECOMMEND_LIST,
    // 防止data是普通数据而不是immutable地，先用fromJS改一下
    data: fromJS(data)
});

// 用了redux-thunk可以直接返回一个函数
export const getRecommendList = () => {
    return (dispatch) => {
        axios.get('/api/recommendList.json').then((res) => {
            const data = res.data;
            dispatch(getRecommendListAction(data));
        }).catch((err) => {
            console.log(err.message);
        })
    }
};

// getWriterListAction只是在getList函数中使用，所以不需要export
const getWriterListAction = (data) => ({
    type: constants.GET_WRITER_LIST,
    // 防止data是普通数据而不是immutable地，先用fromJS改一下
    data: fromJS(data)
});

// 用了redux-thunk可以直接返回一个函数
export const getWriterList = () => {
    return (dispatch) => {
        axios.get('/api/writerList.json').then((res) => {
            const data = res.data;
            dispatch(getWriterListAction(data));
        }).catch((err) => {
            console.log(err.message);
        })
    }
};

export const toggleBackTop = (show) => ({
    type: constants.TOGGLE_BACKTOP,
    show
});

