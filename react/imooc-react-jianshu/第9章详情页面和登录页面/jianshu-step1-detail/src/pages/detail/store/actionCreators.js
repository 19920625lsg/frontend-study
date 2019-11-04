import * as constants from "./constants";
import axios from 'axios'
import {fromJS} from "immutable";

// getDetailAction只是在getList函数中使用，所以不需要export
const getDetailAction = (title, content) => ({
    type: constants.GET_DETAIL,
    // 防止变量是普通数据而不是immutable地，先用fromJS改一下
    title: fromJS(title),
    content: fromJS(content)
});

// 用了redux-thunk可以直接返回一个函数
export const getDetail = (id) => {
    return (dispatch) => {
        axios.get('/api/detail.json?id=' + id).then((res) => {
            const result = res.data.data;
            dispatch(getDetailAction(result.title, result.content));
        }).catch((err) => {
            console.log(err.message);
        })
    }
};

