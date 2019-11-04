# 作用域插槽
## 作用域插槽的使用场景:
> 子组件循环并且DOM是从父组件传入的时候，或者说，同一个组件在不同地方使用，需要展现不同的样子。

## 注意事项：
>   作用域插槽必须用<template>包裹，同时 必须定义slot-scope=‘props’来接受子组件传来插槽的值


## **but**
在 2.5.0+，slot-scope 能被用在任意元素或组件中而不再局限于 <template>。
[issue连接](https://cn.vuejs.org/v2/guide/components.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD)
