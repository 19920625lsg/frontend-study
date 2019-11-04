// 模态框
import React, {Component} from 'react'
import {Modal, Card, Button} from 'antd'
import './index.less'

class Modals extends Component {
    state = {
        modal1: false,
        modal2: false,
        modal3: false,
        modal4: false
    };
    handleOpenModal = (modalName) => {
        this.setState({
            //设置modalName对应的变量
            [modalName]: true
        });
    };

    handleConfirm = (modalName) => {
        // modal.confirm()等效于Modal['confirm']
        Modal[modalName]({
            title: '确认',
            content: '你确定你学会React了吗？',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            }
        });
    };

    render() {
        return (
            <div>
                <Card title='基础模态框' className='card-wrap-modal'>
                    {/*传参的时候函数只能这么调用哈 */}
                    <Button type='primary' onClick={() => this.handleOpenModal('modal1')}>打开</Button>
                    <Button type='danger' onClick={() => this.handleOpenModal('modal2')}>自定义页脚</Button>
                    <Button type='default' onClick={() => this.handleOpenModal('modal3')}>顶部20px弹框</Button>
                    <Button type='dashed' onClick={() => this.handleOpenModal('modal4')}>水平垂直居中</Button>
                </Card>
                <Card title='信息确认框' className='card-wrap-modal'>
                    {/*传参的时候函数只能这么调用哈 */}
                    <Button type='danger' onClick={() => this.handleConfirm('info')}>Info</Button>
                    <Button type='default' onClick={() => this.handleConfirm('success')}>Success</Button>
                    <Button type='default' onClick={() => this.handleConfirm('error')}>Error</Button>
                    <Button type='dashed' onClick={() => this.handleConfirm('warning')}>Warning</Button>
                    <Button type='primary' onClick={() => this.handleConfirm('confirm')}>Confirm</Button>
                </Card>
                {/*点击关闭符号x和点击cancel按钮的事件都是这个*/}
                <Modal title='React' visible={this.state.modal1}
                       onCancel={() => {
                           this.setState({
                               modal1: false
                           });
                       }}
                       onOk={() => {
                           this.setState({
                               modal1: false
                           });
                       }}
                >
                    <p>欢迎使用华为后台模板</p>
                </Modal>
                <Modal title='Vue' visible={this.state.modal2} okText='好的' cancelText='算了'
                       onCancel={() => {
                           this.setState({
                               modal2: false
                           });
                       }}
                       onOk={() => {
                           this.setState({
                               modal2: false
                           });
                       }}
                >
                    <p>欢迎使用华为后台模板</p>
                </Modal>
                {/*stye需要配合index.less文件里的modals部分的样式类才可以，默认antd是修改不了距离顶端距离的*/}
                <Modal title='Angular' visible={this.state.modal3} style={{top: 20}}
                       onCancel={() => {
                           this.setState({
                               modal3: false
                           });
                       }}
                       onOk={() => {
                           this.setState({
                               modal3: false
                           });
                       }}
                >
                    <p>欢迎使用华为后台模板</p>
                </Modal>
                <Modal title='San' visible={this.state.modal4} wrapClassName='vertical-center-modal'
                       onCancel={() => {
                           this.setState({
                               modal4: false
                           });
                       }}
                       onOk={() => {
                           this.setState({
                               modal4: false
                           });
                       }}
                >
                    <p>欢迎使用华为后台模板</p>
                </Modal>
            </div>
        );
    }


}

export default Modals;
