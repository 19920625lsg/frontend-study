import React, {Component} from 'react';
import TodoItem from './TodoItem'

// 定义一个组件
class TodoList extends Component {
    handleDelete(index) {
        // 最好拷贝出来，改完后再设置回去
        let list = [...this.state.list];
        list.splice(index, 1);
        this.setState({
            list: list
        });

    };

    handleInputChange(e) {
        this.setState({
            inputValue: e.target.value
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            list: ['a', 'b', 'c'],
            inputValue: ''
        };
    };

    handleBtnCLick() {
        this.setState({
            list: [...this.state.list, this.state.inputValue],
            inputValue: ''
        });
    };

    render() {
        return (
            <div>
                <div>
                    <input type="text" style={{background: 'green'}} value={this.state.inputValue}
                           onChange={this.handleInputChange.bind(this)}/>
                    <button style={{background:'red'}} onClick={this.handleBtnCLick.bind(this)}>add</button>
                    <button className='red-btn' onClick={this.handleBtnCLick.bind(this)}>add</button>
                </div>
                <ul>
                    {
                        this.state.list.map((item, index) => {
                            return <TodoItem delete={this.handleDelete.bind(this)} key={index} content={item}
                                             index={index}/>
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default TodoList;
