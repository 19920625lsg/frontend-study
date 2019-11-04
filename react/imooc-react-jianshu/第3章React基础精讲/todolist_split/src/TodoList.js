import React, {Component, Fragment} from 'react';
import './style.css'
import TodoItem from "./TodoItem";

// webstorm里用rcc可以快速生成组件(rccp也行，但是生成的不太懂)
class TodoList extends Component {
    constructor(props) {
        super(props);
        // 数据需要存在状态state中
        this.state = {
            inputValue: 'hello!',
            list: ["学习英语", "练习React", "学习Vue"]
        }
    }

    render() {
        return (
            // Fragment是占位符，当做最外层div用但是不会在页面显示，从而不影响dom结构
            <Fragment>
                <div>
                    {/*点击文字自动让输入框成为激活状态，注意用htmlFor，不要用for，因为for和react里的for关键字冲突了*/}
                    <label htmlFor="insertArea">输入内容:</label>
                    {/*一定要记得用bind(this)来指定方法*/}
                    <input id="insertArea" type="text" className='input' value={this.state.inputValue}
                           onChange={this.handleInputChange.bind(this)}/>
                    <button onClick={this.handleBtnClick.bind(this)}>提交</button>
                </div>
                <ul>
                    {
                        //这种遍历list的方法一定要掌握.index为元素的键值，作为渲染元素的key,是必须的，否则控制台会告警
                        this.state.list.map((item, index) => {
                            // 写法1：不支持对item内容进行html渲染.index为数组的下标值
                            // return <li key={index} onClick={this.handleItemDelete.bind(this, index)}>{item}</li>

                            // 方法2：可以把input的内容进行渲染(有html标签可以体现出来)
                            // return <li key={index} onClick={this.handleItemDelete.bind(this, index)}
                            //            dangerouslySetInnerHTML={{__html: item}}></li>

                            // 方法3：利用自己封装的子组件，通过父子组件传值来实现待办列表TodoList
                            // return <TodoItem/> // 这种写法没有传值，最终渲染出来的都是TodoItem的默认值

                            // 方法4：通过自定义属性来传递值和方法
                            // content为自定义属性，可以在子组件中用props.content调用，index类似
                            // 同过属性deleteItem把方法传递给子组件，子组件可以通过props.deleteItem调用父类的handleItemDelete
                            // 方法了,有点像父类中的方法起了个别名传到了子类中.注意bind(this)是必须地哦
                            return <TodoItem content={item} index={index} deleteItem={this.handleItemDelete.bind(this)}/>
                        })
                    }
                </ul>
            </Fragment>
        );
    }

    // 接收输入框的事件
    handleInputChange(e) {
        // e.target代表事件触发的对象，这里就是指输入框
        console.log(e.target);
        // 设置属性值
        // this.state.inputValue = e.target.value; // 不能用这种方式设置state里的属性，必须用setState方法
        this.setState({
            inputValue: e.target.value
        });

        // 输入框的属性的值
        console.log(e.target.value);
    }

    // 点击按钮把输入框的值加入到数组中
    handleBtnClick() {
        this.setState({
            // ...表示展开运算符
            list: [...this.state.list, this.state.inputValue],
            // 清空输入框的值,方便二次输入
            inputValue: ''
        });
    }

    // 接收点击事件传递过来地值
    handleItemDelete(index) {
        // 不能直接修改state中的内容，先拷贝一份，修改完后再放回去
        const list = [...this.state.list];
        // 删除下标为index的元素
        list.splice(index, 1);
        this.setState({
            list: list
        });
    }
}

export default TodoList;
