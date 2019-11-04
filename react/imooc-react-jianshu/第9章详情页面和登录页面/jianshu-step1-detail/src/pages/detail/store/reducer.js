// reducer相当于笔记本，用于记录借书记录.state相当于笔记本里的数据
import * as constants from "./constants";
import {fromJS} from "immutable";

const defaultState = fromJS({
    // detail页的默认数据
    title: '',
    content: ''
});

// state指上一次的存储在store中的数据，action指用户要进行的操作(在组件里构造地)
export default (state = defaultState, action) => {
    // 修改store数据第2步：redux自动把action（previousState，action）传给reducer
    switch (action.type) {
        case  constants.GET_DETAIL:
            // action有多个数据需要修改state时要用merge方法
            return state.merge({
                title: action.title,
                content: action.content
            });
        default:
            return state;
    }
}
