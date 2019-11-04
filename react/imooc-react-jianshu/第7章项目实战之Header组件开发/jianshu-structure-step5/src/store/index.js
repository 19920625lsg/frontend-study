// store 相当于图书管理员
import {createStore} from 'redux'
// 引入笔记本
import reducer from "./reducer";

const store = createStore(
    // 修改store数据第4步：store接收reducer传过来的新state，更新原来的state，完成store的更新
    reducer,
    // 启用chrome里的redux调试工具
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
