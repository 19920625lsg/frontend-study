import React, {Component} from 'react';
import {Button, Card} from "antd";
import ETable from "../../components/ETable";

class Permission extends Component {
    state = {};

    render() {
        return (

            <div>
                <Card title="权限管理">
                    <Button type="primary">添加用户</Button>
                    <Button type="primary" style={{marginLeft: 5}}>设置权限</Button>
                    <Button type="primary" style={{marginLeft: 5}}>用户授权</Button>
                </Card>
                <div className="content-wrap">
                    <ETable/>
                </div>
            </div>
        );
    }
}

export default Permission;
