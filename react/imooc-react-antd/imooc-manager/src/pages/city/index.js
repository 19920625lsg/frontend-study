import React, {Component} from 'react';
import {Button, Card, Form, Modal, Select, Table, message} from "antd";
import Utils from '../../util/util'
import axios from '../../myaxios/index'
import './index.less'

const FormItem = Form.Item;
const Option = Select.Option;

class City extends Component {
    state = {
        isShowOpenCity: false
    };
    params = {
        page: 1
    };

    componentDidMount() {
        this.requestList();
    }

    // 默认请求接口数据
    requestList = () => {
        let that = this;
        axios.ajax({
            url: '/open_city',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            this.setState({
                list: res.result.item_list,
                pagination: Utils.pagination(res, (current) => {
                    that.params.page = current;
                    that.requestList();
                })
            })
        })
    };

    // 开通城市的操作函数
    handleOpenCity = () => {
        this.setState({
            isShowOpenCity: true
        });
    };

    // 提交开通城市的请求
    handleSubmit = () => {
        //获取表单的值
        let cityInfo = this.cityForm.props.form.getFieldsValue();
        console.log(cityInfo);
        axios.ajax({
            url: '/city/open',
            data: {
                params: cityInfo
            }
        }).then((res) => {
            if (res.code === '0' || res.code === 0) {
                message.success('开通成功！');
            }
            this.setState({
                isShowOpenCity: false
            });
        })
    };

    render() {
        const columns = [
            {
                title: '城市ID',
                dataIndex: 'id'
            }, {
                title: '城市名称',
                dataIndex: 'name'
            }, {
                title: '用车模式',
                dataIndex: 'mode',
                render(mode) {
                    return mode === 1 ? '停车点' : '禁停区';
                }
            }, {
                title: '营运模式',
                dataIndex: 'op_mode',
                render(op_mode) {
                    return op_mode === 1 ? '自营' : '加盟';
                }
            }, {
                title: '授权加盟商',
                dataIndex: 'franchisee_name'
            }, {
                title: '城市管理员',
                dataIndex: 'city_admins',
                render(arr) {
                    return arr.map((item) => {
                        return item.user_name;
                    }).join(',');
                }
            }, {
                title: '城市开通时间',
                dataIndex: 'open_time'
            }, {
                title: '操作时间',
                dataIndex: 'update_time',
                render: Utils.formateDate
            }, {
                title: '操作人',
                dataIndex: 'sys_user_name'
            }
        ];
        return (
            <div>
                <Card>
                    <FilterForm/>
                </Card>
                <Card>
                    <Button type='primary' onClick={this.handleOpenCity}>开通城市</Button>
                </Card>
                <Card>
                    <div className='content-wrap'>
                        <Table
                            columns={columns} dataSource={this.state.list} pagination={this.state.pagination}
                            rowKey='id' bordered={true}
                        />
                    </div>
                </Card>
                <Modal title="开通城市" visible={this.state.isShowOpenCity}
                       onCancel={() => {
                           this.setState({
                               isShowOpenCity: false
                           })
                       }}
                       onOk={this.handleSubmit}
                >
                    {/*表单的值存放在cityForm中*/}
                    <OpenCityForm wrappedComponentRef={(inst) => {
                        this.cityForm = inst
                    }}/>
                </Modal>
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
                    <FormItem label='用车模式'>
                        {
                            getFieldDecorator('mode')(
                                <Select placeholder='请选择' style={{width: 80}}>
                                    <Option value='1'>全部</Option>
                                    <Option value='2'>指定停车点模式</Option>
                                    <Option value='3'>禁停区模式</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label='运营模式'>
                        {
                            getFieldDecorator('op_mode')(
                                <Select placeholder='请选择' style={{width: 80}}>
                                    <Option value=''>全部</Option>
                                    <Option value='2'>自营</Option>
                                    <Option value='3'>加盟</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label='加盟商授权状态'>
                        {
                            getFieldDecorator('auth_state')(
                                <Select placeholder='请选择' style={{width: 80}}>
                                    <Option value=''>全部</Option>
                                    <Option value='2'>已授权</Option>
                                    <Option value='3'>未授权</Option>
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

class OpenCityForm extends Component {
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        };
        return (
            <div>
                <Form layout="horizontal">
                    <FormItem label="选择城市" {...formItemLayout}>
                        {
                            getFieldDecorator('city_id', {
                                initialValue: '1'
                            })(
                                <Select style={{width: 100}}>
                                    <Option value='1'>深圳</Option>
                                    <Option value='2'>上海</Option>
                                    <Option value='3'>北京</Option>
                                </Select>
                            )
                        }

                    </FormItem>
                    <FormItem label="运营模式" {...formItemLayout}>
                        {
                            getFieldDecorator('op_mode', {
                                initialValue: '1'
                            })(
                                <Select>
                                    <Option value='1'>自营</Option>
                                    <Option value='2'>加盟</Option>
                                </Select>
                            )}
                    </FormItem>
                    <FormItem label="用车模式" {...formItemLayout}>
                        {
                            getFieldDecorator('use_mode', {
                                initialValue: '1'
                            })(
                                <Select>
                                    <Option value='1'>指定停车点</Option>
                                    <Option value='2'>禁停区</Option>
                                </Select>)}
                    </FormItem>
                </Form>
            </div>
        );
    }
}

OpenCityForm = Form.create({})(OpenCityForm);
export default City;
