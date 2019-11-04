import React, {Component} from 'react'
import {Card, Button, message} from 'antd'
import './index.less'

class Messages extends Component {
    showMessage = (type) => {
        message[type]("测试下消息是否管用");
    };

    render() {
        return (
            <div>
                <Card title='全局提示框' className='card-wrap-messages'>
                    <Button type='primary' onClick={() => this.showMessage('success')}>Success</Button>
                    <Button type='default' onClick={() => this.showMessage('error')}>Error</Button>
                    <Button type='dashed' onClick={() => this.showMessage('info')}>Info</Button>
                    <Button type='danger' onClick={() => this.showMessage('warning')}>Warning</Button>
                    <Button type='dashed' onClick={() => this.showMessage('warn')}>Warn</Button>
                    <Button type='dashed' onClick={() => this.showMessage('loading')}>Loading</Button>
                </Card>
            </div>
        );
    }
}

export default Messages;
