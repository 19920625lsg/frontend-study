import {combineReducers} from "redux-immutable";
import {header as headerReducer} from '../common/header/store'

const reducer = combineReducers({
    header: headerReducer
});

export default reducer;

