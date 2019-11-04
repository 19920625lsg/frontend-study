import React, {Component} from 'react';
import {Button, Card, Form, Select, Table, DatePicker, message} from "antd";
import Utils from '../../util/util'
import axios from '../../myaxios/index'
import './index.less'

const FormItem = Form.Item;
const Option = Select.Option;

class Order extends Component {
    state = {};
    params = {
        page: 1
    };

    componentDidMount() {
        this.requestList();
    };

    requestList = () => {
        let _this = this;
        axios.ajax({
            url: '/order/list',
            data: {
                params: this.params.page
            }
        }).then((res) => {
            if (res.code === 0 || res.code === '0') {
                this.setState({
                    list: res.result.item_list,
                    pagination: Utils.pagination(res, (current) => {
                        _this.params.page = current;
                        _this.requestList();
                    })
                })
            }
        })
    };
    handleFinish = () => {
        // todo:待完成详细的函数
        message.success("订单结束");
    };

    handleDetail = () => {
        // todo:待完成地图下详情界面
        message.success("地图详情页完成！");
    };

    render() {
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance) {
                    return distance / 1000 + 'Km';
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ];
        return (
            <div>
                <Card>
                    <FilterForm/>
                </Card>
                <Card style={{marginTop: 10}}>
                    <Button type="primary" onClick={this.handleDetail}>订单详情</Button>
                    <Button type="primary" style={{marginLeft: 10}} onClick={this.handleFinish}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        columns={columns} dataSource={this.state.list} pagination={this.state.pagination}
                        rowKey='id' bordered={true}
                    />
                </div>
            </div>
        );
    }
}

class FilterForm extends Component {
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Form layout='inline'>
                    <FormItem label='城市'>
                        {
                            getFieldDecorator('city_id')(
                                <Select placeholder='请选择' style={{width: 80}}>
                                    <Option value='1'>深圳</Option>
                                    <Option value='2'>上海</Option>
                                    <Option value='3'>北京</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label='订单时间'>
                        {
                            getFieldDecorator('start_time')(
                                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{width: 250}}/>
                            )
                        }
                        {
                            getFieldDecorator('end_time')(
                                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{marginLeft: 5, width: 250}}/>
                            )
                        }
                    </FormItem>
                    <FormItem label='订单状态'>
                        {
                            getFieldDecorator('op_mode')(
                                <Select placeholder='请选择' style={{width: 80}}>
                                    <Option value=''>全部</Option>
                                    <Option value='2'>进行中</Option>
                                    <Option value='3'>结束行程</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem>
                        <Button type='primary' style={{margin: '0 20px'}}>查询</Button>
                        <Button>重置</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

FilterForm = Form.create({})(FilterForm);
export default Order;
