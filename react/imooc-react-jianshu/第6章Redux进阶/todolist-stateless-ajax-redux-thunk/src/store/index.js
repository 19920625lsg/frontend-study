// store 相当于图书管理员
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
// 引入笔记本
import reducer from "./reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhancers(
    applyMiddleware(thunk)
);
const store = createStore(reducer, enhancer);

// 原来只用一个中间件的方法
// const store = createStore(
//     修改store数据第4步：store接收reducer传过来的新state，更新原来的state，完成store的更新
//     reducer,
//     启用chrome里的redux调试工具
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

export default store;
