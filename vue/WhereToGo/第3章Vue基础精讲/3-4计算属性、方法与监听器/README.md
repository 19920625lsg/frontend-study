#计算属性与方法
> 计算属性和方法不能同名哦！前者调用的时候不用加括号，后者需要
```vue
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <title>计算属性、方法与监听器</title>
</head>
<body>
<div id="app">
    <!--1.computed计算属性调用-->
    {{fullName}}
    <!--2.methods中的方法调用-->
    {{fullName2()}}
</div>
<script>
    // vue实例中的内容都用vm.$访问, 比如vm.$el,vm.$data等
    let vm = new Vue({
        el: '#app',
        data: {
            firstName: 'Dell',
            lastName: 'Lee'
        },
        // 1.计算属性
        computed: {
            // 计算属性必须这么写
            fullName: function () {
                return this.firstName + " " + this.lastName;
            }
        },
        // 2.方法
        methods: {
            // 方法可以这么写也可以和上面的计算属性一样写.注意不要和计算属性中的属性同名
            fullName2() {
                return this.firstName + " " + this.lastName;
            }
        }
    });
</script>
</body>
</html>

```
