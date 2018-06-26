#### webpack全局安装使用
+ [实例链接](https://github.com/ybonest/webpack-note/tree/master/webpack/example1)

本例只是webpack基础用法，使用命令转换index.js文件
+ index.js代码展示

```javascript
import $ from 'jquery'
$(function(){
  $('li:even').css('background','red');
  $('li:odd').css('background','yellow');
});
```

以下是操作步骤
+ 执行命令 npm i webpack -g  全局安装，将webpack安装到C:\Users\Administrator\AppData\Roaming\npm
+ 安装jquery ---`npm install jquery`
+ 在index.js使用es6语法引入 `import $ from 'jquery'`
+ 执行webpack ./src/index.js ./dist/bundle.js
+ 执行成功后将在dist目录下生产bundle.js文件，该js文件综合了jquery和index.js