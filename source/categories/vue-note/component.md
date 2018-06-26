### 组件
  组件是Vue最强大的功能之一，它可以扩展HTML元素，封装可重用的代码

### 组件之全局注册
+ 用法
```
Vue.component('my-component',{
  template:"<h1>这里是组件模版</h1>"
})
```

+ 注册后，便可以作为自定义元素<my-component></my-component>使用
```
<div id="example">
  <my-component></my-component>
</div>
```

+ 经渲染后页面成为:
```
<div id="example">
  <h1>这里是组件模版</h1>
</div>
```

### 局部注册
+ 在Vue实例内部创建局部组件
```
var child = {
  template:"<div>A custom component</div>"
}
new Vue({
  components:{
    'my-component':child
  }
})
```

### 模版解析注意事项
+ 在使用组件时有时会受到HTMT本身的一些限制，比如像`<ul>、<ol>、<table>、<select>`这样的元素里允许包含的元素有限制，而另一些像`<option>`这样的元素只能出现在某些特定元素的内部

例：如下自定义组件将被当做无效内容,从而导致了一些错误的渲染--[链接](https://ybonest.github.io/vue-note/html/myrow.html)
```
<table>
  <my-row></my-row>
</table>
```

在这种情况下可以使用`is`特性
```
<table>
  <tr is="my-row"></tr>
</table>
```

### 组件中的data必须是函数
```
Vue.component('simple-counter', {
  template: '<button v-on:click="counter += 1">{{ counter }}</button>',
  data: function () {
    return { counter: 0 }
  }
})
new Vue({
  el: '#example-2'
})
```

> 组件中除data之外，还拥有Vue实例的其他属性

  实例[链接](https://ybonest.github.io/vue-note/html/component.html)
  ```
  Vue.component('mycom', {
      template: '<div><h1 @click="showMsg">{{ msg }}</h1><h1>12345</h1></div>',
      data: function () {
        return {
          msg: '这是组件的数据'
        }
      },
      created() {   //钩子函数
        this.test()
      },
      methods: {
        showMsg() {
          console.log(this.msg)
        },
        test() {
          console.log('测试组件能否有自己的生命周期函数')
        }
      }
    })

    var vm = new Vue({
      el: '#app',
      data: {
        info: '123'
      },
      methods: {}
    });
  ```

  ### 组件组合

  组件设计的初衷就是配合使用，其中最常见的就是父子组件的关系，两者之间必然存在通信，Vue中使用prop由父组件传递数据给子组件，又通过事件绑定方式使子组件信息可以反馈给父组件
1. Prop
  + 父组件使用prop传递数据给子组件，通过v-bind在组件上绑定一个自定义属性并将需要传递的参数赋值于它。

  + 通过v-on或简写形式@将方法传递给子组件,例`@my="myFnHas"`
  
      本例详细了展示了，父子组件的传递关系[(链接)](https://ybonest.github.io/vue-note/html/prop.html)

      ```
      <div id="app">
        <my-con :msg="message" :arr="arr" :obj="obj" @fn="myFn" @my="myFnHas"></my-con>
      </div>
      <script>
        Vue.component("myCon",{
          template:`<div>
            <h1>父元素传来的message:{{ msg }}</h1>
            <ul>
              <li v-for="item in arr">{{ item }}</li>
            </ul>
            <table>
              <tr v-for="(ele,key) in obj">
                <td>{{ key }}</td>
                <td>{{ ele }}</td>
              </tr>
            </table>
            <button @click="mySubFn">点击我触发父元素传递来的无参函数</button>
            <button @click="mySubFnHas">点击我触发父元素传递来的有参函数</button>
          </div>`,
          props:["msg","arr","obj"],  //此处接受了父组件传来的字符串，数组和对象
          methods:{
            mySubFn(){
              this.$emit('fn')  //接受并触发父元素传递的函数
            },
            mySubFnHas(){
              console.log("zi");
              this.$emit('my','我是子元素传递来的')  //触发父元素传递的函数
            }
          }
        })
        var vm = new Vue({
          el:"#app",
          data:{
            message:"这里是父元素内容",
            arr:['one','two','three'],
            obj:{
              name:'bobo',
              age:'18'
            },
            subData:""
          },
          methods:{
            myFn(){
              document.write('父元素方法打印,无参');
            },
            myFnHas(arg){
              console.log("fu")
              document.write('父元素方法打印：'+arg);
              this.subData = arg;  //接受子元素传来的参数
            }
          }
        })
      </script>
      ```

  + 使用this可以访问props中的父组件传来的信息
  ```
  props: ['size'],
  computed: {
    normalizedSize: function () {
      return this.size.trim().toLowerCase()
    }
  }
  ```

  + 实例[(链接)](https://ybonest.github.io/vue-note/html/dataprops.html)
  ```
  <div id="app">
    <mycom :pinfo="info"></mycom>
  </div>
  <script>
    Vue.component('mycom', {
      template: `<div>
        <p @click="msg='data上的msg被修改了'">** 私有的 data 数据：</p>
        <h3>{{ msg }}</h3>
        <hr/>
        <p @click="infoFromParent='props数据被修改了'">** 外界传递过来的 props 数据：</p>
        <h3>{{ infoFromParent }}</h3>
      </div>`,
      data() {
        return {
          msg: '123',
          infoFromParent: this.pinfo
        }
      },
      props: ['pinfo']
    })

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        info: '父节点的数据'
      },
      methods: {}
    });
  </script>
  ```


