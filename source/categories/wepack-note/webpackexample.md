+ 前几节已经对webpack的基本使用写过一些例子，本节扩展了一下，结合vue/webpack/bootstrap/echarts/jquery写了一个简单的响应式例子，效果如下图

![img](/media/Imag.jpg)

#### 项目搭建步骤
1. 安装webpack，执行命令：`npm i webpack -D`
2. 安装webpack-dev-server(一个小型的node服务)，执行命令：`npm i webpack-dev-server -D`
3. 安装html-webpack-plugin，执行命令：`npm i html-webpack-plugin -D`
4. 安装项目所需其它文件
    + `axios`------vue推荐的ajax请求插件
    + `vue`
    + `vue-router` ---- Vue路由
    + `vuex` ---- Vue数据共享池
    + js高级语法相关loader ,此处注意配置.babelrc文件
    + css以及sass编译相关loader和依赖
    + 配置对.vue结尾的文件解析loader:`vue-loader`和`vue-template-compiler`
    + 引入jQuery 使用expose-loader 配置在webpack.config.js文件中配置全局对象
      ```javascript
      module: {
        rules: [
          {
            test: require.resolve('jquery'), use: [{
              loader: 'expose-loader',
              options: 'jQuery'
            }, 
            {
              loader:'expose-loader',
              options:'$'
            }]
          }
        ]
      }
      ```

    + 安装bootstrap，并在main.js引入，使用api请参考[官方文档](http://www.bootcss.com/)

    + 安装echarts插件，具体使用请查看[官方文档](http://echarts.baidu.com/)，echars在webpack中的使用方式请参考该处[链接](http://echarts.baidu.com/tutorial.html#%E5%9C%A8%20webpack%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20ECharts)

以下是webpack配置代码，实例详细代码请参考此处[链接](https://github.com/ybonest/webpack-note/tree/master/webpack/webpackProject)
+ **例子webpack.config.js文件配置如下**

```javascript
const path = require("path") //node内置path模块，用于拼接路径


//用于将html文件托管于内存中，与webpack-dev-server配合使用，达到js和index实时编译的目的
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")

module.exports = {  //node函数，用于将对象暴露给外界
  entry: path.join(__dirname, './src/main.js'), //指定入口js文件
  output: {
    path: path.join(__dirname, './dist'), //制定出口文件目录
    filename: "bundle.js"  //制定编译后的js文件名称
  },
  plugins: [  //配置webpack使用的插件
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: "index.html"
    })
  ],
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }, //处理css文件

      /**
       * 处理sass文件,依赖style-loader/css-loader/sass-loader
       */
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.png|jpg|jif|bmp$/,
        use: ['url-loader?limit=1&name=[hash:8]-[name].[ext]']
      }, //url-loader和file-loader处理路径问题
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: /node_modules/
      }, //安装相关loader编译js高级语法
      {
        test: /\.eot|svg|ttf|woff|woff2$/,
        use: ['url-loader']
      },
      {
        test: /\.vue$/,     //配置解析vue模板文件，依赖vue-loader和vue-template-compiler
        use: ['vue-loader']
      },
      {
        test: require.resolve('jquery'), use: [{  //.配置全局jquery
          loader: 'expose-loader',
          options: 'jQuery'
        }, 
        {
          loader:'expose-loader',
          options:'$'
        }]
      }
    ]
  }
}
```

+ package.json的内容如下：
```
{
  "name": "webpackproject",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --open chrome --port 8087 --host 127.0.0.1 --compress --progress --hot"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-env": "^1.6.1",
    "babel-preset-stage-0": "^6.24.1",
    "css-loader": "^0.28.9",
    "expose-loader": "^0.7.4",
    "file-loader": "^1.1.6",
    "html-webpack-plugin": "^2.30.1",
    "node-sass": "^4.7.2",
    "sass-loader": "^6.0.6",
    "style-loader": "^0.20.1",
    "url-loader": "^0.6.2",
    "vue-loader": "^14.1.1",
    "vue-template-compiler": "^2.5.13",
    "webpack": "^3.10.0",
    "webpack-dev-server": "^2.11.1"
  },
  "dependencies": {
    "axios": "^0.17.1",
    "echarts": "^4.0.2",
    "echarts-gl": "^1.0.2",
    "echarts-stat": "^1.1.0",
    "jquery": "^3.3.1",
    "vue": "^2.5.13",
    "vue-router": "^3.0.1",
    "vuex": "^3.0.1"
  }
}
```