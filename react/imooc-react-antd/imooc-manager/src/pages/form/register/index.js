import React, {Component} from 'react';
import {
    Form,
    Input,
    Radio,
    Select,
    Switch,
    DatePicker,
    Card,
    Icon,
    InputNumber,
    TimePicker, Upload, Checkbox, Button, message
} from 'antd'
import './index.less'
import moment from "moment";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class RegisterForm extends Component {

    state = {};
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.当用地自己的地址的时候不用getBase64直接返回图片URL即可
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                avatar: imageUrl,
                loading: false,
            }));
        }
    };
    // 表单提交事件
    handleSubmit = () => {
        // 获取表单各项的值
        let userInfo = this.props.form.getFieldsValue();
        console.log(JSON.stringify(userInfo));
        message.success(`用户 ${userInfo.username} 校验成功！当前密码为：${userInfo.password}`);
    };

    render() {
        // 大括号一定不要漏加，这个是解构的作用
        const {getFieldDecorator} = this.props.form;
        // 网页布局
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 12
            }
        };
        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    span: 12,
                    // 指定偏移
                    offset: 4
                }
            }
        };
        return (
            <div>
                <Card title="注册表单">
                    <Form layout='horizontal'>
                        <FormItem label='用户名' {...formItemLayout}>
                            {
                                getFieldDecorator('username', {
                                    initialValue: 'Jack',
                                    rules: [
                                        {
                                            required: true,
                                            message: '用户名不能为空'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type='user'/>} placeholder='请输入用户名'/>
                                )
                            }
                        </FormItem>
                        <FormItem label='密码' {...formItemLayout}>
                            {
                                getFieldDecorator('password', {
                                    initialValue: 'admin123',
                                    rules: []
                                })(
                                    <Input type='password' prefix={<Icon type='lock'/>} placeholder='请输入密码'/>
                                )
                            }

                        </FormItem>
                        <FormItem label='性别' {...formItemLayout}>
                            {
                                getFieldDecorator('sex', {
                                    initialValue: '1',
                                })(
                                    <RadioGroup>
                                        <Radio value='1'>男</Radio>
                                        <Radio value='2'>女</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem label='年龄' {...formItemLayout}>
                            {
                                getFieldDecorator('age', {
                                    initialValue: 18
                                })(
                                    <InputNumber/>
                                )
                            }
                        </FormItem>
                        <FormItem label='当前状态' {...formItemLayout}>
                            {
                                getFieldDecorator('state', {
                                    initialValue: '1'
                                })(
                                    <Select>
                                        <Option value='1'>咸鱼</Option>
                                        <Option value='2'>奋斗者</Option>
                                        <Option value='3'>创业者</Option>
                                        <Option value='4'>工程师</Option>
                                        <Option value='5'>销售</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label='爱好(多选)' {...formItemLayout}>
                            {
                                getFieldDecorator('favorite', {
                                    initialValue: ['1', '3', '4']
                                })(
                                    <Select mode='multiple'>
                                        <Option value='1'>看书</Option>
                                        <Option value='2'>跑步</Option>
                                        <Option value='3'>写代码</Option>
                                        <Option value='4'>踢足球</Option>
                                        <Option value='5'>玩游戏</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label='已婚' {...formItemLayout}>
                            {
                                getFieldDecorator('marry', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                    <Switch/>
                                )
                            }
                        </FormItem>
                        <FormItem label='生日' {...formItemLayout}>
                            {
                                getFieldDecorator('birthday', {
                                    initialValue: moment('1992-06-25 14:32:56', 'YYYY-MM-DD HH:mm:ss')
                                })(
                                    // 也可以用 YYYY-MM-DD HH:mm:ss
                                    <DatePicker showTime format='YYYY-MM-DD HH:mm:ss'/>
                                )
                            }
                        </FormItem>
                        <FormItem label='联系地址' {...formItemLayout}>
                            {
                                getFieldDecorator('address', {
                                    initialValue: '山东省德州市德城区抬头寺乡渠庄'
                                })(
                                    <TextArea autosize={
                                        {
                                            minRows: 4,
                                            maxRows: 6
                                        }
                                    }/>
                                )
                            }
                        </FormItem>
                        <FormItem label='早起时间' {...formItemLayout}>
                            {
                                getFieldDecorator('time', {
                                    initialValue: moment('14:32:56', 'HH:mm:ss')
                                })(
                                    <TimePicker/>
                                )
                            }
                        </FormItem>
                        <FormItem label='头像' {...formItemLayout}>
                            {
                                getFieldDecorator('avatar')(
                                    <Upload listType='picture-card' showUploadList={false}
                                        // 这个URL是网上第三方提供的服务，实际使用的时候需要换成自己的地址
                                            action='//jsonplaceholder.typicode.com/posts/'
                                            onChange={this.handleChange}>
                                        {this.state.avatar ? <img src={this.state.avatar} alt=""/> :
                                            <Icon type='plus'/>}
                                    </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('license')(
                                    <Checkbox>我已阅读<a href='http://www.huawei.com' target='_blank'
                                                     rel='noopener noreferrer'>奋斗者协议</a></Checkbox>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Button type='primary' onClick={this.handleSubmit}>注册</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Form.create()(RegisterForm);

