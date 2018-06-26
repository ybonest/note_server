### 计算属性
基础用法
```
<div id="app">
  <p>Original message:"{{message}}"</p>
  <p>Computed reversed message:"{{ reversedMessage }}"</p>
</div>
<script>
  var vm = new Vue({
    el:"#app",
    data:{
      message:"hello"
    },
    computed:{
      reversedMessage:function(){
        return this.message.split('').reverse().join('');
      }
    }
  })
</script>
```

代码展示以及[链接](https://ybonest.github.io/vue-note/html/computed.html)
<iframe style="overflow:hidden;height:150px;width:100%" class="yboflag" src="html/computed.html"></iframe>

### 属性侦听
Vue 提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：侦听属性

+ 基础用法

```
  <div id="app">
    <input type="text" v-model="data1">
    <input type="button" value="修改data2对象的值" @click="changData2">
    <!-- 此处由于仅仅改变对象属性的值，而且对于的数值监听中并未添加deep:true所以无法触发监听函数 -->
    <input type="button" value="修改data2对象属性的值" @click="changeData2Attr">
    <input type="button" value="修改data3对象属性值，并添加深度监听属性" @click="changeData3Attr">
    <p>data1：{{data1}}</p>
    <p>{{NewVal}}</p>
    <p>{{OldVal}}</p>
  </div>
  <script>
    var vm = new Vue({
      el: "#app",
      data: {
        data1: '1',
        data2: { key1: "one", key2: "two" },
        data3: { key1: "deep" },
        NewVal: "",
        OldVal: "",
      },
      methods: {
        changData2() {
          this.data2 = { key1: "two", key2: "one" }; //data2重新赋值
        },
        changeData2Attr() {
          this.data2.key1 = "three";  //仅修改data2的属性值
        },
        changeData3Attr() {
          this.data3.key1 = "bobo";
        }
      },
      watch: { //watch监听数据，当对应数值发生变化，函数调用被
        data1: {
          handler: function (newVal, oldVal) {
            this.newVal = 'data1的数据发生改变了,最新的值为：' + newVal + ';旧值为:' + oldVal
            console.log('data1的数据发生改变了,最新的值为：' + newVal + ';旧值为:' + oldVal);
          }
        },
        data2: function (newVal, oldVal) {
          console.log("data2 的数据发生了改变");
          this.NewVal = 'data2 newVal:' + newVal.key1 + '-' + newVal.key2;
          this.OldVal = 'data2 oldVal:' + oldVal.key1 + '-' + oldVal.key2;
          console.log('newVal:' + newVal.key1 + '-' + newVal.key2)
          console.log('oldVal:' + oldVal.key1 + '-' + oldVal.key2)
        },
        data3: {
          handler: function (newVal, oldVal) {
            console.log("深度监听,仅改变属性");
            //此处旧值与新值相等，因为在变异（不是替换）对象或数组时，旧值将与新值相同，因为它们的引用指向
            //同一个对象/数组
            this.NewVal = 'data3 newVal:' + newVal.key1;
            this.OldVal = 'data3 oldVal:' + oldVal.key1;
            console.log("data3新:" + newVal.key1);
            console.log("data3旧:" + oldVal.key1);
          },
          deep: true //deep表示深度监听
        }
      }
    })
  </script>
```

代码展示以及[链接](https://ybonest.github.io/vue-note/html/watch1.html)
<iframe style="overflow:hidden;height:150px;width:100%" class="yboflag" src="html/watch1.html"></iframe>

+ 监听路由

```
<div id="app">
    <router-link to="/home">home</router-link>
    <router-link to="/movie">movie</router-link>
    <router-link to="/about">about</router-link>
    <router-view></router-view>
    <hr>
    {{ msg }}
  </div>
  <script>
    var home = {
      template:'<h1>home</h1>'
    }
    var movie = {
      template:'<h1>movie</h1>'
    }
    var about = {
      template:'<h1>about</h1>'
    }

    var router = new VueRouter({
      routes:[
        {path:'/home',component:home},
        {path:'/movie',component:movie},
        {path:'/about',component:about}
      ]
    })
    var vm = new Vue({
      el:"#app",
      data:{
        msg:""
      },
      router,
      created(){
        console.log(this.$route);
      },
      watch:{
        '$route.path':function(newVal,oldVal){
          switch(newVal){
            case '/home':
            this.msg = '欢迎访问首页';
            break;
            case '/movie':
            this.msg = '欢迎访问电影页面';
            break;
            case '/about':
            this.msg = "欢迎访问关于页面";
            break;
          }
        }
      }
    })
  </script>
```

代码展示以及[链接](https://ybonest.github.io/vue-note/html/watch2.html)
<iframe style="overflow:hidden;height:150px;width:100%" class="yboflag" src="html/watch2.html"></iframe>

+ 开发中有时候需要进入页面时自动触发一次监听，此时可以设置`immediate: true`

```
// 该回调将会在侦听开始之后被立即调用
d: {
    handler: function (val, oldVal) { /* ... */ },
    immediate: true
  },
```

+ deep:true 深度监听，默认情况下监听不会监听对象中某个属性值的变化，但是当设置deep:true后，则可以监听对象属性值的变化

```
c: {
    handler: function (val, oldVal) { /* ... */ },
    deep: true
  },
```