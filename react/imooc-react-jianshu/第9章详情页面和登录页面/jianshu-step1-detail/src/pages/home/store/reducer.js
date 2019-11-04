// reducer相当于笔记本，用于记录借书记录.state相当于笔记本里的数据
import * as constants from "./constants";
import {fromJS} from "immutable";

const defaultState = fromJS({
    // home页面的数据
    topicList: [],
    articleList: [],
    recommendList: [],
    writerList: [],
    showScroll: false
});

// state指上一次的存储在store中的数据，action指用户要进行的操作(在组件里构造地)
export default (state = defaultState, action) => {
    // 修改store数据第2步：redux自动把action（previousState，action）传给reducer
    switch (action.type) {
        case  constants.GET_TOPIC_LIST:
            return state.set("topicList", action.data);
        case constants.GET_ARTICLE_LIST:
            return state.set("articleList", action.data);
        case constants.GET_RECOMMEND_LIST:
            return state.set("recommendList", action.data);
        case constants.GET_WRITER_LIST:
            return state.set("writerList", action.data);
        case constants.TOGGLE_BACKTOP:
            return state.set("showScroll", action.show);
        default:
            return state;
    }
}
