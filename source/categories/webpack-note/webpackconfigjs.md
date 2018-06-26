#### 使用webpack.config.js配置文件
+ [实例链接](https://github.com/ybonest/webpack-note/tree/master/webpack/example2)

本例是实例一的基础上增加webpack.config.js文件配置，在webpack.config.js文件中配置了入口文件和出口文件，这样就可以只用在命令行输入`webpack`命令，生成对应的文件。

+ webpack.config.js配置

```javascript
const path = require('path'); //此处引用的是node的内置模块

module.exports = {
  entry:path.join(__dirname,'./src/index.js'),   //entry配置入口模块
  output:{  //输出配置信息
    path:path.join(__dirname,'./dist'),   //打包好的文件所存入的路径
    filename:'bundle.js'  //打包成功后的文件名字
  }
}
```

+ index.js文件

```javascript
import $ from 'jquery';

$(function(){
  $('li:even').css('background','red');
  $('li:odd').css('background','yellow');
})
```