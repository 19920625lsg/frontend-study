import React from 'react';
import 'antd/dist/antd.css';
import {Input, Button, List} from 'antd';

// 无状态组件的应用场景：当一个组件只有render函数的时候，可以用const生命的无状态组件来代替
// 无状态组件的优势：性能比较高，没有生命周期函数
const TodoListUi = (props) => {
    return (
        <div>
            <div style={{marginTop: '10px', marginLeft: '10px'}}>
                <div>
                    <Input placeholder="todos" value={props.inputValue}
                           style={{width: 400, marginRight: '10px'}} onChange={props.handleInputChange}/>
                    <Button type="primary" onClick={props.handleBtnClick}>提交</Button>
                </div>
                <List style={{marginTop: '10px', width: 400}}
                      bordered
                      dataSource={props.list}
                      renderItem={(item, index) => (
                          <List.Item onClick={() => {
                              // 这种调用父组件中带参函数的方法一定要好好体会
                              props.handleItemDelete(index)
                          }}>{item}</List.Item>)}
                />
            </div>
        </div>
    );
};

export default TodoListUi;
