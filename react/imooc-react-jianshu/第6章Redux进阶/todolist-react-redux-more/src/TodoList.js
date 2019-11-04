import React, {Component} from 'react';
import {connect} from 'react-redux'
import {
    getBtnClickAction,
    getInputChangeAction,
    getItemDeleteAction,
    getTodoList,
    initListAction
} from "./store/actionCreators";
import axios from "axios";

// connect用于连接store和当前组件(前提是当前组件用在Provider中)
class TodoList extends Component {
    render() {
        const {inputValue, changeInputValue, list, handleBtnClick, handleItemDetele} = this.props;
        return (
            <div>
                <div>
                    <input value={inputValue} onChange={changeInputValue}/>
                    <button onClick={handleBtnClick}>提交</button>
                </div>
                <ul>
                    {list.map(
                        (item, index) => {
                            return <li key={index} onClick={() => handleItemDetele(index)}>{item}</li>
                        }
                    )}
                </ul>
            </div>
        );
    }

    componentDidMount() {
        const {getInitListFromAxios} = this.props;
        getInitListFromAxios();
    }
}

// 映射store中的state和组件中props里对应的值
const mapStateToProps = (state) => {
    // state和props的映射关系。数据边页面自动变，不需要再自己订阅啦~
    return {
        inputValue: state.inputValue,
        list: state.list
    }
};

// 把store.dispatch方法挂载到props上(想要改变store中的内容，然后自动刷新到组件的props中)
const mapDispatchToProps = (dispatch) => {
    return {
        changeInputValue(e) {
            console.log(e.target.value);
            // 修改store数据第1步：创建action并派发action给reducer
            const action = getInputChangeAction(e.target.value);
            // 派发action给reducer
            dispatch(action);
        },
        // 提交按钮事件
        handleBtnClick() {
            const action = getBtnClickAction();
            dispatch(action);
        },
        // 点击列表项进行删除
        handleItemDetele(index) {
            const action = getItemDeleteAction(index);
            dispatch(action);
        },
        // axios获取初始化的数据
        getInitListFromAxios() {
            // 要想获取"/list.json"只需要把list.json放在public目录下即可
            axios.get('/list.json')
                .then((res) => {
                    // 成功地话
                    const data = res.data;
                    const action = initListAction(data);
                    dispatch(action);
                });
        }
    }
};

// connect用于连接store和组件，然后把store中的state和组件中的props通过mapStateToProps的定义进行映射
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
