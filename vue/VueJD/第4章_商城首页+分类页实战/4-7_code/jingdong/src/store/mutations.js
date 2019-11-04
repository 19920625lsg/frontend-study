// 提交 mutations是更改Vuex状态的唯一合法方法
export default {

  modifyAName (state, name) {
    state.resturantName = name // A组件点击更改餐馆名称为 A餐馆
    localStorage.resturantName = name // 更新localStorage中的值
  },
  modifyBName (state, name) { // B组件点击更改餐馆名称为 B餐馆
    state.resturantName = name
    localStorage.resturantName = name // 更新localStorage中的值
  },
  setToken (state, token) { // 设置登录用户的token
    state.token = token
    localStorage.token = token
  }
}
