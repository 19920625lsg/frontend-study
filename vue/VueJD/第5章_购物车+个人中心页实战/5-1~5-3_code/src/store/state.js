let defaultResturantName = '飞歌餐馆'
let defaultToken = ''

try {
  if (localStorage.resturantName) {
    // localstorage中已经有city这个属性，就用localStorage中的。当浏览器刷新是会走到这一步
    defaultResturantName = localStorage.resturantName
  }
} catch (e) {
  console.log(e.message)
}

try {
  if (localStorage.token) {
    // localstorage中已经有city这个属性，就用localStorage中的。当浏览器刷新是会走到这一步
    defaultToken = localStorage.token
  }
} catch (e) {
  console.log(e.message)
}

// 首先声明一个需要全局维护的状态 state,比如 我这里举例的resturantName
export default {
  resturantName: defaultResturantName, // 默认值
  token: defaultToken, // 登录鉴权后得到的token
  cartArr: [] // 购物车全局变量
  // id: xxx  如果还有全局状态也可以在这里添加
  // name:xxx
}
