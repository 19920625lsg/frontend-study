import React, {Component} from 'react';
import PropTypes from 'prop-types'

class TodoItem extends Component {
    constructor(props) {
        super(props);
        // 初始化解决this指针问题，下面调用的时候就不用每次都bind了
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        // 结构赋值，自动把this.props中的content属性值(父组件传递过来的)赋给content变量
        const {content, test} = this.props;
        return (
            <div onClick={this.handleClick}>
                {/*方法1：同过props来引用父组件传递过来的属性*/}
                {/*{this.props.content}*/}

                {/*方法2：通过上面第7行的结构化赋值可以简化写法如下*/}
                {test} --- {content}
            </div>
        );
    }

    handleClick() {
        // 方法1： 子组件调用父组件的方法来删除父组件的内容(this.props形式)
        // this.props.deleteItem(this.props.index);

        // 方法2：通过结构化赋值的方法，简化去掉this.props
        const {deleteItem, index} = this.props;
        deleteItem(index);
    }
}

// 对组件属性的数据类型进行校验
TodoItem.propTypes = {
    test: PropTypes.string.isRequired, // 设置属性为必传
    // content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // 设置多个默认数据类型
    content: PropTypes.string,
    deleteItem: PropTypes.func,
    index: PropTypes.number
};

// 为属性设置默认值
TodoItem.defaultProps = {
    test: "just for test",
};

export default TodoItem;
