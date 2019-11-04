import React, {Component} from 'react';
import {Button, Card, Checkbox, Form, Icon, Input, message} from "antd";

const FormItem = Form.Item;

class LoginForm extends Component {
    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                message.success(`用户 ${userInfo.username} 校验成功！当前密码为：${userInfo.password}`);
            }
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Card title='登录行内(内联)表单'>
                    <Form layout='inline'>
                        <FormItem>
                            <Input placeholder='请输入用户名'/>
                        </FormItem>
                        <FormItem>
                            <Input placeholder='请输入密码'/>
                        </FormItem>
                        <FormItem>
                            <Button type='primary'>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title='登录水平表单' style={{marginTop: 10}}>
                    <Form style={{maxWidth: '300px'}}>
                        <FormItem>
                            {
                                getFieldDecorator('username', {
                                    initialValue: 'Jack',
                                    rules: [
                                        {
                                            required: true,
                                            message: '用户名不能为空'
                                        },
                                        {
                                            min: 5,
                                            max: 10,
                                            message: '长度不在5~10范围内'
                                        },
                                        {
                                            // 正则匹配，功能：必须以字幕开头
                                            pattern: /^\w+$/g,
                                            message: '用户名只能包含字母和数字'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type='user'/>} placeholder='请输入用户名'/>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('password', {
                                    initialValue: 'admin123',
                                    rules: []
                                })(
                                    <Input prefix={<Icon type='lock'/>} placeholder='请输入密码'/>
                                )
                            }

                        </FormItem>
                        <FormItem>
                            <Button type='primary' style={{width: '100%'}} onClick={this.handleSubmit}>登录</Button>
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    // 默认选中
                                    initialValue: true
                                })(
                                    <Checkbox>记住密码</Checkbox>
                                )
                            }
                            <a href="http://www.huawei.com" style={{float: 'right'}}>忘记密码</a>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Form.create()(LoginForm);
