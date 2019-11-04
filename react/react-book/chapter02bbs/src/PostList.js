// 用于展示BBS帖子列表的组件
import React, {Component} from 'react'
import PostItem from "./PostItem";

// 这里是自己临时定义的数据，真实项目中一般是从服务器端获取
const data = [
    {title: '大家一起讨论React吧', author: '张三', date: '2018-08-02 12:34:45'},
    {title: '大家一起讨论Vue吧', author: '张三', date: '2017-08-02 12:34:45'},
    {title: '大家一起讨论Angular吧', author: '张三', date: '1998-08-02 12:34:45'}
];

class PostList extends Component {
    render() {
        return (
            <div>
                帖子列表：
                <ul>
                    {
                        data.map(
                            //没有key属性会报错但是 不影响正常使用
                            item => <PostItem key={item.title} title={item.title} author={item.author}
                                              date={item.date}/>
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default PostList;
