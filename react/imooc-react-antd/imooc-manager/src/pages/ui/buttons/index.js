import React, {Component} from 'react';
import {Card, Button, Radio} from 'antd'
import './index.less'

class Buttons extends Component {
    state = {
        loading: true
    };
    handleToggleLoading = () => {
        let loading = !this.state.loading;
        this.setState({
            loading: loading,
            size: 'default'
        });
    };

    handleChange = (e) => {
        this.setState({
            size: e.target.value
        });
    };

    render() {
        return (
            <div>
                <Card title="基础按钮" className='card-wrap-button'>
                    <Button type="primary">Huawei</Button>
                    <Button>Huawei</Button>
                    <Button type='dashed'>Huawei</Button>
                    <Button type='danger'>Huawei</Button>
                    <Button disabled>Huawei</Button>
                </Card>
                <Card title="图形按钮" className='card-wrap-button'>
                    <Button icon='plus'>新建</Button>
                    <Button icon='edit'>编辑</Button>
                    <Button icon='delete'>删除</Button>
                    <Button icon='search' shape='circle'></Button>
                    <Button type='primary' icon='search'>搜索</Button>
                    <Button type='primary' icon='download'>下载</Button>
                </Card>
                <Card title="加载按钮" className='card-wrap-button'>
                    <Button type='primary' loading={this.state.loading}>确定</Button>
                    <Button type='primary' loading={this.state.loading} shape='circle'></Button>
                    <Button loading={this.state.loading}>点击加载</Button>
                    <Button loading={this.state.loading} shape='circle'></Button>
                    <Button type='primary' onClick={this.handleToggleLoading}>加载取反</Button>
                </Card>
                <Card title='按钮组' style={{marginBottom: '10px'}}>
                    <Button.Group>
                        <Button type='primary' icon='left'>返回</Button>
                        <Button type='primary' icon='right'>前进</Button>
                    </Button.Group>
                </Card>
                <Card title='按妞尺寸' className='card-wrap-button'>
                    <Radio.Group value={this.state.size} onChange={this.handleChange}>
                        <Radio value='small'>小</Radio>
                        <Radio value='default'>中</Radio>
                        <Radio value='large'>大</Radio>
                    </Radio.Group>
                    <Button type='primary' size={this.state.size}>Huawei</Button>
                    <Button type='default' size={this.state.size}>Huawei</Button>
                    <Button type='dashed' size={this.state.size}>Huawei</Button>
                    <Button type='danger' size={this.state.size}>Huawei</Button>
                </Card>
            </div>
        );
    }
}

export default Buttons;
