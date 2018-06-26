#### 实例介绍以及[链接](https://github.com/ybonest/vue-note/tree/master/html/cms)
本例中使用vue组件化开发思想，对一些复用性较强的组件进行了封装，并结合`mui、mint-ui`框架实现了实例的快速开发

#### 实例主要使用技术
+ [mui](http://dev.dcloud.net.cn/mui/):一款最接近原生App体验的高性能前端框架
+ [mint-ui]()
+ [vue框架](https://cn.vuejs.org/)
+ [axios](https://www.npmjs.com/package/axios):vue推荐的ajax请求方式
+ [vuex](https://vuex.vuejs.org/zh-cn/):一个专为 Vue.js 应用程序开发的状态管理模式（数据共享）
+ [vue-router](https://router.vuejs.org/zh-cn/):vue路由插件（实现前端路由分发以及按需加载）
+ [webpack](http://webpack.github.io/):打包工具

#### 主要实现模块
+ 新闻咨询
  - 新闻列表
  - 新闻详情
  - 评论组件
+ 图片分享
  - 图片列表
  - 图文详情
  - 图片懒加载（mint-ui提供）
+ 商品购买
  - 产品展示
  - 加入购物车
+ 购物车
  - 购物车商品展示
  - 商品数据更新

购物车模块介绍：此模块主要使用了`vuex`以及`html5`的`Local Storage`，实例中购物车信息由vuex管理，当点击加入购物车时，将产品信息交给vuex，vuex对产品数据进行一系列操作
