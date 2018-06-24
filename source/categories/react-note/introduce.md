### React与vue的对比
#### 组件化方面
1. 什么是模块化：从 代码 角度进行分析，就是把项目中的代码，以 模块的形式进行分割，形成了具有单独功能的模块，从而方便了代码的复用；
2. 什么是组件化： 从  UI 的角度 进行分析， 把 前端页面 分割成 一个一个的小组件；目的是为了方便UI 中 结构的复用；
3. 组件化的好处：随着 项目 开发，手里的组件会越来越多，今后在开发的时候，需要什么组件，直接引用到页面中就行，无需重复开发；
4. Vue是如何实现组件化的： .vue 文件是 推荐的组件化开发方式；
   - template  结构
   - script  行为
   - style 样式

5. React如何实现组件化： 在 react中，并没有像 .vue 这样的 组件模板，而是 把 一个组件的行为，结构，样式，统统 写到了 .js或.jsx中；

### React中的核心概念
#### 虚拟DOM (Virtual Document Object Model)
- DOM的本质是什么：浏览器中的概念，用JS对象来表示 页面上的元素，并提供了操作 DOM 对象的API；
- DOM和虚拟DOM的区别：
  - DOM是什么：1. DOM是浏览器中的概念； 2. DOM就是 浏览器提供的用来操作页面上 元素的 JS API； 3.  这些 API 都是固定的，开发人员只能使用，无法 自定义 操作 DOM 的API；（用JS对象来表示 页面上的元素；）
  - 虚拟DOM是什么：1. 虚拟DOM是前端框架中的概念； 2. 虚拟 DOM 不是浏览器提供的，而是由框架 是来 实现 虚拟DOM的； 3.  作用： 在内存中操作 DOM  的； 5. 框架中 自己定义的一套操作 DOM 元素的方法，叫做虚拟DOM；

- 为什么要实现虚拟DOM（虚拟DOM的目的）：为了实现 DOM 元素的高效更新
- 什么是React中的虚拟DOM：用JS对象来模拟 页面上的DOM 和 DOM嵌套；

### Diff算法
- tree diff:把新旧两棵DOM树，从上到下，逐层进行对比的过程，就是 Tree Diff；当每一层都对比完毕，那么必然能够找到 那些 需要被 按需更新的DOM节点；
- component diff：在对比每一层的时候，每一层中组件之间的对比，叫做 component Diff；如果 对比前后，组件的类型相同，就暂时认为 组件不需要更新；如果对比前后，组件类型不一样，内部会删除旧组件，并创建新组建同时替换到 之前旧组件所在的位置；
- element diff:在每一个组件的内部，每个元素之间也要进行前后的对比，这种元素级别的对比，叫做 element Diff；
![Diff算法图](./images/Diff.png)


<script src='./data-bar.js'></script>
<script>
  var name = 'introduce';
  eleObj.child.forEach(function(item){
    if(item.name && item.name === name){
      item.child[0].style = Object.assign({}, item.child[0].style, {color: '#fc6423'});
    }
  })
</script>
<script src='../../static-source/createElment.js'></script>