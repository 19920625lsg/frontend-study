// 使用redux-saga后再sagas.js中也可以接收和处理action了
import {takeEvery, put} from 'redux-saga/effects'
import {GET_INIT_LIST} from "./actionTypes";
import axios from "axios";
import {initListAction} from "./actionCreators";

function* getInitList() {
    try { // yiled表示一直等待到接口回应
        // 要想获取"/list.json"只需要把list.json放在public目录下即可
        const res = yield axios.get('/list.json');
        const action = initListAction(res.data);
        // 把数据写会到store中
        yield put(action);
    } catch (e) {
        console.log("接口请求异常：" + e.message);
    }
}

// es6的generator函数
function* mySaga() {
    // 接收到GET_INIT_LIST的消息就执行getInitList方法
    yield takeEvery(GET_INIT_LIST, getInitList);
}

export default mySaga;
