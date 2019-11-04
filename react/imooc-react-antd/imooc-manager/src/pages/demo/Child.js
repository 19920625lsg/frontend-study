import React, {Component} from "react";

class Child extends Component {

    // 页面mount之前
    componentWillMount() {
        console.log("will mount");
    }

    // 页面mount完毕
    componentDidMount() {
        console.log("did mount");
    }

    // 接收其他组件传过来地属性
    componentWillReceiveProps(newProps) {
        console.log("will props : " + newProps);
    }

    // 设置state中的属性成功
    shouldComponentUpdate() {
        console.log("should update by call setState()");
        // 这个true必须返回，要不组件声明周期无法继续执行，会出错地
        return true;
    }

    // 组件更新前
    componentWillUpdate() {
        console.log("will update");
    }

    // 组件更新后
    componentDidUpdate() {
        console.log("did update");
    }

    render() {
        return (
            <div>
                <h1>这里是子组件，测试子组件的生命周期</h1>
                <p>姓名：{this.props.name}，年龄：{this.props.age}</p>
            </div>
        );
    }
}

export default Child;
