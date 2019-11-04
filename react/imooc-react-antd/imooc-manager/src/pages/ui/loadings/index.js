import React, {Component} from 'react'
import {Card, Spin, Icon, Alert} from 'antd'
import './index.less'

class Loadings extends Component {
    render() {
        const icon = <Icon type='loading' style={{fontSize: 24}}/>;
        return (
            <div>
                <Card title='Spin用法' className='card-wrap-loading'>
                    <Spin size='small'/>
                    <Spin style={{margin: '0 10px'}}/>
                    <Spin size='large'/>
                    {/*可以自己设置图标类型*/}
                    <Spin indicator={icon} style={{marginLeft: '10px'}}/>
                </Card>
                <Card title='内容遮罩'>
                    <Alert message='React' description='欢迎学习React实战课程' type={'info'}/>
                    <Alert message='React' description='欢迎学习React实战课程' type={'warning'}/>
                    <Alert message='React' description='欢迎学习React实战课程' type={'success'}/>
                    {/*组件元素上面加蒙版，制造延时加载效果*/}
                    <Spin>
                        <Alert message='React' description='欢迎学习React实战课程' type={'success'}/>
                    </Spin>
                    <Spin tip='加载中......'>
                        <Alert message='React' description='欢迎学习React实战课程' type={'success'}/>
                    </Spin>
                    <Spin tip='加载中......' indicator={icon}>
                        <Alert message='React' description='欢迎学习React实战课程' type={'success'}/>
                    </Spin>
                </Card>
            </div>
        );
    }
}

export default Loadings;
