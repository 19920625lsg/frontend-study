// store 相当于图书管理员
import {createStore, applyMiddleware, compose} from 'redux'
// 引入笔记本
import reducer from "./reducer";
import createSagaMiddleware from 'redux-saga';
// 引入自定义的saga
import mySaga from './sagas'
// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// manage to use redux-devtools and saga at the same time
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
const store = createStore(reducer, enhancer);

// run the saga after creating store. it's sagaMiddleware rather than applyMiddleware
sagaMiddleware.run(mySaga);

export default store;
