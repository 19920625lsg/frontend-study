## Vue中的JS动画
js动画效果，注意事件函数中所传递的参数及某些事件函数返回的函数
+ 1. 进入动画钩子：before-enter(el); enter(el ,done); after-enter(el)
+ 2. 离开动画钩子：before-leave(el); leave(el, done); after-leave(el)
+ 3. 在enter钩子中的函数调用done()告诉VUE js动画完成
+ 4. 使用velocity.js动画库实现动画：Velocity（el，{样式属性}，{duration:1000，complete：done}）
+ 5. 中文文档：http://www.mrfront.com/docs/velocity.js/index.html

## Velocity.js

+ [官网](https://github.com/julianshapiro/velocity)
+ [文档](http://velocityjs.org/)
+ elocity (CDN, choose one of them):: 
```vue
<script src="//cdn.jsdelivr.net/npm/velocity-animate@2.0/velocity.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/velocity/2.0.3/velocity.min.js"></script>
```
+ Velocity UI pack (CDN, choose one of them):
```vue
<script src="//cdn.jsdelivr.net/npm/velocity-animate@2.0/velocity.ui.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/velocity/2.0.3/velocity.ui.min.js"></script>
```
