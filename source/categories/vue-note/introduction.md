### MVC与MVVM?
+ MVC主要是后端的分层开发思想
    - M:Model是数据模型，通常进行数据操作，比如连接数据库查询数据
    - V:View是视图层，用来渲染数据
    - C:Controller是控制层，它是MVC的核心，专门用来封装项目的业务逻辑
+ MVVM是前端页面的分层开发思想，主要关注于视图层分离，MVVM把签到的视图层分成了三部分：Model、View、ViewModel
    - M:Model是每个页面要渲染的数据
    - V:HTML模型结构
    - VM:ViewModel，视图模型，核心部分，VM连接了M和V，提供双向数据绑定的概念

### Vue?
+ Vue.js 是前端的主流框架之一，和Angular.js、React.js 一起，并成为前端三大主流框架
+ Vue是一套用于构建用户界面的渐进式框架，与其它大型框架不同的是Vue被设计为可以自底向上逐层应用