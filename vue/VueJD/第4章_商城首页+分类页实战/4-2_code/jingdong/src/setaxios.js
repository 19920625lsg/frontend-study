/**
 * http全局拦截
 * 把token放在我们http请求的header里带给后端
 */

import axios from 'axios'
import store from './store'
import router from './router'

export default function setAxios () {
  // 请求request拦截
  axios.interceptors.request.use(
    config => {
      if (store.state.token) {
        // 如果本地有token就把token放到请求头中
        config.headers.token = store.state.token
      }
      return config
    }
  )

  // 响应response拦截
  axios.interceptors.response.use(
    resp => {
      if (resp.status === 200) {
        const data = resp.data
        if (data.errno === -1) {
          // 接口请求失败

        } else if (data.errno === -2) {
          // 登陆有效期过期
          store.commit('setToken', '') // 清空vuex的token
          localStorage.token = '' // 清空localStorage的token
          router.replace({ path: '/login' }) // 跳转到登陆页
        }
        return data
      }
      return resp
    }
  )
}
