import React, {Component} from 'react';
import {Card, Table, Badge, Modal, message} from "antd";
import axios from '../../../myaxios/index'

class HighTable extends Component {
    // 务必要声明state，要不dataSource找不到
    state = {};
    params = {
        page: 1
    };

    componentDidMount() {
        this.request();
    }

    handleChange = (pagination, filters, sorter) => {
        this.setState({
                sortOrder: sorter.order
            }
        );
    };

    // 删除当前行
    handleDelete = (item) => {
        let id = item.id;
        Modal.confirm({
            title: '确认',
            content: `您确认要删除此条数据吗？${id}`,
            onOk: () => {
                message.success('删除成功');
                this.request();
            }
        })
    };

    // 动态获取mock数据
    request = () => {
        axios.ajax({
            url: '/table/high/list',
            data: {
                params: {
                    page: this.params.page
                },
                // 是否加载loading界面的开关,false表示关闭，true表示打开,默认为true，true的时候这个属性实际不用写地
                isShowLoading: true
            }
        }).then((res) => {
            if (res.code === 0) {
                console.log("获取数据成功，数据如下：");
                console.log(res.result);
                this.setState({
                    dataSource: res.result.list
                })
            }
        });
    };

    render() {

        const columns = [
            {
                title: 'id',
                key: 'id',
                dataIndex: 'id',
                width: 80
            },
            {
                title: '用户名',
                key: 'username',
                dataIndex: 'username',
                width: 80
            },
            {
                title: '性别',
                key: 'sex',
                dataIndex: 'sex',
                width: 80,
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                key: 'state',
                dataIndex: 'state',
                width: 80,
                render(state) {
                    let config = {
                        '1': <Badge status='success' text='咸鱼一条'/>,
                        '2': <Badge status='default' text='风华浪子'/>,
                        '3': <Badge status='error' text='北大才子'/>,
                        '4': <Badge status='warning' text='百度FE'/>,
                        '5': <Badge status='processing' text='创业者'/>
                    };
                    return config[state];
                }
            },
            {
                title: '爱好',
                key: 'interest',
                dataIndex: 'interest',
                width: 80,
                render(abc) {
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸'
                    };
                    return config[abc];
                }
            },
            {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday',
                width: 120,
            },
            {
                title: '地址',
                key: 'address',
                dataIndex: 'address',
                width: 120,
            },
            {
                title: '早起时间',
                key: 'time',
                dataIndex: 'time',
                width: 120,
            }
        ];
        const columns3 = [
            {
                title: 'id',
                key: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                key: 'username',
                dataIndex: 'username'
            },
            {
                title: '性别',
                key: 'sex',
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '年龄',
                key: 'age',
                dataIndex: 'age',
                sorter: (a, b) => {
                    return a.age - b.age;
                },
                sortOrder: this.state.sortOrder
            },
            {
                title: '状态',
                key: 'state',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        '1': '咸鱼一条',
                        '2': '风华浪子',
                        '3': '北大才子',
                        '4': '百度FE',
                        '5': '创业者'
                    };
                    return config[state];
                }
            },
            {
                title: '爱好',
                key: 'interest',
                dataIndex: 'interest',
                render(abc) {
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸'
                    };
                    return config[abc];
                }
            },
            {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                key: 'address',
                dataIndex: 'address'
            },
            {
                title: '操作',
                render: (text, item) => {
                    return <button size="small" onClick={(item) => {
                        this.handleDelete(item)
                    }}>删除</button>
                }
            }
        ];
        return (
            <div>
                <Card title='头部固定'>
                    {/*columns中的width固定才能使得宽度固定*/}
                    <Table scroll={{y: 240}} bordered={true} columns={columns} dataSource={this.state.dataSource}
                           rowKey='id'/>
                </Card>
                <Card title='左侧和右侧固定--没有做' style={{marginTop: '10px'}}>
                    <Table scroll={{x: 800}} bordered={true} columns={columns} dataSource={this.state.dataSource}
                           rowKey='id'/>
                </Card>
                <Card title='表格排序' style={{marginTop: '10px'}}>
                    <Table bordered={true} columns={columns3} dataSource={this.state.dataSource}
                           rowKey='id' onChange={this.handleChange}/>
                </Card>
            </div>
        );
    }
}

export default HighTable;
