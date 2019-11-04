import React, {Component} from 'react'
import {Col, Row} from "antd";
import './index.less'
import Util from '../../util/util'
import myaxios from '../../myaxios'

class Header extends Component {
    componentWillMount() {
        this.setState({
            userName: 'l00379880'
        });
        setInterval(() => {
            let sysTime = Util.formatDate(new Date().getTime());
            this.setState({
                sysTime
            });
        }, 1000);
        this.getWeatherAPIData('上海');
    }

    getWeatherAPIData(city) {
        myaxios.jsonp({
            // 获取上海地区的天气，里面的key是用地老师地
            url: 'http://api.map.baidu.com/telematics/v3/weather?output=json&ak=3p49MVra6urFRGOT9s8UBWr2&callback=getTodayWeather&location=' + encodeURIComponent(city)
        }).then((res) => {
            if (res.status === 'success') {
                let todayData = res.results[0].weather_data[0];
                this.setState({
                    dayPictureUrl: todayData.dayPictureUrl,
                    weather: todayData.weather + " " + todayData.wind + " 气温" + todayData.temperature
                });
            }
        });
    }

    render() {
        return (
            <div className='header'>
                <Row className='header-top'>
                    <Col span={24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a href="http://www.baidu.com">退出</a>
                    </Col>
                </Row>
                <Row className='breadcrumb'>
                    <Col span={4} className='breadcrumb-title'>
                        首页
                    </Col>
                    <Col span={20} className='weather'>
                        <span className='date'>{this.state.sysTime}</span>
                        <span className='weather-img'>
                            <img src={this.state.dayPictureUrl} alt=""/>
                        </span>
                        <span className='weather-detail'>
                            {this.state.weather}
                        </span>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Header;
