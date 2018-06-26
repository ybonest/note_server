#### webpack-dev-server插件使用
+ [实例链接](https://github.com/ybonest/webpack-note/tree/master/webpack/example3)

+ webpack-dev-server是一个基于nodejs express的服务器

<p style="text-indent:2em;">实例二中虽然引入了webpack.config.js配置，并且在配置中引入了一个入口和一个出口，在终端执行webpack可以编译和打包js文件，但是实际开发环境，我们如果每次修改完代码后都要重新手动编译查看效果，这样的开发效率无疑是十分低下的。</p>

<p style="text-indent:2em;">但是webpack-dev-server可以解决这个问题，webpack-dev-server是一个基于nodejs express的服务器，它可以实时编译我们所修改的js文件。</p>

> 当然值得注意的是，webpack-dev-server实时编译的文件并没有输出到目标文件夹，而是存在了内存中

<p style="text-indent:2em;">本例中使用了webpack-dev-server工具，并且使用webpack的局部安装(webpack-dev-server工具,需要依赖于项目本地安装webpack，否则会报错)</p>

+ 以下是详细使用步骤
  1. npm i webpack -D   将webpack局部安装，-D代表下载的是是开发依赖，安装后依赖会添加到package.json文件中的devDependencies配置中，
    devDependencies代表开发依赖
  2. 安装webpack-dev-server，运行命令`npm i webpack-dev-server -D`
  3. 在`package.json`的`scripts`节点下新增`dev`脚本,脚本命令为`"dev":"webpack-dev-server"`
    ```json
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "dev": "webpack-dev-server"
    },
    ```

  4. 在控制台运行`npm run dev`
  5. 访问localhost:8080可以看到当前文件目录在浏览器中显示
  6. 使用webpack-dev-server默认会将打包好的`bundle.js`存放到了内存中，并托管于项目的跟目录中，
    因此在浏览器中访问localhost:8080/bundle.js就可以看到文件内容
  7. 此时由于生成的bundle.js被托管于根目录，所以index.html中引入bundle.js应该是`<script src="/bundle.js"></script>`
  8. url中输入`localhost:8080/src/index.html`或`localhost:8080/src`即可访问index.html

**代码部分**
+ webpack.config.js配置

```javascript
const path = require('path');
module.exports = {
  entry:path.join(__dirname,'./src/index.js'),
  output:{
    path:path.join(__dirname,'./dist'),
    filename:'bundle.js'
  }
}
```

+ index.js

```javascript
import $ from 'jquery'

$(function(){
  $('li:even').css('background','red');
  $('li:odd').css('background','blue');
})
```

+ package.json中的devDependencies开发依赖

```json
"devDependencies": {
  "webpack": "^3.10.0",
  "webpack-dev-server": "^2.11.1"
},
```

#### 配置webpack-dev-server启动方式
+ [实例链接](https://github.com/ybonest/webpack-note/tree/master/webpack/example6)

本例主要介绍在package.json文件中配置webpack-dev-server启动方式,如下
```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --open chrome --port 3000 --host 192.168.171.58 --compress --progress --hot"
  },
```

+ `--open chrome`表示默认执行后自动打开浏览器，并且以chrome浏览器打开
+ `--port 3000`设置`webpack-dev-server`启动端口，默认8080
+ `--host 192.168.163.31`设置`webpack-dev-server`启动IP，一般默认本地`127.0.0.1`
+ `--compress`设置打包文件压缩
+ `--progress`设置启动时在控制台所显示编译进度条
+ `--hot`热更新/热刷新/热重载,更够提高打包的效率，因为热更新只是把需要重新打包的代码编译了一下，并以补丁的形式，热更新到了页面中，并没有重新编译整个项目,而且`--hot`也能够实现页面的无刷新重载(这个无刷新重载对JS无效，只对CSS有效)