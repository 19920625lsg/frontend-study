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
  },
  // 添加商品到购物车
  addGoodToCart (state, tag) {
    let good = state.cartArr.find(v => v.title === tag.label) // 判断商品是否存在,存在就返回商品对象，不存在返回None
    if (good) {
      // 商品已经存在于购物车，商品数+1
      good.cartCount += 1
    } else {
      // 之前不存在此商品就添加，并把商品数设置为1
      state.cartArr.push({ title: tag.label, cartCount: 1 })
    }
  },
  // 商品数 + 1
  addGood (state, index) {
    state.cartArr[index].cartCount++
  },
  // 商品数 - 1
  delGood (state, index) {
    if (state.cartArr[index].cartCount > 1) {
      state.cartArr[index].cartCount--
    } else {
      if (window.confirm('确定从购物车移除该商品吗?')) {
        state.cartArr.splice(index, 1) // 删除该购物车的对象
      }
    }
  },
  // 清空购物车
  clearCart (state) {
    if (window.confirm('确定要清空购物车吗?')) {
      state.cartArr = []
    }
  }
}
