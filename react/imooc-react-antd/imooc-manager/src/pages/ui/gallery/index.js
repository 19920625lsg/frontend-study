import React, {Component} from 'react';
import {Card, Col, Modal, Row} from "antd";

class Gallery extends Component {
    openGallery = (imgSrc) => {
        this.setState({
            visible: true,
            currentImg: '/gallery/' + imgSrc
        })
    };

    closeImg = () => {
        this.setState({
            visible: false
        })
    };

    componentWillMount() {
        this.setState({
            visible: false
        })
    }

    render() {
        const imgs = [
            ['1.png', '2.png', '3.png'],
            ['2.png', '5.png', '6.png'],
            ['7.png', '8.png', '9.png'],
        ];
        const imgList = imgs.map((list) => list.map((item) =>
            //默认引用的资源都是public目录下的
            <Card cover={<img src={'/gallery/' + item} alt='图片展示'/>} style={{marginBottom: 10}}
                  onClick={() => this.openGallery(item)}>
                <Card.Meta title='React Admin' description='React后台管理系统'/>
            </Card>
        ));
        return (
            <div className='card-wrap-gallery'>
                <Row gutter={10}>
                    <Col md={8}>{imgList[0]}</Col>
                    <Col md={8}>{imgList[1]}</Col>
                    <Col md={8}>{imgList[2]}</Col>
                </Row>
                <Modal width={400} height={600} visible={this.state.visible} onCancel={this.closeImg} footer={null}
                       title='图片画廊'>
                    {<img src={this.state.currentImg} alt="图片展示" style={{width: '100%'}}/>}
                </Modal>
            </div>
        );
    }
}

export default Gallery;
