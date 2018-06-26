#### html-webpack-plugin简单使用
+ [实例链接](https://github.com/ybonest/webpack-note/tree/master/webpack/example4)

<p style="text-indent:2em;">webpack-dev-server是js的实时编译工具，但是它也只能实时编译js文件，因此此章节介绍了一个可以实时编译html文件的插件--html-webpack-plugin，它与weback-dev-server配合使用就能同时实时编译js和html文件了</p>

+ 插件作用
  1. 为html动态引入外部依赖资源，如script/link
  2. 生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口

> 注意：由html-webpack-plugin生成的html入口文件也是托管于内存中的

使用步骤
+ 安装:npm i html-webpack-plugin -D
+ 在webpack.config.js文件中导入，如：`const HtmlWebpackPlugin = require('html-webpack-plugin')`
+ 增加配置将插件挂载到webpack中

具体配置如下：
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:path.join(__dirname,'./src/index.js'),
  output:{
    path:path.join(__dirname,'./dist'),
    filename:'bundle.js'
  },
  plugins:[ //plugins专门配置webpack相关插件
    new HtmlWebpackPlugin({
      template:path.join(__dirname,'./src/index.html'), //制定要被托管的html文件以及其路径
      filename:'index.html' //指定要生成的页面的名称，也就是被托管到内存中的html文件，默认托管到根目录
    })
  ]
}
```