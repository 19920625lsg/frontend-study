import React, {Component} from "react";
import Child from "./Child";
import './demo.less'
import {Button, Input} from 'antd'

class LifeCycle extends Component {

    // 这个是简化的构造方法，可以不用谢constructor那一套了
    state = {
        count: 0,
        name: "梁山广"
    };

    // 调用地时候不传bing(this)的函数声明
    handleAdd = () => {
        this.setState({
            count: this.state.count + 1
        });
    };

    // 加上bind(this)的函数声明
    handleAdd2() {
        this.setState({
            count: this.state.count + 1
        });
    }


    render() {
        return (
            <div className='content'>
                <p>React生命周期</p>
                <button onClick={this.handleAdd}>点击一下</button>
                <button onClick={this.handleAdd2.bind(this)}>点击一下</button>
                <Input/>
                <Button onClick={this.handleAdd2.bind(this)}>Antd点击一下</Button>
                <p>{this.state.count}</p>
                <Child name={this.state.name} age={this.state.count}></Child>
            </div>
        );
    }
}

export default LifeCycle;
