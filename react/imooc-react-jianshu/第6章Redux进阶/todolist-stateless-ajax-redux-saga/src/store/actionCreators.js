import {ADD_TODO_ITEM, CHANGE_INPUT_VALUE, DELETE_TODO_ITEM, GET_INIT_LIST, INIT_LIST} from "./actionTypes";

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

export const getInitListAction = () => ({
    type: GET_INIT_LIST
});
