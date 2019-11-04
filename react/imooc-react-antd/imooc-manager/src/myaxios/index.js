import JsonP from 'jsonp'
import axios from "axios";
import {Modal} from 'antd'

// 替axios支持跨域功能
class MyAxios {
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                param: 'callback'
            }, function (err, response) {
                // todo
                if (response.status === 'success') {
                    resolve(response);
                } else {
                    reject(response.message);
                }
            })
        })
    }

    static ajax(options) {
        let loading;
        if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        let baseURL = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseURL,
                timeout: 5000,
                params: (options.data && options.data.params) || ''
            }).then((response) => {
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if (response.status === 200) {
                    let res = response.data;
                    if (res.code === '0' || res.code === 0) {
                        // 抛出数据
                        console.log(res);
                        resolve(res);
                    } else {
                        console.log(res);
                        Modal.info({
                            title: '提示',
                            content: res.msg
                        });
                    }
                } else {
                    // 抛出异常
                    reject(response.data);
                }
            });
        });
    }
}

export default MyAxios;
