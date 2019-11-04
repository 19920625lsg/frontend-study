// reducer相当于笔记本，用于记录借书记录.state相当于笔记本里的数据
import * as constants from "./constants";
import {fromJS} from "immutable";

const defaultState = fromJS({
    // header搜索框的默认数据
    focused: false,
    list: []
});

// state指上一次的存储在store中的数据，action指用户要进行的操作(在组件里构造地)
export default (state = defaultState, action) => {
    // 修改store数据第2步：redux自动把action（previousState，action）传给reducer
    switch (action.type) {
        case constants.SEARCH_FOCUS:
            return state.set("focused", true);
        case constants.SEARCH_BLUR:
            return state.set("focused", false);
        case  constants.GET_LIST:
            return state.set("list", action.data);
        default:
            return state;
    }
}
