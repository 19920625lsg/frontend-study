import * as constants from "./constants";
import axios from 'axios'
import {fromJS} from "immutable";


export const getSearchFocusAction = () => ({
    type: constants.SEARCH_FOCUS
});

export const getSearchBlurAction = () => ({
    type: constants.SEARCH_BLUR
});


// getListAction只是在getList函数中使用，所以不需要export
const getListAction = (data) => ({
    type: constants.GET_LIST,
    // 防止data是普通数据而不是immutable地，先用fromJS改一下
    data: fromJS(data)
});

// 用了redux-thunk可以直接返回一个函数
export const getList = () => {
    return (dispatch) => {
        axios.get('/api/headerList.json').then((res) => {
            const data = res.data;
            dispatch(getListAction(data.data));
        }).catch((err) => {
            console.log(err.message);
        })
    }
};

