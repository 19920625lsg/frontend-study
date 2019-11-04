import React, {Component} from 'react';
import {connect} from 'react-redux'

// connect用于连接store和当前组件(前提是当前组件用在Provider中)
class TodoList extends Component {
    render() {
        return (
            <div>
                <div>
                    <input value={this.props.inputValue} onChange={this.props.changeInputValue}/>
                    <button>提交</button>
                </div>
                <ul>
                    <li>Angular</li>
                    <li>React</li>
                    <li>Vue</li>
                </ul>
            </div>
        );
    }
}

// 映射state和props里对应的值
const mapStateToProps = (state) => {
    // state和props的映射关系
    return {
        inputValue: state.inputValue
    }
};

// 把store.dispatch方法挂载到props上(想要改变store中的内容，然后自动刷新到组件的props中)
const mapDispatchToProps = (dispatch) => {
    return {
        changeInputValue(e) {
            console.log(e.target.value);
            // 修改store数据第1步：创建action并派发action给reducer
            const action = {
                type: 'change_input_value',
                value: e.target.value
            };
            // 派发action给reducer
            dispatch(action);
        }
    }
};

// connect用于连接store和组件，然后把store中的state和组件中的props通过mapStateToProps的定义进行映射
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
