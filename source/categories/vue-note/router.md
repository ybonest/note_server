------------**路由部分主要参考官方文档，详细内容请查看[链接](https://router.vuejs.org/zh-cn/)**
### SPA单页应用
+ SPA:SPA英文全称是Single Page Application, 中文翻译是 “单页面应用程序”；
+ 通俗的理解是：一个网站的所有功能都在一个页面上进行切换，网页不会整体刷新；所有数据通过Ajax异步请求并渲染到页面上；(特点：1. 只有一个页面 2. 页面不会刷新 3. 数据都是用Ajax请求回来的)
+ 优点：
  1. 大部分网页中需要的资源，都是通过Ajax异步请求回来的，网页不会整体刷新，提高了网站的运行效率；
  2. 而且由于数据都是在前端进行渲染的，所以减轻了后端服务器的渲染压力；

### 路由基础用法
1. 使用<router-link>创建路由hash链接
2. 使用</router-view>创建路由组件容器
3. 创建VueRoute实例，自定规则对应关系
4. Vue实例中指定路由对象，把创建号的路由对象挂载到VM实例上
5. 根据项目实际需求，可能需要将选择的路由链接高亮显示，需要在VueRouter实例中配置：`linkActiveClass:'高亮显示样式类名'`

```
<style>
  .yboactive{
    font-size: 15px;
    font-weight: 500;
    color: red;
  }
</style>

<div id="app">
  <!-- 使用router-link组件导航 -->
  <!-- 通过传入to属性指定链接 -->
  <!-- <<router-link>默认会被渲染成一个<a>标签 -->
  <router-link to="/home">home</router-link>
  <router-link to="/movie">movie</router-link>
  <router-link to="/about">about</router-link>
  
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
<script>
  const home = {
    template: "<h1>home</h1>"
  }
  const movie = {
    template: "<h1>movie</h1>"
  }
  const about = {
    template: "<h1>about</h1>"
  }

  const router = new VueRouter({
    routes: [
      // { path:'/',component:home}, //设置默认展示的组件，不推荐
      { path: '/', redirect: '/home' },  //使用redirect属性，设置路由重定向
      { path: '/home', component: home },
      { path: '/movie', component: movie },
      { path: '/about', component: about }
    ],
    // 当某一个路由规则被选中时，Vue会给该路由规则渲染成的a标签增加
    //class="router-link-exact-active router-link-active"，
    //因此我们可以router-link-active来修改标签被选中的默认样式，即通俗说的
    //高亮效果，同时Vue-router中还提供了linkActiveClass属性，可以覆盖默认提供的
    //router-link-active类名
    linkActiveClass:'yboactive'
  })

  new Vue({
    el: "#app",
    data: {},
    methods: {},
    router  // 用来指定路由对象的， 把创建好的路由对象，挂载到VM实例上
  })
</script>
```

代码展示以及[链接](https://ybonest.github.io/vue-note/html/router1.html)
<iframe style="overflow:hidden;height:150px;width:100%" class="yboflag" src="html/router1.html"></iframe>

### 路由传参
使用$route.params
1. 在VueRouter实例中，指定routes的path，用`:参数`方式指定传参
2. 在对应的component中用 `$route.params.参数` 获取传参内容
```
<div id="app">
    <router-link to="/home">home</router-link>
    <router-link to="/movie/starting">starting</router-link>
    <router-link to="/movie/endding">endding</router-link>
    <router-link to="/about">about</router-link>

    <router-view></router-view>
  </div>
  <script>
    const home = {
      template: '<h1>home</h1>'
    }
    const movie = {
      template: '<h1>movie --- {{ $route.params.type }}</h1>',
      created() {
        console.log(this);
        // 获取路由URL传递过来的参数
        console.log(this.$route.params.type)
      }
    }
    const about = {
      template: '<h1>about</h1>'
    }

    const router = new VueRouter({
      routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: home },
        // 在路由规则的 path 中，可以通过 : 来指定规则的某一部分，是参数；
        { path: '/movie/:type', component: movie },
        { path: '/about', component: about }
      ],
      linkActiveClass:'yboactive'
    })

    new Vue({
      el:"#app",
      data:{},
      methods:{},
      router
    })
  </script>
```

代码展示以及[链接](https://ybonest.github.io/vue-note/html/router2.html)
<iframe style="overflow:hidden;height:150px;width:100%" class="yboflag" src="html/router2.html"></iframe>


传多个参数时与传单个参数基本一致
+ 如下`<router-link to="/movie/starting/3">movie</router-link>`传入starting和3两个参数
+ 在VueRouter实例对应的路由规则中指定path为`{path:'/movie/:type/:id',component:movie}`

代码展示以及[链接](https://ybonest.github.io/vue-note/html/router3.html)
<iframe style="overflow:hidden;height:150px;width:100%" class="yboflag" src="html/router3.html"></iframe>

使用props传参(推荐方法)
1. 在VueRouter实例的routes规则中添加`props:true`,例：`{ path: '/movie/:type/:id', component: movie, props: true }`
2. 在对应的路由组件中增加props，例如：`props:['type','id']`

代码展示以及[链接](https://ybonest.github.io/vue-note/html/router4.html)
<iframe style="overflow:hidden;width:100%" class="yboflag" src="html/router4.html"></iframe>

### 编程式导航
除了使用<router-link>创建的a标签定义导航链接外，还可以使用router的实例方法`router.push(location, onComplete?, onAbort?)`实现

该方法的参数可以是一个字符串路径，或者一个描述地址的对象
```
router.push('home')//字符串
router.push({path:'home'}) //对象
router.push({name:'user',params:{userId:123}}) //命名的路由
router.push({path:'register,query:{plan:'private'}}) //带查询参数，变成/register?plan=private
```

代码展示以及[链接](https://ybonest.github.io/vue-note/html/router5.html)
```
  <div id="app">
    <ul class="ybo">
      <li @click="goOne">one</li>
      <li @click="goTwo">two</li>
      <li @click="goThree">three</li>
      <li @click="goFour">four</li>
    </ul>
    <br>
    <router-view></router-view>
  </div>
  <script>
    const one = {
      template: '<h1>one</h1>',
      props: ['flag', 'id'],
      created() {
        console.log('flag', this.flag)
        console.log('id', this.id)
      }
    }
    const two = {
      template: `<div><h1>two</h1>  //注意：template只能含一个根元素
      <p>flag:{{ flag }}</p>
      <p>id:{{ id }}</p></div>`,
      props: ['flag', 'id'],
      created() {
        console.log('flag', this.flag)
        console.log('id', this.id)
      }
    }
    const three = {
      template: '<h1>three</h1>',
      props: ['flag', 'id'],
      created() {
        console.log('flag', this.flag)
        console.log('id', this.id)
      }
    }
    const four = {
      template: '<h1>four</h1>',
      props: ['flag', 'id'],
      created() {
        console.log('flag', this.flag)
        console.log('id', this.id)
      }
    }
    var router = new VueRouter({
      routes: [
        { path: '/one/:flag/:id', component: one, props: true },
        { path: '/two/:flag/:id', component: two, name: 'two', props: true },
        { path: '/three/:flag/:id', component: three, props: true },
        { path: '/four/:flag/:id', component: four, props: true },
      ],
      linkActiveClass: 'yboactive'
    })
    new Vue({
      el: "#app",
      data: {},
      methods: {
        goOne() {
          // this.$router.back(); //后退1个历史记录
          // this.$router.forward();//前进一个
          // this.$router.go(n)
          this.$router.push('/one/fish/1');  //传参方式一
        },
        goTwo() {
          console.log("two");
          //使用命名路由，注意此处name需要与VueRouter实例中对应的路由配置中的name属性对应
          this.$router.push({ name: 'two', params: { flag: 'brid', id: 2 } });
        },
        goThree() {
          const id = 3;
          const flag = 'god';
          this.$router.push({ path: `/three/${flag}/${id}` });
        },
        goFour() {
          // push中如果提供了path，params会被忽略，因此如下写法params不生效
          this.$router.push({ path: 'four', params: { flag: 'cat', id: 4 } })
          // this.$router.push('/four/cat/4');
        },
      },
      router
    })
  </script>
```
<iframe style="overflow:hidden;width:100%" class="yboflag" src="html/router5.html"></iframe>


router.replace(location,onComplete?,onAbort?)
跟router.push很像，唯一不同的就是它不会向history添加新记录

+ 声明式用法：`<router-link :to="..." replace>`
+ 编程式：`router.replace(...)`

### 命名路由
在创建Router实例的时候，可以在routes配置中给某个路由设置名称，例：
```
const router = new VueRouter({
  routes:[
    {
      path:'/user/:userId',
      name:'user',  //此处与声明式或者编程式中的name对应，否则无法跳转
      component:User
    }
  ]
})
//1. 如果使用声明式需要在router-link中如下填写
<router-link :to="{name:'user',params:{userId:123}}">User</router-link>
//2. 如果使用编程式需要在router.push()中如下填写
router.push({name:'user',params:{userId:123}})
```

### 命名视图
有时候想同时（同级）展示多个视图，而不是嵌套视图，例如创建一个布局，有sidebar（侧导航）和main（主内容）两个视图，这个时候命名视图就派上用场了，我们可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。

```
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件
```
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {  //注意此处是components
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

代码展示以及[链接](https://ybonest.github.io/vue-note/html/router6.html)
<iframe style="overflow:hidden;width:100%" class="yboflag" src="html/router6.html"></iframe>

### 重定向
重定向也是通过routes配置来完成，例：
```
const router = new VueRouter({
  routes:[
    {path:'/a',redirect:'/b'}
  ]
})
```

重定向的目标也可以是一个命名的路由
```
const router = new VueRouter({
  routes:[
    {path:'/a',redirect:{name:'foo'}}
  ]
})
```

甚至是一个方法，动态返回重定向目标
```
const router = new VueRouter({
  routes:[
    {
      path:'/a',redirect:to => {
        //方法接收，目标路由 作为参数
        // return 重定向的 字符串路径/路径对象
      }
    }
  ]
})
```

### 别名
重定向的意思是，当用户访问/a时，url将会被替换为/b，然后匹配路由为/b，而别名则是:如果/a的别名是/b，意味着，当用户访问/b时，url会保持为/b，但是路由匹配则为/a,就像用户访问/a一样
```
const router = new VueRouter({
  routes:[
    {path:'/a',component:A,alias:'/b'}
  ]
})
```
