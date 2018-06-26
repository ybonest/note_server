#### 使用babel处理JS高级语法
+ [实例链接](https://github.com/ybonest/webpack-note/tree/master/webpack/example5)

本例是引入了babel，babel是用来处理高级JS语法

babel配置方式
+ 1.安装`babel-core`和`babel-loader`以及`babel-plugin-transform-runtime`
  - 执行`npm i babel-core babel-loader babel-plugin-transform-runtime -D`
+ 2.安装`babel-preset-env`和`babel-preset-stage-0`
  - `npm i babel-preset-env babel-preset-stage-0 -D`
+ 3.在module中的rules添加配置:`{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }`从而排除node_modules，以防打包时将node_modules中的内容打包进去
+ 4.根目录添加.babelrc的babel配置文件，里面配置了babel用到到的语法和插件，注意，这个文件中，必须符合JSON规范，因此，不能使用单引号和注释
```javascript
{
  "presets": ["env", "stage-0"],
  "plugins": ["transform-runtime"]
}
```

代码展示
+ webpack.config.js配置

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:path.join(__dirname,'./src/index.js'),
  output:{
    path:path.join(__dirname,'./dist'),
    filename:'bundle.js'
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:path.join(__dirname,'./src/index.html'),
      filename:'index.html'
    })
  ],
  module:{
    rules:[
      //注意，此处一定要把node_modules添加到exclude排除项，否则node_modules中的东西也将被打包，最终导致错误
      {test:/\.js$/,use:'babel-loader',exclude:/node_modules/}
    ]
  }
}
```

+ index.js
```javascript
import $ from 'jquery';
$(function () {
  $('li:odd').css('background', 'red');
  $('li:even').css('background', 'yellow');
})
class Person {
  static info = { country: 'China' }
}
console.log(Person.info);
```

#### 禁用webpack的严格模式
webpack中使用babel编译JS时默认以严格模式编译，使用`babel-plugin-transform-remove-strict-mode`插件可以禁用严格模式

插件github地址[https://github.com/genify/babel-plugin-transform-remove-strict-mode](https://github.com/genify/babel-plugin-transform-remove-strict-mode)

+ 使用方式
  1. npm install babel-plugin-transform-remove-strict-mode -D
  2. 在`.babelrc`文件中加入配置

```javascript
{
  "plugins": ["transform-remove-strict-mode"]
}
```
