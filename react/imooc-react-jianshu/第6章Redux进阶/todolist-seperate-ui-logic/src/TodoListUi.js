import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Input, Button, List} from 'antd';

class TodoListUi extends Component {
    render() {
        return (
            <div>
                <div style={{marginTop: '10px', marginLeft: '10px'}}>
                    <div>
                        <Input placeholder="todos" value={this.props.inputValue}
                               style={{width: 400, marginRight: '10px'}} onChange={this.props.handleInputChange}/>
                        <Button type="primary" onClick={this.props.handleBtnClick}>提交</Button>
                    </div>
                    <List style={{marginTop: '10px', width: 400}}
                          bordered
                          dataSource={this.props.list}
                          renderItem={(item, index) => (
                              <List.Item onClick={() => {
                                  // 这种调用父组件中带参函数的方法一定要好好体会
                                  this.props.handleItemDelete(index)
                              }}>{item}</List.Item>)}
                    />
                </div>
            </div>
        );
    }
}

export default TodoListUi;
