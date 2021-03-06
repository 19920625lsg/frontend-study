import React, {Component} from 'react';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import {Input, Button, List} from 'antd';
// 默认会引入store目录下的index.js
import store from './store'

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState(); // 把全局变量存储区store里的state直接付给当前组件的state，这样就可以直接用this.state.xxx引用store变量了
        // 防止事件绑定对象出错，还能提高性能
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        // 订阅store，store一旦更新，订阅的函数自动执行
        store.subscribe(this.handleStoreChange)
    }

    render() {
        console.log("render in TodoList : " + JSON.stringify(store.getState()));
        return (
            <div style={{marginTop: '10px', marginLeft: '10px'}}>
                <div>
                    <Input placeholder="todos" value={this.state.inputValue}
                           style={{width: 400, marginRight: '10px'}} onChange={this.handleInputChange}/>
                    <Button type="primary" onClick={this.handleBtnClick}>提交</Button>
                </div>
                <List style={{marginTop: '10px', width: 400}}
                      bordered
                      dataSource={this.state.list}
                      renderItem={item => (<List.Item>{item}</List.Item>)}
                />
            </div>
        );
    }

    // 输入框的更新事件
    handleInputChange(e) {
        // 修改store第1步：创建action，并通过dispatch传给store
        const action = {
            // 告诉store要做的事情
            type: 'change_input_value',
            value: e.target.value
        };
        store.dispatch(action);
    }

    // 订阅store后，当store更新后，自动触发这个函数.见第15行
    handleStoreChange() {
        console.log("store更新啦！");
        // store发生变化，就更新组件的state
        this.setState(store.getState())
    }

    // 按钮点击事件，走一遍更新redux的过程
    handleBtnClick() {
        // 定义action并把action传递一个reducer
        const action = {
            type: 'add_todo_item',
        };
        store.dispatch(action);
    }
}

export default TodoList;
