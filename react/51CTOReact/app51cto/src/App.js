import React, {Component} from 'react';
import './App.css';
import Course from './components/Course'

class App extends Component {
    state = {
        course: [
            {'title': 'react', 'count': 23},
            {'title': 'vue', 'count': 12},
            {'title': 'augular', 'count': 8},
        ],
        showCourse: false
    };
    setName = (name) => {
        // 最好拷贝出来，改完后再设置回去
        let course = [...this.state.course];
        course[0] = {"title": name, 'count': 222}
        this.setState({
            course: course
        });
    };
    toggleCourse = () => {
        // 最好拷贝出来，改完后再设置回去
        let showCourse = [...this.state.showCourse];
        showCourse = !showCourse;
        this.setState({
            showCourse: showCourse
        });
        console.log(this.state.showCourse)
    };

    render() {
        return (
            <div className="App">
                <h2>我是不是你最疼爱的人</h2>
                <p> 你为什么不说话</p>
                <input type="button" value='该课名' onClick={this.setName.bind(this, "SemanticUI")}/>
                <input type="button" value='隐藏/显示课程列表' onClick={this.toggleCourse}/>
                <Course title={this.state.course[0].title} count={this.state.course[0].count}
                        click={this.setName.bind(this, "JQ")}>
                    <li>1.通俗易懂</li>
                    <li>2.好玩</li>
                    <li>3.值钱</li>
                </Course>
                <Course title={this.state.course[1].title} count={this.state.course[1].count}/>
                <Course title={this.state.course[2].title} count={this.state.course[2].count}/>
            </div>
        );
    }
}

export default App;
