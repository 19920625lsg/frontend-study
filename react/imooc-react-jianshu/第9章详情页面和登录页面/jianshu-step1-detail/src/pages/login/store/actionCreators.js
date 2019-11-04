import * as constants from "./constants";
import axios from 'axios'
import {fromJS} from "immutable";


// getLoginAction只是在login函数中使用，所以不需要export
const changeLoginAction = (result) => ({
    type: constants.CHANGE_LOGIN,
    // 防止变量是普通数据而不是immutable地，先用fromJS改一下
    result: fromJS(result),
});

// getLoginAction只是在login函数中使用，所以不需要export
export const logout = () => ({
    type: constants.LOGOUT,
    // 防止变量是普通数据而不是immutable地，先用fromJS改一下
    value: false
});

// 用了redux-thunk可以直接返回一个函数
export const login = (account, password) => {
    return (dispatch) => {
        axios.get('/api/login.json?account=' + account + '&password=' + password).then((res) => {
            const result = res.data.data;
            dispatch(changeLoginAction(result));
        }).catch((err) => {
            console.log(err.message);
        })
    }
};



