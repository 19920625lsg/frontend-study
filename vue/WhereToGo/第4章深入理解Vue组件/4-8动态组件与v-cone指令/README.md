+ ①v-if的意思是，如果条件成立则为真。因此先声明v-if="type===child-one"跟v-if="type===child-two"，然后通过修改type的值从而实现v-if语句里的真假转换;
+ ②动态组件:<component is="type">通过is绑定的type的组件名来显示相应的组件
+ ③v-once指令:  有缓存机制，且只渲染元素和组件一次，随后的渲染，使用了此指令的元素/组件及其所有的子节点，都会当作静态内容并跳过，这可以用于优化更新性能。
