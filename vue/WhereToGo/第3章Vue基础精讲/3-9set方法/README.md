# Vue中的set方法
> vue 提供一个 set 方法，向一个对象中添加数据，当数据改变时，页面也会随之变化。

## 对象
+ 全局模式下的使用方式
```vue
Vue.set(obj, key, value)
```
+ vue 实例下实现
```vue
vue.$set(obj, key, value)
```

## 数组
+ 全局模式下的使用方式
```vue
Vue.set(arr, index, value)
```
+ vue 实例下实现
```vue
vue.$set(arr, index, value)
```
