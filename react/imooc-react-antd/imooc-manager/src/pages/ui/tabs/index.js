import React, {Component} from 'react'
import {Card, Tabs, message, Icon} from 'antd'
import './index.less'

const TabPane = Tabs.TabPane;

class MyTabs extends Component {
    handleChange = (key) => {
        message.info("您选择了标签：" + key);
    };
    /*设置当前活动的tab*/
    onChange = (activeKey) => {
        this.setState({
            activeKey
        })
    };

    /*tab标签的回调函数*/
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };
    add = () => {
        const panels = this.state.panels;
        const activeKey = `newTab${this.newTabIndex++}`;
        panels.push({title: activeKey, content: 'Content of new Tab', key: activeKey});
        this.setState({panels, activeKey});
    };

    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panels.forEach((panel, i) => {
            if (panel.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panels = this.state.panels.filter(panel => panel.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panels[lastIndex].key;
        }
        this.setState({panels, activeKey});
    };

    componentWillMount() {
        this.newTabIndex = 0;
        const panels = [
            {
                title: 'Tab 1',
                content: '学习Vue',
                key: '1',
                closable: false
            },
            {
                title: 'Tab 2',
                content: '学习Angular',
                key: '2'
            },
            {
                title: 'Tab 3',
                content: '学习React',
                key: '3'
            }
        ];
        this.setState({
            activeKey: panels[0].key,
            panels
        })
    }

    render() {
        return (
            <div>
                <Card title='Tab选项卡' className='card-wrap-tabs'>
                    <Tabs defaultActiveKey='1' onChange={this.handleChange}>
                        <TabPane tab='Tab 1' key='1'>学习Vue</TabPane>
                        <TabPane tab='Tab 2' key='2' disabled>学习Angular</TabPane>
                        <TabPane tab='Tab 3' key='3'>学习React</TabPane>
                    </Tabs>
                </Card>
                <Card title='Tab选项卡带图标' className='card-wrap-tabs'>
                    <Tabs defaultActiveKey='1' onChange={this.handleChange}>
                        <TabPane tab={<span><Icon type='plus'/>Tab1</span>} key='1'>学习Vue</TabPane>
                        <TabPane tab={<span><Icon type='edit'/>Tab1</span>} key='2'>学习Angular</TabPane>
                        <TabPane tab={<span><Icon type='delete'/>Tab1</span>} key='3'>学习React</TabPane>
                    </Tabs>
                </Card>
                <Card title='Tab选项卡动态增减' className='card-wrap-tabs'>
                    <Tabs defaultActiveKey='1' onChange={this.handleChange}>
                        {
                            this.state.panels.map((panel) => {
                                return <TabPane tab={panel.title} key={panel.key}>{panel.content}</TabPane>
                            })
                        }
                    </Tabs>
                </Card>
                <Card title='可编辑卡片' className='card-wrap-tabs'>
                    {/*Tab类型必须指定为editable-card然后TabPane的closable属性才会生效*/}
                    <Tabs activeKey={this.state.activeKey} onChange={this.onChange} type='editable-card'
                          onEdit={this.onEdit}>
                        {
                            this.state.panels.map((panel) => {
                                return <TabPane tab={panel.title} key={panel.key}
                                                closable={panel.closable}>{panel.content}</TabPane>
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        );
    }
}

export default MyTabs;
