import React, {Component, Fragment} from 'react';
import './style.css'
import TodoItem from "./TodoItem";

// webstorm里用rcc可以快速生成组件(rccp也行，但是生成的不太懂)
class TodoList extends Component {
    // 钩子函数：初始化
    constructor(props) {
        super(props);
        // 数据需要存在状态state中
        this.state = {
            inputValue: 'hello!',
            list: ["学习英语", "练习React", "学习Vue"]
        };

        // 初始化解决this指针问题，下面调用的时候就不用每次都bind了
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleItemDelete = this.handleItemDelete.bind(this);
    }

    // 钩子函数：组件即将被挂载到页面之前自动执行
    componentWillMount() {
        console.log("componentWillMount 页面即将加载...");
    }


    // 钩子函数：props改变前被调用，和state更新前唯一地不同。
    // 执行时刻：从父组件接收到了数据 & 父组件的render函数被调用了(组件第一次存在于父组件不会执行，组件之前已经存在父组件中才会执行)
    // 一般用于从父组件中获取数据，收到数据后进入shouldComponentUpdate。在TodoItem中调用更合适
    componentWillReceiveProps(nextProps, nextContext) {
        console.log("father componentWillReceiveProps 接收到了来自父组件的数据，即将进入shouldComponentUpdate判断是否需要更新...")
    }

    // 钩子函数：判断页面是否能更新
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("shouldComponentUpdate 返回true页面即将更新,返回false页面更新操作被终止");
        // 返回false的话，接下面的render()函数就不会被调用，页面就不会被刷新了
        return true;
    }

    // 钩子函数：页面更新前执行.shouldComponentUpdate()返回true才会走近这个函数
    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log("componentWillUpdate 页面即将更新...");
    }

    // 钩子函数：组件加载/刷新的时候执行render函数
    render() {
        console.log("father render 父组件加载/更新中...");
        return (
            // Fragment是占位符，当做最外层div用但是不会在页面显示，从而不影响dom结构
            <Fragment>
                <div>
                    {/*点击文字自动让输入框成为激活状态，注意用htmlFor，不要用for，因为for和react里的for关键字冲突了*/}
                    <label htmlFor="insertArea">输入内容:</label>
                    {/*一定要记得用bind(this)来指定方法*/}
                    <input id="insertArea" type="text" className='input' value={this.state.inputValue}
                           onChange={this.handleInputChange}/>
                    <button onClick={this.handleBtnClick}>提交</button>
                </div>
                <ul>
                    {/*封装复杂的代码到方法中，使得代码更精简*/}
                    {this.getTodoItem()}
                </ul>
            </Fragment>
        );
    }

    // 钩子函数：组件即将被挂载到页面之后自动执行
    componentDidMount() {
        console.log("componentDidMount 页面加载完毕");
    }

    // 钩子函数：组件更新完后执行
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("componentDidUpdate 组件更新完毕...");
    }

    // 当这个组件即将被从页面中剔除的时候执行，因为父组件时整个网站，不好剔除，所以在子组件TodoItem中演示
    componentWillUnmount() {
        console.log("father componentWillUnmount 组件即将被移除....")
    }

    // 接收输入框的事件
    handleInputChange(e) {
        // e.target代表事件触发的对象，这里就是指输入框
        // console.log(e.target);
        // 设置属性值
        // this.state.inputValue = e.target.value; // 不能用这种方式设置state里的属性，必须用setState方法
        this.setState({
            inputValue: e.target.value
        });

        // 输入框的属性的值
        // console.log(e.target.value);
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

    getTodoItem() {
        //这种遍历list的方法一定要掌握.index为元素的键值，作为渲染元素的key,是必须的，否则控制台会告警
        return this.state.list.map((item, index) => {
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
            return <TodoItem content={item} index={index} key={index}
                             deleteItem={this.handleItemDelete}/>
        })

    }
}

export default TodoList;
