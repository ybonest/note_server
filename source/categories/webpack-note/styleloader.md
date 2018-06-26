#### webpack使用相关loader编译css/scss/less文件

+ Loader简介
  + loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。
  + loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。
  + loader 甚至允许你直接在 JavaScript 模块中 import CSS文件

##### 1.转换css文件,css文件依赖`style-loader`和`css-loader`两个loader
  + 创建css样式文件，并在要打包的js文件中引入-->`import './css/a.css'`
  + 安装style-loader ---> `npm i style-loader -D`
  + 安装css-loader --->   `npm i css-loader -D`
  + 在webpack.config.js配置文件中的module节点中增加如下规则

  ```javascript
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
    ],
    module:{  //配置第三方loader模块
      rules:[ //第三方文件后缀匹配规则以及loader，注意如果存在多个loader，loader调用顺序是从后向前
        {test:/\.css$/,use:['style-loader','css-loader']} //配置css文件loader   
      ]
    }
  }
  ```

##### 2.转换scss文件,scss依赖`style-loader/css-loader/sass-loader/node-sass`
  + 创建scss样式文件，并在要打包的js文件中引入，-->`import './css/b.scss'` 
  + 安装依赖loader
    - style-loader 执行命令 `npm i style-loader -D`
    - css-loader 执行命令 `npm i css-loader -D`
    - sass-loader 执行命令 `npm i sass-loader -D`
    - node-sass 执行命令 `npm i node-sass -D`
  + 在webpack.config.js配置文件中的module节点中增加如下规则

  ```javascript
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
    ],
    module:{  //配置第三方loader模块
      rules:[ //第三方文件后缀匹配规则以及loader，注意如果存在多个loader，loader调用顺序是从后向前
        {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']}
      ]
    }
  }
  ```

##### 3.转换less文件,less依赖`style-loader/css-loaderless-loader/less`
  + 创建less样式文件，并在要打包的js文件中引入，本例中是在index.js中引入的css-->`import './css/b.scss'`
  + 安装依赖loader
    - style-loader 执行命令 `npm i style-loader -D`
    - css-loader 执行命令 `npm i css-loader -D`
    - sass-loader 执行命令 `npm i less-loader -D`
    - less 执行命令 `npm i less -D`
  + 在webpack.config.js配置文件中的module节点中增加如下规则

  ```javascript
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
    ],
    module:{  //配置第三方loader模块
      rules:[ //第三方文件后缀匹配规则以及loader，注意如果存在多个loader，loader调用顺序是从后向前
        {test:/\.less$/,use:['style-loader','css-loader','less-loader']}
      ]
    }
  }
  ```

##### 4.处理路径问题
  + 开发中css样式可能引入了背景图片，但是由于经过`webpack-dev-server`和`html-webpack-plugin`的作用后，项目开发中所有文件实际上都是托管于内存之中，这个时候就有可能导致一些路径问题，因此此处引入`url-loader`和`file-loader`来处理路径问题

  + [url-loader官方地址](https://webpack.js.org/loaders/url-loader/)

  + 使用步骤
    - 首先安装，执行命令：`npm i url-loader file-loader -D`
    - 在webpack.config.js中配置rules
    - url-loader会将文件编译为base64的编码,若不想文件被编译成base64格式，可以配合file-loader，并指定`limit`（limit的值小于文件大小后，文件将以原有格式展现）
    - 通过url-loader和file-loader后文件会以hash编码为文件命名，我们重新用`name`重新指定文件名称,配置如下
      `{test:/\.jpg|png|gif|bmp$/,use:'url-loader?limit=5948&name=[name].[ext]'}`

webpack.config.js代码部分具体配置代码部分

```javascript
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
  ],
  module:{  //配置第三方loader模块
    rules:[ 
      {test:/\.css$/,use:['style-loader','css-loader']},  //配置css文件loader   
      
      // {test:/\.jpg|png|gif|bmp$/,use:'url-loader'}  

      /**
       * 1. 配置url-loader处理css中img的路径问题，此时img被编译成了base64位格式传到页面
       * {test:/\.jpg|png|gif|bmp$/,use:'url-loader'}
       */

      /**
       * 2. 默认情况下使用url-loader将把图片转为base64格式的图片，如果不想改变图片格式，可以下载file-loader，
       * 然后增加limit限制,当limit限制小于图片大小时(右键图片，属性，查看图片大小---注意：图片大小指的是字节数)，
       * 图片会以原本格式展现，如下
       */
      {test:/\.jpg|png|gif|bmp$/,use:'url-loader?limit=5948'}  

      /**
       * 3. 经过以上两步后，图片正常显示，并且保持了原本格式，但是图片名称被改成了hash值，如果想保持图片原有名称
       * 可以增加name限制 ---name=[name].[ext]代表原有的图片名称:
       * {test:/\.jpg|png|gif|bmp$/,use:'url-loader?limit=5948&name=[name].[ext]'}
       */

      /**
       * 4. 同时你也可以以hash值+原本名字配合使用  
       * {test:/\.jpg|png|gif|bmp$/,use:'url-loader?limit=5948&name=[hash:8]-[name].[ext]'}
       */
    ]
  }
}
```

实例代码块展示以及[链接](https://github.com/ybonest/webpack-note/tree/master/webpack/example4)
+ package.json中的开发依赖

```javascript
"devDependencies": {
  "url-loader": "^0.6.2",
  "css-loader": "^0.28.9",
  "file-loader": "^1.1.6",
  "html-webpack-plugin": "^2.30.1",
  "less": "^2.7.3",
  "less-loader": "^4.0.5",
  "node-sass": "^4.7.2",
  "sass-loader": "^6.0.6",
  "style-loader": "^0.20.1",
  "webpack": "^3.10.0",
  "webpack-dev-server": "^2.11.1"
}
```

+ webpack.config.js配置

```javascript
const path = require('path');

//html-webpack-plugin插件的作用就是将指定的html文件复制一份托管到内存中
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
  ],
  module:{  //配置第三方loader模块
    rules:[ //第三方文件后缀匹配规则以及loader，注意如果存在多个loader，loader调用顺序是从后向前
      {test:/\.css$/,use:['style-loader','css-loader']},  //配置css文件loader   
      {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
      {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
      //因为此处index以及bundle.js都是托管到内存中的，所以css加载图片时需要配置此项，否则npm run dev启动报错
      // {test:/\.jpg|png|gif|bmp$/,use:'url-loader'}  
      //默认情况下使用url-loader将把图片转为base64格式的图片，如果不想改变图片格式，可以下载file-loader，
      //增加limit限制,当limit限制小于图片大小时(右键图片，属性，查看图片大小---注意：图片大小指的是字节数)，
      //图片会以原本格式展现
      // {test:/\.jpg|png|gif|bmp$/,use:'url-loader?limit=5948'}  
      //经过以上两步后，图片正常显示，并且保持了原本格式，但是图片名称被改成了hash值，如果想保持图片原有名称
      //可以增加name限制 ---name=[name].[ext]代表原有的图片名称
      // {test:/\.jpg|png|gif|bmp$/,use:'url-loader?limit=5948&name=[name].[ext]'}
      //同时你也可以以hash值+原本名字配合使用 
      {test:/\.jpg|png|gif|bmp$/,use:'url-loader?limit=5948&name=[hash:8]-[name].[ext]'}
    ]
  }
}
```

+ index.js

```javascript
import $ from 'jquery';
import './css/a.css';  //引入css
import './css/b.scss';  //引入scss
import './css/c.less';  //引入less

$(function(){
  $('li:even').css('background','red');
  $('li:odd').css('background','yellow');
})
```

