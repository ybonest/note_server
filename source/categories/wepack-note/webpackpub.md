该章节是在基于上章节的项目基础上进行的打包发布，打包完成的项目文件地址[链接](https://github.com/ybonest/webpack-note/tree/master/webpack/webpackProjectPub)

### 简单打包
+ 在项目中我们已经配置好了webpack.config.js文件，此时只要执行`webpack`命令即可打包成功
+ 或者在package.json文件的scripts节点中配置如下配置：

```
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --open chrome --port 3004 --host 127.0.0.1 --compress --progress --hot",
    "pub": "webpack --progress --hide-modules"
  },
```

> `--progress` 打包时在控制台显示进度
> `--hide-modules` 隐藏打包时在控制台输出的无用信息

如上配置完成后，执行`npm run pub`命令即可。

### 优化打包
由于简单打包会将所有js打包到同一js文件，这会导致js文件极大，在实际项目开发中，这肯定是不行的，下面会详细介绍优化打包步骤

**优化准备**
+ 新建`webpack.pub.config.js`文件，并将原`webpack.config.js`文件的内容复制一份过去
+ 配置package.json文件
```
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "webpack-dev-server --open chrome --port 3004 --host 127.0.0.1 --compress --progress --hot",
  "pub": "webpack --progress --hide-modules --config webpack.pub.config.js"
},
```

> webpack默认会寻找`webpack.config.js`文件，经过如上配置后，执行`npm run pub`命令时会去寻找`webpack.pub.config.js`文件

#### 1、压缩html页面
+ 项目中我们曾引进`html-webpack-plugin`插件，压缩html页面文件也是基于这个插件的

+ 下面是`webpack.pub.config.js`文件配置

```javascript
plugins: [  //配置webpack使用的插件
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: "index.html",
      minify: { // 指定 生成的 index.html 的压缩选项
        collapseWhitespace: true, // 合并空白字符
        removeComments: true, // 把所有的注释删除掉
        removeAttributeQuotes: true // 移除属性上的引号
      }
    })
  ],
```

> 该处配置主要是处理html页面，会将html空白字符，换行符以及注释等去掉

#### 2、抽取css样式
+ 项目经过以上打包后，css文件和js文件都会被打包进入同一个文件，此处是将css样式文件抽离出来，此处需要插件[Extract Text Plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)

+ 配置步骤（此处几步修改的都是`webpack.pub.config.js`文件）
  - 安装extract-text-webpack-plugin插件:`npm i extract-text-webpack-plugin -D`，并引入：`const ExtractTextPlugin = require("extract-text-webpack-plugin");`
  - 配置plugins,增加如下代码：`new ExtractTextPlugin("css/styles.css")`
  - 配置rules规则

```javascript
{
  test: /\.css$/, use: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: "css-loader"
  })
},
```

除却css文件外，sass和less配置类似，如下:

```javascript
{
  test: /\.less$/, use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'less-loader']
  })
},
{
  test: /\.scss$/, use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader']
  })
}
```

**下面是详细配置**

```javascript
const path = require("path") //node内置path模块，用于拼接路径

//用于将html文件托管于内存中，与webpack-dev-server配合使用，达到js和index实时编译的目的
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")

//引入extract-text-webpack-plugin插件，抽离css/less/scss文件
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {  //node函数，用于将对象暴露给外界
  entry: path.join(__dirname, './src/main.js'), //指定入口js文件
  output: {
    path: path.join(__dirname, './dist'), //制定出口文件目录
    filename: "bundle.js"  //制定编译后的js文件名称
  },
  plugins: [
    /**
     * 配置html-webpack-plugin插件，以及对应的压缩配置
     */
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: "index.html",
      minify: { // 指定 生成的 index.html 的压缩选项
        collapseWhitespace: true,  // 合并空白字符
        removeComments: true, // 把所有的注释删除掉
        removeAttributeQuotes: true // 移除属性上的引号
      }
    }),
    new ExtractTextPlugin("css/styles.css")  //抽离css样式表
  ],
  module: {
    rules: [
      { //处理css文件
        test: /\.css$/, 
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      /**
       * 处理sass文件,依赖style-loader/css-loader/sass-loader
       */
      {
        test: /\.scss$/,
        // use: ['style-loader', 'css-loader', 'sass-loader']
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader","sass-loader"]
        })
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
          loader: 'expose-loader',
          options: '$'
        }]
      }
    ]
  }
}
```

#### 3、每次发布自动删除dist目录
+ 依赖插件`clean-webpack-plugin`
+ 步骤
  - 安装`clean-webpack-plugin`插件：`npm i clean-webpack-plugin -D`
  - 引入插件:`const CleanPlugin = require("clean-webpack-plugin")`
  - 配置plugins：`new CleanPlugin(["dist"])`

#### 4、优化压缩js文件(去掉换行注释等)
+ 导入webpack：`const Webpack = require('webpack')`
+ 配置plugins --- new Webpack.optimize.UglifyJsPlugin()

#### 5、抽离第三方包(js)
+ 修改entry入口文件

```javascript
entry: {
  app: path.join(__dirname, './src/main.js'), //指定入口js文件
  vendors1:["vue","vuex","vue-router"],  //指定分离打包的js，放置在同一数组的会被打包到同一js文件
  vendors2:["axios"],
  vendors3:["jquery"],
  // vendors4:["popper","bootstrap"],
  vendors5:["echarts"]
}
```

+ 配置`plugins`

```javascript
new webpack.optimize.CommonsChunkPlugin({
  name:["vendors1","vendors2","vendors3","vendors5"],  //对应入口文件的配置
  filename:"js/[chunkhash:6]-vendors.js"
})
```

#### 6、实现路由组件的按需加载（懒加载）效果
依赖插件[babel-plugin-syntax-dynamic-import](http://babeljs.io/docs/plugins/syntax-dynamic-import/)

+ 步骤
  - 运行`npm install --save-dev babel-plugin-syntax-dynamic-import` 安装到开发依赖
  - 配置`.babelrc`文件，在`plugins`节点下新增加如下代码：

```javascript
{
  "plugins": ["syntax-dynamic-import"]
}
  ```

  - 把需要懒加载的路由组件分组，修改成如下引用方式：

```javascript
const bootply = () => import(/* webpackChunkName: "news" */ './component/subcomponent/Bootply.vue')
const facilin = () => import(/* webpackChunkName: "news" */ './component/subcomponent/facilin.vue')
const eros = () => import(/* webpackChunkName: "news" */ './component/subcomponent/eros.vue')
```

  - 打开`webpack.pub.config.js`，在 `output` 节点中，新增`chunkFilename`节点，为懒加载的路由模块自定义文件名
 
```javascript
output: {
  path: path.join(__dirname, './dist'), // 指定输出的文件夹
  chunkFilename: 'js/[chunkhash:6]-[name].js',
  filename: 'js/bundle.js'
}
```