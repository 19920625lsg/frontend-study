import React, {Component} from 'react';
import {Card, Carousel} from 'antd'
import './index.less'

class Carousels extends Component {
    render() {
        return (
            <div>
                <Card title='文字轮播' className='txt-slider'>
                    <Carousel autoplay={true} easing='linear' effect='fade'>
                        <div>
                            <h3>Ant Angular</h3>
                        </div>
                        <div>
                            <h3>Angular React</h3>
                        </div>
                        <div>
                            <h3>Ant Vue</h3>
                        </div>
                    </Carousel>
                </Card>
                <Card title='图片轮播' className='img-slider' style={{marginTop: '10px'}}>
                    <Carousel autoplay={true}>
                        <div>
                            <img src="/carousel-img/carousel-1.jpg" alt=""/>
                        </div>
                        <div>
                            <img src="/carousel-img/carousel-2.jpg" alt=""/>
                        </div>
                        <div>
                            <img src="/carousel-img/carousel-3.jpg" alt=""/>
                        </div>
                    </Carousel>
                </Card>
            </div>
        );
    }
}

export default Carousels;
