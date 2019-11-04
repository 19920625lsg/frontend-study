# 第6章 Redux进阶

## 一、UI组件和容器组件

> [代码](todolist-seperate-ui-logic)

+ UI组件负责页面的渲染（傻瓜组件) 示例 [todolist-seperate-ui-logic/src/TodoListUi.js](todolist-seperate-ui-logic/src/TodoListUi.js)
+ 容器组件负责页面的逻辑（聪明组件） 示例 [todolist-seperate-ui-logic/src/TodoList.js](todolist-seperate-ui-logic/src/TodoList.js#L22)

> 把组件拆分成UI组件和容器组件，页面也分开单独写UI

## 二、无状态组件

> 参考代码 [todolist-stateless/src/TodoListUi.js](todolist-stateless/src/TodoListUi.js)

当一个组件只有render函数时，可以用无状态组件代替：

```jsx
const TodoList = (props) => {
return(
   <div></div>
)}
```

如果需要接收父组件的消息就不用写this.props,直接写props代替

```jsx
class TodoList extends Component {
  render() {
      return <div></div>
   }
}
```

+ 无状态组件因为是个函数而不是一个类，也没有生命周期函数，所以性能比较高；
+ 一般用在UI组件上
+ 在无状态组件里写注释直接 `//abcd`

![无状态组件](https://img.mukewang.com/szimg/5c3c6de50001d27f19201080.jpg)

## 三、ajax请求

### 1.[创建actionType](todolist-stateless-ajax/src/store/actionTypes.js#L4)

```javascript
export const INIT_LIST = "init_list";
```

### 2.[在actionCreators中创建action](todolist-stateless-ajax/src/store/actionCreators.js#L17)

```javascript
import { INIT_LIST } from "./actionTypes";
export const initListAction = (data) => ({
    type: INIT_LIST,
    data
});
```

### 3.[dispatch上面创建action](todolist-stateless-ajax/src/TodoList.js#L33)

```javascript
import { initListAction } from "./store/actionCreators";
componentDidMount() {
  // 要想获取"/list.json"只需要把list.json放在public目录下即可
  axios.get('/list.json')
      .then((res) => {
          // 成功地话
          const data = res.data;
          const action = initListAction(data);
          store.dispatch(action);
      })
 }
```

### 4.[在reducer中处理action，更新store中的state](todolist-stateless-ajax/src/store/reducer.js#L35)

```javascript
if (action.type === INIT_LIST) {
     const newState = JSON.parse(JSON.stringify(state));
     newState.list = action.data;
     return newState;
 }
 return state;
```

## 四、redux-thunk

> [官网](https://github.com/reduxjs/redux-thunk)

### 1.原理

1、不使用中间件，store接收的action只能是对象；有了中间件（redux-thunk），action可以是一个函数，通过store.dispatch这个方法将action函数传给store。
2、store接收到action之后发现action是函数而不是对象，则会执行调用这个action函数。
3、action函数内部先进行异步请求获取数据，之后去改变store中的数据（state）。
4、首先内部创建一个action对象，外部action这个函数默认接收store的dispatch方法，因此直接调用dispatch方法将内部action对象传给store，store便可以更新数据

### 2.引入

#### 2.1.要安装redux-thunk

```shell
npm install redux-thunk
```

或者

```shell
yarn add redux-thunk
```

#### 2.2.在store里面引入

> 详细可见[commit](https://github.com/19920625lsg/ReactStudy/commit/25793e4804cb612ca867e7bac23ef04914bf8724#diff-a6a38600a07f6401b0474b3541d0c697)

+ [redux里新增 `applyMiddleware` 和 `compose`](todolist-stateless-ajax-redux-thunk/src/store/index.js#L2)

  ```javascript
  import { createStore, applyMiddleware, compose } from 'redux';
  ```

+ [引入thunk](todolist-stateless-ajax-redux-thunk/src/store/index.js#L3)
  
  ```javascript
  import thunk from 'redux-thunk';
  ```
  
+ [将reducer、redux-devtools、redux-thunk整合进store](todolist-stateless-ajax-redux-thunk/src/store/index.js)

   > 原始代码是这样的：
   
   ```javascript
   // store 相当于图书管理员
   import {createStore} from 'redux'
   // 引入笔记本
   import reducer from "./reducer";

   const store = createStore(
       // 修改store数据第4步：store接收reducer传过来的新state，更新原来的state，完成store的更新
       reducer,
       // 启用chrome里的redux调试工具
       window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
   );

   export default store;
   ```

   > 因为createStore只能接收两个参数(第一个参数是reducer或者多个reducer的聚合，第二个参数是一个中间件或者多个中间件的聚合)，所以这里需要把两个middleware中间件redux-devtools和redux-thunk聚合起来再引入

   ```javascript
   // store 相当于图书管理员
   import {createStore, applyMiddleware, compose} from 'redux'
   import thunk from 'redux-thunk'
   // 引入笔记本
   import reducer from "./reducer";

   const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
   const enhancer = composeEnhancers(
       applyMiddleware(thunk)
   );
   const store = createStore(reducer, enhancer);

   // 原来只用一个中间件的方法
   // const store = createStore(
   //     修改store数据第4步：store接收reducer传过来的新state，更新原来的state，完成store的更新
   //     reducer,
   //     启用chrome里的redux调试工具
   //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
   // );

   export default store;
   ```
   
   如上，就完成了redux-thunk组件的引入，同时支持redux-devtools在chrome里面调试

### 2.3 扩展：同时引入多个reducer和多个中间件middleware的例子

```javascript
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
// 这个组件支持下面这种npm包引入法和宏`window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()`两种使用方式
// 可以参考`第5章Redux入门/README.md#1参考资料`,
// npm包法：https://www.cnblogs.com/zhuzhenwei918/p/7249357.html
// window宏法：https://www.jianshu.com/p/5554935b2306
import { composeWithDevTools } from 'redux-devtools-extension'; 
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';

const history = createHistory();
const middleware = routerMiddleware(history);

const middlewares = [thunk, middleware];

const store = createStore(
  combineReducers({ routing: routerReducer, ...rootReducer }), // 聚合多个reducers
  composeWithDevTools(applyMiddleware(...middlewares)) // 聚合多个middleware中间件
);
```

### 3.使用react-redux实现把ajax请求提取到actionCreators.js里

> 代码见 [todolist-stateless-ajax-redux-thunk](todolist-stateless-ajax-redux-thunk/src)，具体代码变化可以[commit](https://github.com/19920625lsg/ReactStudy/commit/cd487ae792d121076b3874d617aa8679b498abf7#diff-deaa8993f33579aba85e79a77e77de4dL1)

#### 3.1.[在actionCreators.js中添加ajax请求函数](todolist-stateless-ajax-redux-thunk/src/store/actionCreators.js#L23)getTodoList

```javascript
export const getTodoList = () => {
    // 引入redux-thunk后，支持返回函数了
    return (dispatch) => { // 这里的dispatch就是指dispatch()函数
        // 要想获取"/list.json"只需要把list.json放在public目录下即可
        axios.get('/list.json')
            .then((res) => {
                // 成功地话
                const data = res.data;
                const action = initListAction(data); // 获取数据后实际还是得调用对象action去更新store中的数据
                dispatch(action);
            })
    }
};
```

#### 3.2.[在组件中引入上面在actionCreators.js中写的action `getTodoList`](todolist-stateless-ajax-redux-thunk/src/TodoList.js#L8)

> 允许引入新定义的函数形式的action, 这也是redux-thunk引入的意义所在，即把action的类型从只支持js对象类型到支持`对象+函数`

```javascript
import {
    getBtnClickAction,
    getInputChangeAction,
    getItemClickAction,
    getTodoList // 新定义的函数形式的action, 这也是redux-thunk引入的意义所在，即把action的类型从只支持js对象类型到支持`js对象+函数`
} from "./store/actionCreators";
```

#### 3.3.[组件中直接引用函数形式的action `getTodoList` 并dispatch出去]()

```javascript
componentDidMount() {
  const action = getTodoList(); // 可以直接传函数形式的action了
  store.dispatch(action); // dispatch出去后，store检测到是函数形式的action，会自动执行3.2定义的函数形式的action函数
}
```

## 五、redux中间件

参考文章如下：

+ [Redux与它的中间件](https://www.cnblogs.com/vvjiang/p/9505646.html)
+ [深入理解 Redux 中间件](https://www.jianshu.com/p/ae7b5a2f78ae)
+ [浅谈Redux中间件的实践](https://www.jb51.net/article/144558.htm)

> redux中间件指的是action和store中间，是对store的dispatch方法的升级，升级之后既可以接收对象，也可以接收函数

![redux中间件](https://img.mukewang.com/szimg/5b5ef73b0001afe419201080.jpg)

## 六、react-redux

> [代码示例](todolist-react-redux/src)

### 1.原理
> 一定要注意和react和redux名字区分，react-redux用于连接react和redux。react-redux提供了Provider组件，用来绑定store，Provider内部的所有子组件都能够连接store

截图的意思就是，我这个"提供器（provider）"连接了store，那么我这个provider里面的所有组件，都有能力去获取store里面的内容了，也就是说todolist，a，b都有能力去获取组件的

![react-redux的使用](https://img.mukewang.com/szimg/5baaf20600018f4d19201080.jpg)


### 2.在项目入口文件[index.js](todolist-react-redux/src/index.js)中引入

+ 安装
  
  ```shell
  npm install react-redux
  ```
  
  或者
  
  ```shell
  yarn add react-redux
  ```
+ 在项目入口文件index.js中引入

   ```javascript
   import React from 'react';
   import ReactDOM from 'react-dom';
   import TodoList from './TodoList';
   import {Provider} from 'react-redux'; // 第1步：引入
   import store from './store';

   const App = (
       // 第2步：这个store必须写上哦，Provider会把store提供给Provider包含在内的所有元素
       <Provider store={store}>
           <TodoList/>
       </Provider>
   );

   ReactDOM.render(App, document.getElementById('root'));
  ```

### 3.在组件[TodoList.js](todolist-react-redux/src/TodoList.js#L23)中使用

> Provider的子组件通过react-redux中的connect连接store，通过mapStateToProps和mapDispatchToProps把state中的方法和数据映射过来写法：

```javascript
// 映射state和props里对应的值
const mapStateToProps = (state) => {
    // state和props的映射关系
    return {
        inputValue: state.inputValue
    }
};

// 把store.dispatch方法挂载到props上(想要改变store中的内容，然后自动刷新到组件的props中)
// 注意这里还没拆分出actionTypes和actionCreators,后面会优化
const mapDispatchToProps = (dispatch) => {
    return {
        changeInputValue(e) {
            console.log(e.target.value);
            // 修改store数据第1步：创建action并派发action给reducer
            const action = {
                type: 'change_input_value',
                value: e.target.value
            };
            // 派发action给reducer,reducer执行方法更新store的内容(准确说是把新state给store让store自己更新)
            dispatch(action);
        }
    }
};

// connect用于连接store和组件，然后把store中的state和组件中的props通过mapStateToProps的定义进行映射
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
```

+ **mapStateToProps**：store中的数据映射到组件的props中
+ **mapDispatchToProps**：把store.dispatch方法挂载到props上
+ **Component**：Provider中的子组件本身

然后就可以在[TodoList.js](todolist-react-redux/src/TodoList.js#L10)中用this.props.xxx来调用redux的store中的数据和方法了

```jsx
<input value={this.props.inputValue} onChange={this.props.changeInputValue}/>
```

### 4.更多优化

+ [提取actionTypes和actionCreators](todolist-react-redux-more/src)
+ [把ajax提取到actionCreators中(待完成，基于上面一条的代码改)](todolist-react-redux-more-optimize/src),可以参考上前面的[todolist-stateless-ajax-redux-thunk/src](todolist-stateless-ajax-redux-thunk/src)
