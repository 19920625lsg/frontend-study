import React from 'react';

class TodoItem extends React.Component {
    handleDelete() {
        this.props.delete(this.props.index);
    };

    render() {
        return (
            <div>
                <div onClick={this.handleDelete.bind(this)}>{this.props.content}</div>
            </div>
        )
    }
}

export default TodoItem;
