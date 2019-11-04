# react-redux的使用

## 初步整合
+  Provider的子组件通过react-redux中的connect连接store，写法：
`connect(mapStateToProps, mapDispatchToProps)(Component)`
    + **mapStateToProps**：store中的数据映射到组件的props中；
    + **mapDispatchToProps**：把store.dispatch方法挂载到props上；
    + **Component**：Provider中的子组件本身；
