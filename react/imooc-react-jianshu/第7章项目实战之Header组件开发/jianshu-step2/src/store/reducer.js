// reducer相当于笔记本，用于记录借书记录.state相当于笔记本里的数据
import {SEARCH_BLUR, SEARCH_FOCUS} from "./actionTypes";

const defaultState = {
    // todolist的默认数据
    focused: false
};

// state指上一次的存储在store中的数据，action指用户要进行的操作(在组件里构造地)
export default (state = defaultState, action) => {
    // 修改store数据第2步：redux自动把action（previousState，action）传给reducer
    // console.log(state, action);
    // 修改store数据第3步：自定义逻辑决定怎么更新state，然后把新的state返回后更新store
    if (action.type === SEARCH_FOCUS) {
        // 深拷贝重新创建一个state.需要深拷贝是因为reducer只能接收state但是绝不能修改state
        const newState = JSON.parse(JSON.stringify(state));
        newState.focused = true;
        // 返回新state给store(见store目录下的index.js)
        return newState;
    }
    if (action.type === SEARCH_BLUR) {
        // 深拷贝重新创建一个state.需要深拷贝是因为reducer只能接收state但是绝不能修改state
        const newState = JSON.parse(JSON.stringify(state));
        newState.focused = false;
        // 返回新state给store(见store目录下的index.js)
        return newState;
    }
    return state;
}
