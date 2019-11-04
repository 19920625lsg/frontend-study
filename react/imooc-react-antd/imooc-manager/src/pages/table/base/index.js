import React, {Component} from 'react';
import {Card, Table, Button, Modal, message} from "antd";
import axios from '../../../myaxios/index'
import Utils from "../../../util/util";

class BaseTable extends Component {
    // 务必要声明state，要不dataSource找不到
    state = {};
    params = {
        page: 1
    };
    // 表格行点击事件
    onRowClick = (record, index) => {
        console.log("姓名：" + record.username + "，生日：" + record.birthday);
        console.log(index);
        // 选中的行
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectItem: record
        });
    };

    // 多行的删除动作
    handleDelete = (() => {
        let rows = this.state.selectedRows;
        let ids = [];
        rows.map((item) => {
            return ids.push(item.id);
        });
        Modal.confirm({
            title: '*删除提示*',
            content: `您确认要删除这些数据吗？${ids.join(',')}`,
            onOk: () => {
                message.success('删除成功');
                // todo:删除数据，根据自己的接口去实现
                // 删除数据后自己刷新下
                this.request();
            }
        });
    });

    componentDidMount() {
        const data = [
            {
                id: '0',
                username: '张三',
                birthday: '1992-03-24',
                university: '北京大学'
            },
            {
                id: '1',
                username: '李四',
                birthday: '1993-01-23',
                university: '清华大学'
            },
            {
                id: '2',
                username: '王五',
                birthday: '1994-03-17',
                university: '浙江大学'
            },
            {
                id: '3',
                username: '梁山广',
                birthday: '1992-06-25',
                university: '山东大学'
            },
            {
                id: '4',
                username: '王蕊',
                birthday: '1992-10-23',
                university: '东南大学'
            }
        ];
        this.setState({
            dataSource: data
        });
        this.request();
    }

    // 动态获取mock数据
    request = () => {
        let that = this;
        axios.ajax({
            url: '/table/list',
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
                    dataSource2: res.result.list,
                    selectedRowKeys: [],
                    selectedRows: null,
                    pagination: Utils.pagination(res, (current) => {
                        // 分页的变化
                        that.params.page = current;
                        this.request()
                    })
                })
            }
        });
    };

    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'username'
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '大学',
                dataIndex: 'university'
            }
        ];
        const columns2 = [
            {
                title: 'id',
                key: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                key: 'userName',
                dataIndex: 'userName'
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
                title: '早起时间',
                key: 'time',
                dataIndex: 'time'
            }
        ];
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            // Table带的属性，用于获取表格中选择的数据行的key组成的数组
            selectedRowKeys
        };
        const rowCheckSelection = {
            type: 'checkbox',
            // Table带的属性，用于获取表格中选择的数据行的key组成的数组
            selectedRowKeys,
            // 选中的变化事件
            onChange: (selectedRowKeys, selectedRows) => {
                // 获取所有的选择行的id
                // let ids = [];
                // selectedRows.map((item) => {
                //     ids.push(item.id);
                // });
                this.setState({
                    selectedRowKeys,
                    selectedRows
                    // 写入所有的id
                    // selectIds: ids
                });
            }
        };
        return (
            <div>
                <Card title='基础表格'>
                    <Table bordered={true} columns={columns} dataSource={this.state.dataSource} rowKey='id'/>
                </Card>
                <Card title='动态渲染表格-Mock' style={{marginTop: '10px'}}>
                    <Table bordered={true} columns={columns2} dataSource={this.state.dataSource2} rowKey='id'/>
                </Card>
                <Card title='动态渲染表格，单行选中(Radio)' style={{marginTop: '10px'}}>
                    <Table bordered={true} columns={columns2} dataSource={this.state.dataSource2} rowKey='id'
                           rowSelection={rowSelection}
                           onRow={(record, index) => {
                               return {
                                   onClick: () => {
                                       // 加1是因为数据下标从1开始而index从0开始地
                                       this.onRowClick(record, index + 1);
                                   }
                               };
                           }}
                    />
                </Card>
                <Card title='动态渲染表格，多行选中(Checkbox)' style={{marginTop: '10px'}}>
                    <div style={{marginBottom: 10}}>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table bordered={true} columns={columns2} dataSource={this.state.dataSource2} rowKey='id'
                           rowSelection={rowCheckSelection}
                    />
                </Card>
                <Card title='动态渲染表格，分页' style={{marginTop: '10px'}}>
                    <div style={{marginBottom: 10}}>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table bordered={true} columns={columns2} dataSource={this.state.dataSource2} rowKey='id'
                           rowSelection={rowCheckSelection} pagination={this.state.pagination}
                    />
                </Card>
            </div>
        );
    }
}

export default BaseTable;
