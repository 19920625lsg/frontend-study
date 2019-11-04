// reducer相当于笔记本，用于记录借书记录.state相当于笔记本里的数据
import * as constants from "./constants";
import {fromJS} from "immutable";

const defaultState = fromJS({
    // header搜索框的默认数据
    focused: false
});

// state指上一次的存储在store中的数据，action指用户要进行的操作(在组件里构造地)
export default (state = defaultState, action) => {
    // 修改store数据第2步：redux自动把action（previousState，action）传给reducer
    if (action.type === constants.SEARCH_FOCUS) {
        return state.set("focused", true)

    }
    if (action.type === constants.SEARCH_BLUR) {
        return state.set("focused", false)
    }
    return state;
}
