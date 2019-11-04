import React, {Component} from 'react';

class App extends Component {
    render() {
        return (
            <div>
                {/*可以渲染所有从MyRouter中传过来地组件内容*/}
                {this.props.children}
            </div>
        );
    }
}

export default App;
