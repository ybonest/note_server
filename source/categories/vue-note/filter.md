### 介绍
+ Vue.js允许自定义过滤器，用于一些常见的文本格式化
+ 使用场景：双花括号、v-bind表达式

### 全局过滤器
+ 语法：`Vue.filter('过滤器的名称', function(){ /* 对数据进行处理的过程，在这个 function 中，最后必须 return 一个处理的结果 */ })`
+ 使用：`{{<span>{{ dt | 过滤器的名称 }}</span>}}`
+ 注意事项：
    - 如果想拿管道符前面的值，通过 function 的第一个形参来拿
    - 过滤器中，一定要返回一个处理的结果，否则就是一个无效的过滤器
    - 在调用过滤器的时候，直接通过 () 调用就能传参； 从过滤器处理函数的第二个形参开始接收传递过来的参数
    - 可以 多次 使用 | 管道符 一次调用多个过滤器
```
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
```

### 私有过滤器
+ 语法：
```
var vm = new Vue({
  el: '#app',
  data: {},
  filters: {
    过滤器的名称: function(){}
  }
})
```