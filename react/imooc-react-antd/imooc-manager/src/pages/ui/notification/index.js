import React, {Component} from 'react'
import {Card, Button, notification} from 'antd'
import './index.less'

class Notification extends Component {
    openNotification = (type, direction) => {
        if (direction) {
            // 如果有direction这个参数的话
            notification.config({
                // 设置通知组件的方向
                placement: direction
            });
        }
        // notification.success等效于Modal['success'],和modal那一节的使用类似，务必学会
        notification[type]({
            message: '测试下通知组件',
            description: '成功的话就能显示这段内容了！',
        });
    };

    render() {
        return (
            <div>
                <Card title='通知提醒框的不同类型' className='card-wrap-notification'>
                    <Button type='primary' onClick={() => this.openNotification('success')}>Primary</Button>
                    <Button type='default' onClick={() => this.openNotification('info')}>Default</Button>
                    <Button type='dashed' onClick={() => this.openNotification('warn')}>Dashed</Button>
                    <Button type='danger' onClick={() => this.openNotification('error')}>Danger</Button>
                </Card>
                <Card title='通知提醒框的不同位置和方向' className='card-wrap-notification'>
                    <Button type='primary' onClick={() => this.openNotification('success', 'topLeft')}>Primary</Button>
                    <Button type='default' onClick={() => this.openNotification('info', 'topRight')}>Default</Button>
                    <Button type='dashed' onClick={() => this.openNotification('warn', 'bottomLeft')}>Dashed</Button>
                    <Button type='danger' onClick={() => this.openNotification('error', 'bottomRight')}>Danger</Button>
                </Card>
            </div>
        );
    }
}

export default Notification;

