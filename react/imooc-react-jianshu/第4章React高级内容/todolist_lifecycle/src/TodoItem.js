import React, {Component} from 'react';

class TodoItem extends Component {
    constructor(props) {
        super(props);
        // 初始化解决this指针问题，下面调用的时候就不用每次都bind了
        this.handleClick = this.handleClick.bind(this);
    }

    // 钩子函数：props改变前被调用，和state更新前唯一地不同。
    // 执行时刻：从父组件接收到了数据 & 父组件的render函数被调用了(组件第一次存在于父组件不会执行，组件之前已经存在父组件中才会执行)
    // 一般用于从父组件中获取数据，收到数据后进入shouldComponentUpdate。在TodoItem中调用更合适
    componentWillReceiveProps(nextProps, nextContext) {
        console.log("child componentWillReceiveProps 接收到了来自父组件的数据，即将进入shouldComponentUpdate判断是否需要更新...")
    }

    // 钩子函数：组件加载/刷新的时候执行render函数
    render() {
        console.log("child render 父组件加载/更新中...");
        // 结构赋值，自动把this.props中的content属性值(父组件传递过来的)赋给content变量
        const {content} = this.props;
        return (
            <div onClick={this.handleClick}>
                {/*方法1：同过props来引用父组件传递过来的属性*/}
                {/*{this.props.content}*/}

                {/*方法2：通过上面第7行的结构化赋值可以简化写法如下*/}
                {content}
            </div>
        );
    }

    // 当这个组件即将被从页面中剔除的时候执行，因为父组件时整个网站，不好剔除，所以在子组件TodoItem中演示
    componentWillUnmount() {
        console.log("child componentWillUnmount 组件即将被移除....")
    }

    handleClick() {
        // 方法1： 子组件调用父组件的方法来删除父组件的内容(this.props形式)
        // this.props.deleteItem(this.props.index);

        // 方法2：通过结构化赋值的方法，简化去掉this.props
        const {deleteItem, index} = this.props;
        deleteItem(index);
    }
}

export default TodoItem;
