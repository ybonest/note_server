----------------本文档主要参考webpack官方文档，文档请移步该处[链接](https://doc.webpack-china.org/concepts/)

### 概念
webpack是一个现代JavaScript应用程序的静态模块打包器(module bundler),当webpack处理应用程序时，它会递归地构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个bundle ----（来自官方文档解释）

webpack的四个核心概念
+ 入口(entry)
+ 输出(output)
+ loader
+ 插件(plugins)

### 入口[entry]
入口起点指示webpack应该要使用哪个模块，来作为构建其内部依赖图的开始。
+ webpack.config.js配置
  - 简写
  ```javascript
  module.exports = {
    entry:'./path/to/my/entry/file.js'
  }
  ```

  - 正常写
  ```javascript
  const config = {
    entry:{
      main:'./path/to/my/entry/file.js'
    }
  }
  module.exports = config;
  ```

+ 对象语法
```javascript
const config = {
  entry:{
    app:'./src/app.js',
    vendors:'./src/vendors.js'
  }
};
```

+ 多页面应用程序
```javascript
const config = {
  entry:{
    pageOne:'./src/pageOne/index.js',
    pageTwo:'./src/pageTwo/index.js',
    pageThree:'./src/pageThree/index.js'
  }
}
```

### 出口[output]
output属性告诉webpack在哪里输出它所创建的bundles,以及如何明明这些文件
+ webpack.config.js

```javascript
const path = require('path');

module.exports = {
  entry:'./path/to/my/entry/file.js',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'my-first-webpack.bundle.js'
  }
}
```

+ 多个入口起点
```javascript
module.exports = {
  entry:{
    app:'./src/app.js',
    search:'./src/search.js'
  },
  output:{
    filename:'[name].js',
    path:__dirname+'/dist'
  }
}
//最终输出到dist目录app.js与search.js两个文件
```


### loader
loader让webpack能够去处理那些非JavaScript文件
+ webpack的配置中loader有两个目标
  - 识别出应该被对应的loader进行转换的那些文件
  - 转换这些文件，从而使其能够被添加到依赖图中(并且最终添加到bundle中)

+ webpack.config.js配置

```javascript
const path = require('path');

const config = {
  entry:'./path/file.js',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'my-first-webpack.bundle.js'
  },
  module:{
    rules:{
      {test:/\.txt$/,use:'raw-loader'}
    }
  }
}
module.exports = config
```

### 插件[plugins]
loader被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务
+ 使用步骤
  - require()相关插件
  - 将插件添加到plugins数组中
+ webpack.config.js配置

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack);//访问内置插件
const path = require('path');

const config = {
  entry:'./path/file.js',
  output:{
    path:path.join(__dirname,'/dist'),
    filename:'bundle.js'
  },
  module:{
    rules:[
      {test:/\.txt$/,use:'raw-loader'}
    ]
  },
  plugins:[
    new webpack.optimize.UnlifyJsPlugin(),
    new HtmlWebpackPlugin({template:'./src/index.html'})
  ]
}
```
