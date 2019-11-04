import React, {Component} from 'react';

class TodoItem extends Component {

    render() {
        return (
            <div onClick={this.handleClick.bind(this)}>
                {/*通过props来引用父组件传递过来的属性*/}
                {this.props.content}
            </div>
        );
    }

    handleClick() {
        // 子组件调用父组件的方法来删除父组件的内容
        this.props.deleteItem(this.props.index);
    }
}

export default TodoItem;
