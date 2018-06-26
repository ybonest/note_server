#### 1. 插值表达式
```
<div id="app">
    <p>{{ message }}</p>
</div>
<script>
    new Vue({
        el:"#app",
        data:{
            message:"Hello Vue"
        }
    })
</script>
```

#### 2. v-cloak
 > 插值表达式存在闪烁问题，可以使用v-cloak解决闪烁问题

```
CSS样式设置
<style>
    [v-cloak] {
    display: none;
    }
</style>
<div id="app" v-cloak>
    <h3>{{ message }}</h3>
</div>
<script>
    new Vue({
        el:"#app",
        data:{
            message:"Hello Vue"
        }
    })
</script>
```

#### 3. v-text
> 注意：v-text会覆盖元素原有内容

```
<div v-text="message"></div>
```

#### 4. v-html
```
<div v-html="html"></div>
```

#### 5. v-bind
> 为html属性节点绑定数据

```
<!-- 绑定一个属性 -->
<img v-bind:src="imageSrc">

<!-- 缩写 -->
<img :src="imageSrc">

<!-- 内联字符串拼接 -->
<img :src="'/path/to/images/' + fileName">

<!-- class 绑定 -->
<div :class="{ red: isRed }"></div>
<div :class="[classA, classB]"></div>
<div :class="[classA, { classB: isB, classC: isC }]">

<!-- style 绑定 -->
<div :style="{ fontSize: size + 'px' }"></div>
<div :style="[styleObjectA, styleObjectB]"></div>

<!-- 绑定一个有属性的对象 -->
<div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

<!-- 通过 prop 修饰符绑定 DOM 属性 -->
<div v-bind:text-content.prop="text"></div>

<!-- prop 绑定。“prop”必须在 my-component 中声明。-->
<my-component :prop="someThing"></my-component>

<!-- 通过 $props 将父组件的 props 一起传给子组件 -->
<child-component v-bind="$props"></child-component>

<!-- XLink -->
<svg><a :xlink:special="foo"></a></svg>
```

#### 6. v-on
> 事件绑定

+ 修饰符
    - .stop - 调用 event.stopPropagation()。
    - .prevent - 调用 event.preventDefault()
    - .capture - 添加事件侦听器时使用 capture 模式。
    - .self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
    - .{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
    - .native - 监听组件根元素的原生事件。
    - .once - 只触发一次回调。
    - .left - (2.2.0) 只当点击鼠标左键时触发。
    - .right - (2.2.0) 只当点击鼠标右键时触发。
    - .middle - (2.2.0) 只当点击鼠标中键时触发。
    - .passive - (2.3.0) 以 { passive: true } 模式添加侦听器

```
<!-- 方法处理器 -->
<button v-on:click="doThis"></button>

<!-- 对象语法 (2.4.0+) -->
<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>

<!-- 内联语句 -->
<button v-on:click="doThat('hello', $event)"></button>

<!-- 缩写 -->
<button @click="doThis"></button>

<!-- 停止冒泡 -->
<button @click.stop="doThis"></button>

<!-- 阻止默认行为 -->
<button @click.prevent="doThis"></button>

<!-- 阻止默认行为，没有表达式 -->
<form @submit.prevent></form>

<!--  串联修饰符 -->
<button @click.stop.prevent="doThis"></button>

<!-- 键修饰符，键别名 -->
<input @keyup.enter="onEnter">

<!-- 键修饰符，键代码 -->
<input @keyup.13="onEnter">

<!-- 点击回调只会触发一次 -->
<button v-on:click.once="doThis"></button>
```

#### 7. v-for/key
> 通常用来迭代数组以及对象

```
<div v-for="item in items">
  {{ item.text }}
</div>

<div v-for="(item, index) in items"></div>
<div v-for="(val, key) in object"></div>
<div v-for="(val, key, index) in object"></div>

<div v-for="item in items" :key="item.id">
  {{ item.text }}
</div>
```

> v-for在更新已渲染过的元素时，默认用“就地复用”策略，表现为如果数据项的顺序被改变，Vue将不会移动DOM元素来匹配数据项的顺序，因此需要为每项添加一个唯一`key`属性(建议尽可能在使用 v-for 时提供 key)

>:key的值只接受string或number

```
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```

#### 8. v-if/v-show
> v-if 和 v-show 的作用，都是切换界面上元素的显示或隐藏的

> 一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。

```
 <div id="app">
    <input type="button" value="Toggle" @click="flag=!flag">
    <p>{{ flag }}</p>

    <!-- v-if 是 动态 创建或删除元素，实现 显示或隐藏 -->
    <h4 v-if="flag">if操作</h4>

    <!-- v-show 是控制元素的 display:none 样式，来控制元素的显示或隐藏 -->
    <h4 v-show="flag">show操作</h4>
  </div>

  <script>
    // View Model
    var vm = new Vue({
      el: '#app', // View 
      data: { // Model
        flag: false
      }
    })
  </script>
```


