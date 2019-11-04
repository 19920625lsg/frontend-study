import React, {Component} from 'react';

class Test extends Component {
    // 当父组件的render()函数被重新运行时，她的子组件的render()函数都将被重新执行
    render() {
        return (
            <div>
                {this.props.content}
            </div>
        );
    }
}

export default Test;
