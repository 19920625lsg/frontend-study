import React, {Component} from 'react'
import {Col, Row} from "antd";
//默认会引入目录下的index.js
import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import NavLeft from "../../components/NavLeft/index";
import '../../style/common.less'

class Admin extends Component {
    render() {
        return (
            <Row className='container'>
                <Col span={4} className='nav-left'>
                    <NavLeft/>
                </Col>
                <Col span={20} className='main'>
                    <Header/>
                    <Row className='content'>
                        {this.props.children}
                    </Row>
                    <Footer/>
                </Col>
            </Row>
        );
    }
}

export default Admin;
