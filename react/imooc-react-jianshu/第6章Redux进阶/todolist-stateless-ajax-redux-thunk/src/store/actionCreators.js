import {ADD_TODO_ITEM, CHANGE_INPUT_VALUE, DELETE_TODO_ITEM, INIT_LIST} from "./actionTypes";
import axios from "axios";

export const getInputChangeAction = (value) => ({
    type: CHANGE_INPUT_VALUE,
    value
});

export const getBtnClickAction = () => ({
    type: ADD_TODO_ITEM
});

export const getItemClickAction = (index) => ({
    type: DELETE_TODO_ITEM,
    index
});

export const initListAction = (data) => ({
    type: INIT_LIST,
    data
});

export const getTodoList = () => {
    // 引入redux-thunk后，支持返回函数了
    return (dispatch) => {
        // 要想获取"/list.json"只需要把list.json放在public目录下即可
        axios.get('/list.json')
            .then((res) => {
                // 成功地话
                const data = res.data;
                const action = initListAction(data);
                dispatch(action);
            })
    }
};
