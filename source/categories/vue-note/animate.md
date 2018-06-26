<script src="/vue-note/js/common.js"></script>
### 过渡
Vue在插入、更新或者移除DOM时提供多种不同方式的应用过渡效果
+ 在CSS过渡和动画中自动应用class
+ 可以配合使用第三方CSS动画库，如[Animate.css](https://daneden.github.io/animate.css/)
+ 在过渡钩子函数中使用JavaScript直接操作DOM
+ 可以配合使用第三方JavaScript动画库，[Velocity.js](http://velocityjs.org/)

Vue提供了transition的封装组件，在下列情形中，可以给任何元素和组件添加entering/leaving过渡
+ 条件渲染(使用v-if)
+ 条件展示(使用v-show)
+ 动态组件
+ 组件根节点

### 过渡类名
1. v-enter：定义过渡的开始状态，在元素被插入时生效，在下一帧移除
2. v-enter-active：定义过渡的状态，在元素被插入时生效，在transition/animation完成后移除
3. v-enter-to：定义进入过渡的结束状态，在元素被插入一帧后生效，(与此同时 v-enter 被删除)，在 transition/animation 完成之后移除。
4. v-leave：定义离开过渡的开始状态，在离开过渡被触发时生效，在下一帧移除。
5. v-leave-active：定义过渡的状态，在元素离开过渡被触发后立即生效，在元素整个过渡过程中作用，在离开过渡被触发后立即生效，在 transition/animation 完成之后移除
6. v-leave-to：定义离开过渡的结束状态，在离开过渡被触发一帧后生效 (与此同时 v-leave 被删除)，在 transition/animation 完成之后移除

![img](/media/animate.png)

对于这些在enter/leave过渡中切换的类名，v-是这些类名的前缀，可以修改，如下
```
<transiton name="ybo">
  <h1>动画</h1>
</transiton>
//当transition增加name属性后，v-enter等就替换为ybo-enter
```

动画实例一,动画基本用法[(链接)](https://ybonest.github.io/vue-note/html/animate1.html)
```
  <style>
    .v-enter,
    .v-leave-to{
      opacity: 0;
      transform: translateX(100px);
    }
    .v-enter-active,
    .v-leave-active{
      transition: all 2s ease;
    }
  </style>
</head>
<body>
  <div id="app">
    <button @click="flag=!flag">Toggle</button>
    <transition>
      <h3 v-show="flag">动画测试</h3>
    </transition>
  </div>
  <script>
    var vm = new Vue({
      el:"#app",
      data:{
        flag:false
      }
    })
  </script>
```

动画实例二，使用transition的name属性[(链接)](https://ybonest.github.io/vue-note/html/animate3.html)
```
<style>
    .v-enter,
    .v-leave-to{
      opacity: 0;
      transform: translateY(100px);
    }
    .v-enter-active,
    .v-leave-active{
      transition: all 2s ease-in-out;
    }

    .my-enter,
    .my-leave-to{
      opacity: 0;
      transform: translateY(100px);
    }
    .my-enter-active,
    .my-leave-active{
      transition: all 2s ease-in-out;
    }
  </style>
</head>
<body>
  <div id="app">
    <button @click="flag1=!flag1">Toggle</button>
    <transition>
      <p v-show="flag1">动画一</p>
    </transition>
    <hr>
    <button @click="flag2=!flag2">Toggle</button>
    <transition name="my">
        <p v-show="flag2">动画一</p>
      </transition>    
  </div>
  <script>
    new Vue({
      el:"#app",
      data:{
        flag1:false,
        flag2:false
      }
    })
  </script>
```

### 自定义过渡类名
+ enter-class
+ enter-active-class
+ enter-to-class
+ leave-class
+ leave-active-class
+ leave-to-class

动画实例三，使用现有动画库[Animate.css](https://daneden.github.io/animate.css/)--[(链接)](https://ybonest.github.io/vue-note/html/animate2.html)

```
<div id="app">
    <button @click="flag=!flag">Toggle1</button>
    <transition enter-active-class="fadeInDown" leave-active-class="fadeOutDown">
       <!-- 使用Animate.css一定要给动起来的元素，添加 animated 类名  -->
      <p v-show="flag" class="animated">动画测试，使用第三方动画库</p>
    </transition>
    <button @click="flag2=!flag2">Toggle2</button>
       <!--或者在定义类名前加animated  -->    
    <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutDown">
      <p v-show="flag2">动画测试，使用第三方动画库</p>
    </transition>
  </div>
  <script>
    new Vue({
      el:"#app",
      data:{
        flag:false,
        flag2:false
      }
    })
  </script>
```

### JavaScript钩子
```
<transition
  @before-enter="beforeEnter"
  @enter="enter"
  @after-enter="afterEnter"
  @enter-cancelled="enterCancelled"
  
  @before-leave="beforeLeave"
  @leave="leave"
  @after-leave="afterLeave"
  @leave-cancelled="leaveCancelled">
</transition>
```

动画实例[(链接)](https://ybonest.github.io/vue-note/html/animate4.html)
```
 <style>
    .v-enter,
    .v-leave-to{
      opacity: 0;
      transform: translateX(200px);
    }

    .v-enter-active,
    .v-leave-active{
      transition: all 3s ease-in-out;
    }
  </style>
</head>
<body>
  <div id="app">
    <button @click="flag=!flag">Toggle</button>
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave">
      <h1 v-show="flag" v-bind:css="false">钩子动画</h1>
    </transition>
    <transition>
      <h1 v-show="flag">钩子动画</h1>
    </transition>
    <h3>{{ message }}</h3>
  </div>
  <script>
    new Vue({
      el:"#app",
      data:{
        flag:false,
        message:''
      },
      methods:{
        beforeEnter(el){
          this.message = "开始入场动画之前执行beforeEnter函数";
          console.log("开始入场动画之前执行beforeEnter函数");
        },
        enter(el,done){
          this.message = "入场动画执行中enter";
          console.log("入场动画执行中enter");
          done();
        },
        afterEnter(el){
          this.message = "入场动画完成了";
          console.log("入场动画完成了");
        },
        beforeLeave(el){
          this.message = "开始出场动画之前执行beforeLeave函数";
          console.log("开始出场动画之前执行beforeLeave函数");
        },
        leave(el,done){
          this.message = "正在执行出场动画";
          console.log("正在执行出场动画");
          done();
        },
        afterLeave(el){
          this.message = "出场完成";
          console.log("出场完成");
        }
      }
    })
  </script>
```

> 当只用JavaScript过渡的时候，在enter和leave中，回调函数done是必须的，否则它们会被同步调用，过渡会立即完成

> 推荐对于仅使用JavaScript过渡的元素添加v-bind:css="false"，Vue会跳过CSS的检测

动画实例，使用动画钩子函数[(链接)](https://ybonest.github.io/vue-note/html/animate5.html)
<iframe style="overflow:hidden;height:150px;width:100%" class="yboflag" src="html/animate5.html"></iframe>

动画实例，使用动画钩子函数[(链接)](https://ybonest.github.io/vue-note/html/animate6.html)
<iframe style="overflow:hidden;height:180px;width:100%" class="yboflag" src="html/animate6.html"></iframe>

动画实例，使用动画钩子函数[(链接)](https://ybonest.github.io/vue-note/html/animate7.html)
<iframe style="overflow:hidden;height:180px;width:100%" class="yboflag" src="html/animate7.html"></iframe>

动画实例，使用transition-group[(链接)](https://ybonest.github.io/vue-note/html/animate8.html)
<iframe style="overflow:hidden;height:180px;width:100%" class="yboflag" src="html/animate8.html"></iframe>

动画实例，使用transition-group升级版[(链接)](https://ybonest.github.io/vue-note/html/animate9.html)
<iframe style="overflow:hidden;height:180px;width:100%" class="yboflag" src="html/animate9.html"></iframe>

动画实例，使用结束动画插件Velocity[(链接)](https://ybonest.github.io/vue-note/html/animateandVelocity.html)
<iframe style="overflow:hidden;height:150px;width:100%" class="yboflag" src="html/animateandVelocity.html"></iframe>