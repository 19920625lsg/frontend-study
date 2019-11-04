# vue 实例的生命周期函数(也称钩子函数)
> 定义：生命周期函数就是vue实例在某一个时间点会自动执行的函数

+ `beforeCreate`：在实例部分初始化完成之后
+ `created`：在完成外部的注入等初始化之后
+ `beforeMount`：在页面渲染之前自动执行
+ `mounted`： 在页面渲染之后自动执行 如：内容显示以后
> **首次加载页面时，不会走下面这两个钩子，只有当数据改变的时才会触发**
+ `beforeUpdate`：数据改变，还没有重新渲染到页面之前
+ `updated`：渲染数据完成之后自动执行
> ** 执行销毁vm.$destroy（）触发的函数**
+ `beforeDestroy`：实例销毁之前执行
+ `destroyed`：实例销毁之后执行

![Vue的生命周期](lifecycle.png)
