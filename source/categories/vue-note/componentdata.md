#### 异步获值传参
在单页面项目开发中，所有数据都是ajax异步请求过来的，因此就导致了一些父子组件传参的注意事项

<p style="text-indent:2em">vue是数据驱动dom的，所以数据发生变化后，页面dom显示跟着变化，也就是说ajax请求的数据向子组件传值时，在子组件直接将传来的值显示在页面上，这是肯定可以的</p>

<p style="text-indent:2em">但是，如果子组件需要对传来的数值进行二次js处理，然后在显示在页面，这就设计到何时完整的数值会传到子组件。</p>

<p style="text-indent:2em">经测试，在Vue的created、mounted两个钩子函数都无法获取传来的值，所以对数值的二次处理肯定不能在这两个钩子函数中使用，至于其他就更不必考虑了</p>

<p style="text-indent:2em">好在vue为我们提供了watch监听，所以处理数据的js应当放在监听中</p>

+ 实例以及[(链接)](https://ybonest.github.io/vue-note/html/componentdata/component.html)

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <script src="../../js/vue-2.5.13.js"></script>
  <title>Document</title>
</head>

<body>
  <div id="app">
    <child-component :list="list"></child-component>
  </div>
  <script>
    Vue.component("childComponent", {
      template: `
        <ul>
          <li v-for="item in list" :key="item.name">{{ item.title }}</li>
        </ul>
      `,
      props: ["list"],
      data() {
        return {

        }
      },
      created() {
        console.log("created钩子函数：")
        console.log(this.list)  //无法接受到传来的值
      },
      mounted() {
        console.log("mounted钩子函数：")
        console.log(this.list)  //无法接受到传来的值
      },
      beforeMount() {
        console.log("beforeMount钩子函数：")
        console.log(this.list)  //无法接受到传来的值
      },
      updated() {
        console.log("updated钩子函数：")
        /**
         * 此处打印出了传来的新值，但是要注意updated这个钩子函数的作用，它是当页面数据发生变化时，重新更新dom时触发的，
         * 所以当你不在页面上显示对应数据时，这个函数是不被触发的，本例中可见，当将子组件的template中的li移除后，该函数并
         * 未触发
         */
        console.log(this.list) 
      },
      watch: {
        list: function () {
          console.log("watch监听：")
          console.log(this.list)
        }
      }
    })
    const vm = new Vue({
      el: "#app",
      data: {
        list: []
      },
      created() {
        this.getDatas()
      },
      methods: {
        async getDatas() {
          const list = await setTimeout(() => {
            this.list = [
              { name: 'one', title: '一' },
              { name: 'two', title: '二' },
              { name: 'three', title: '三' }
            ]
          }, 0)
        }
      },
    })
  </script>
</body>

</html>
```