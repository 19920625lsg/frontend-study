# 第3章 React基础精讲

## 3-1~3-4 响应式设计、事件绑定、增删改查等jsx语法

+ [全部代码](todolist)
+ [关键代码TodoList.js](todolist/src/TodoList.js)

**关键知识点如下：**

+ 1.this.state 负责存储数据
+ 2.jsx中js表达式用{}包裹
+ 3.事件绑定需要通过bind(this)对函数的作用域进行变更
+ 4.在React中绑定事件， 事件的名称必须要用驼峰式，onClick， onChange...和Java函数命名类似的规则
+ 5.不可变性(immutable)：不要直接修改state里的变量，需要拷贝出来后通过修改备份，然后将修改过的备份通过setState方法复制给state来实现修改
  ```javascript
  // 不能直接修改state中的内容，先拷贝一份，修改完后再放回去
  const list = [...this.state.list];
  // 删除下标为index的元素
  list.splice(index, 1);
  this.setState({
      list: list
  });
  ```
  不可改变性有几点好处:
  + (1)简化复杂的功能
  + (2)跟踪数据的改变
  + (3)确定在 React 中何时重新渲染
  + (4)不可变性最主要的优势在于它可以帮助我们在 React 中创建 pure components。我们可以很轻松的确定不可变数据是否发生了改变，从而确定何时对组件进行重新渲染

**语法补充如下：**

+ 1.注释  
  单行
  ```jsx
  # comments in JSX
    { /*comments*/ }
  ```
  多行  
  ```jsx
  {
    // comment
    //  comment
  }
  ```
+ 2.为了使render函数内的dom都被一个元素包住，但是又不想再最外面再套一层div，可以使用Fragment [代码](todolist/src/TodoList.js#L18)
  ```jsx
  // Fragment是占位符，当做最外层div用但是不会在页面显示，从而不影响dom结构
  <Fragment>
    { /* 页面内容 */ }
  </Fragment>
  ```
+ 3.react元素中的class属性会和javascript中的class关键字冲突，需改成className,如下面语句的`className='input'`，类似地，html元素的响应事件也要从纯小写改成驼峰了，比如下面的onChange事件
  ```jsx
  <input id="insertArea" type="text" className='input' value={this.state.inputValue} onChange={this.handleInputChange.bind(this)}/>
  ```
+ 4.如果output不想对变量进行转义的话，那么`<li dangerouslySetInnerHTML={ {__html: VARIABLE} }></li>`，比如下面的**方法2** [代码](todolist/src/TodoList.js#L35)
  ```jsx
  <ul>
      {
          //这种遍历list的方法一定要掌握.index为元素的键值，作为渲染元素的key,是必须的，否则控制台会告警
          this.state.list.map((item, index) => {
              // 写法1：不支持对item内容进行html渲染.index为数组的下标值
              return <li key={index} onClick={this.handleItemDelete.bind(this, index)}>{item}</li>
              // 方法2：可以把input的内容进行渲染(有html标签可以体现出来)
              // return <li key={index} onClick={this.handleItemDelete.bind(this, index)}
              //            dangerouslySetInnerHTML={{__html: item}}></li>
          })
      }
  </ul>
  ```
+ 5.label 中的for要替换成 htmlFor
  ```jsx
  <label htmlFor="insertArea">输入内容:</label>
  ```

## 3-5 组件拆分，主要新增了父子组件间通信的内容

+ [全部代码](todolist_split)
+ [核心代码之父组件TodoList.js](todolist_split/src/TodoList.js)
+ [核心代码之子组件TodoItem.js](todolist_split/src/TodoItem.js)

**知识点如下**
+ 父组件传递变量和方法给子组件 [代码](todolist_split/src/TodoList.js#L46)
  ```jsx
  // 方法4：通过自定义属性来传递值和方法
  // content为自定义属性，可以在子组件中用props.content调用，index类似
  // 同过属性deleteItem把方法传递给子组件，子组件可以通过props.deleteItem调用父类的handleItemDelete
  // 方法了,有点像父类中的方法起了个别名传到了子类中.注意bind(this)是必须地哦
  return <TodoItem content={item} index={index} deleteItem={this.handleItemDelete.bind(this)}/>
  ```
+ 子组件触发父组件的方法deleteItem [代码](todolist_split/src/TodoItem.js#L16)
  ```jsx
  // 子组件调用父组件的方法来删除父组件的内容
  this.props.deleteItem(this.props.index);
  ```

## 3-6 代码优化，主要是优化了bing(this)以及代码的复杂度

+ [全部代码](todolist_split_optimize)
+ [核心代码之父组件TodoList.js](todolist_split_optimize/src/TodoList.js)
+ [核心代码之子组件TodoItem.js](todolist_split_optimize/src/TodoItem.js)

**知识点如下**
+ 1.事件方法的this指向要在constructor里面进行绑定，这样可以优化性能，如：`this.fn = this.fn.bind(this)` [代码](todolist_split_optimize/src/TodoList.js#L15)
  ```jsx
  // 初始化解决this指针问题，下面调用的时候就不用每次都bind了
  this.handleInputChange = this.handleInputChange.bind(this);
  this.handleBtnClick = this.handleBtnClick.bind(this);
  this.handleItemDelete = this.handleItemDelete.bind(this);
  ```
+ 2.setState在新版的react中写成：this.setState(()=>({})) 或 this.setState(()=>{retuen})  第二中写法可以在return前写js逻辑，新版的写法有一个参数prevState，可以代替this.state，同样是可以提高性能
  ```jsx
  prevState代替this.state
  setState((prevState) => ({
     list: prevState.list
  }))
  ```
  代替
  ```jsx
  setState({
      list: this.state.list
  });
  ```
  如果setState里面不光有对象，还有要对对象进行处理的js表达式，就要写成
  ```jsx
  this.setState((prevState) => {
         const list = [...prevState.list];
          list.splice(index, 1);
          return {list}
  })
  ```
+ 3.JSX中的map遍历可以直接定义一个方法后，再在JSX中引用方法 [代码1把jsx中的map遍历代码进行封装](todolist_split_optimize/src/TodoList.js#L76)和[代码2在jsx中直接调用封装的代码](todolist_split_optimize/src/TodoList.js#L34)
  
  
  ```jsx
  render() {
      return (
          // Fragment是占位符，当做最外层div用但是不会在页面显示，从而不影响dom结构
          <Fragment>
              <ul>
                  {/*封装复杂的代码到方法中，使得代码更精简*/}
                  {this.getTodoItem()}
              </ul>
          </Fragment>
      );
  }
  getTodoItem() {
      //这种遍历list的方法一定要掌握.index为元素的键值，作为渲染元素的key,是必须的，否则控制台会告警
      return this.state.list.map((item, index) => {
          // 写法1：不支持对item内容进行html渲染.index为数组的下标值
          // return <li key={index} onClick={this.handleItemDelete.bind(this, index)}>{item}</li>

          // 方法2：可以把input的内容进行渲染(有html标签可以体现出来)
          // return <li key={index} onClick={this.handleItemDelete.bind(this, index)}
          //            dangerouslySetInnerHTML={{__html: item}}></li>

          // 方法3：利用自己封装的子组件，通过父子组件传值来实现待办列表TodoList
          // return <TodoItem/> // 这种写法没有传值，最终渲染出来的都是TodoItem的默认值

          // 方法4：通过自定义属性来传递值和方法
          // content为自定义属性，可以在子组件中用props.content调用，index类似
          // 同过属性deleteItem把方法传递给子组件，子组件可以通过props.deleteItem调用父类的handleItemDelete
          // 方法了,有点像父类中的方法起了个别名传到了子类中.注意bind(this)是必须地哦
          return <TodoItem content={item} index={index} key={index} deleteItem={this.handleItemDelete}/>
      })

  }
  ```

  + 4.利用ES6的解构使代码更简洁 [代码](todolist_split_optimize/src/TodoItem.js#L24)
  
    ```javascript
     handleClick() {
        // 方法1： 子组件调用父组件的方法来删除父组件的内容(this.props形式)
        // this.props.deleteItem(this.props.index);

        // 方法2：通过结构化赋值的方法，简化去掉this.props
        const {deleteItem, index} = this.props;
        deleteItem(index);
    }
    ```


