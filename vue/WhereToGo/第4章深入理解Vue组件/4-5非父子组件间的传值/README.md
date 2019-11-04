# 非父子组件间传值
## 1.Vuex
## 2.总线机制/Bus/发布订阅模式/观察者模式:
+   在Vue的prototype上定义bus属性 `Vue.prototype.bus = new Vue();`这样每个接下来新建的vue组件都会自带bus属性
+   在组件的methods定义的方法里使用 `this.bus.$emit('事件名', value)`; 使用总线上的bus属性向外触发事件并携带value。
+   在组件的mounted生命周期钩子里使用`this.bus.$on('事件名', function(value){});`$on来监听通过bus向外触发的事件并获取携带的值，然后在回调函数里进行操作。
