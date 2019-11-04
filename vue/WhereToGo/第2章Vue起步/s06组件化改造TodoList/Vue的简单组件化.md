+ 1、父组件通过属性向子组件传递值 定义属相v-bind
+ 2、子组件通过props来动态接收参数
+ 3、全局组件
```vue
Vue.component("TodoItem",{
props:['conent']，  //动态接收参数
template："<li>{{content}}</li>"
})
```
4、局部组件
var TodoItem={
props：['content'],
template:"<li>{{content}}</li>"
}

5.：在利用局部组件的时候，要在实例中注册以后才可以调用.
> 格式是 使用名:组件名 两者相同时可以只写一个TodoItem即可
```vue
component：{
// 因为两者名字相同，所以只用TodoItem也可
TodoItem：TodoItem
}
```
