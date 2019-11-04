// store 相当于图书管理员
import {applyMiddleware, compose, createStore} from 'redux'
// 引入笔记本
import reducer from "./reducer";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhancers(
    applyMiddleware(thunk)
);
const store = createStore(reducer, enhancer);

export default store;
