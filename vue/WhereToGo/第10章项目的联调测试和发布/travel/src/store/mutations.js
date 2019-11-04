export default {
  /**
   * 接收actions中commit过来的changeCity事件，来改变state中的city值
   * @param state
   * @param city
   */
  changeCity (state, city) {
    state.city = city
    try {
      localStorage.city = city
    } catch (e) {
      console.log(e.message)
    }
  }
}
