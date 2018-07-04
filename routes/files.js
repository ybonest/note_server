var express = require('express');
var router = express.Router();
var multer  = require('multer');
var fs = require("fs");
var path = require("path");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


const upload = multer({ dest: '/tmp/' })
router.post('/file_upload', upload.array('image'), function(req, res, next) {
  const { imgName, imageUrl } = req.body;
  const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, "");
  fs.writeFile(path.join(__dirname,`../public/images/${imgName}`), base64Data, 'base64', function(err) {
    console.log(err);
    if(!err) {
      readAndWrite(req.body, res);
    }
  })
});

// {
//   "name": "webpack",
//   "id": "webpackid",
//   "star": "0",
//   "like": "0",
//   "message": "0",
//   "image": {
//     "url": "images/webpack.png",
//     "alt": "react"
//   },
//   "title": "webpack日常笔记",
//   "content": "本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle",
//   "link": "webpack-note",
//   "createTime": "2"
// },

function readAndWrite(data, res) {
  try {
    fs.readFile('datas/categories.json', 'utf8', function(err, ele){
      if(err){
        return console.error(err);
      }
      const newObj = {
        name: data.name,
        id: data.name + 'id',
        star: 0,
        like: 0,
        message: 0,
        image: {
          url: `images/${data.imgName}`,
          alt: data.imgName,
        },
        title: data.title,
        content: data.content,
        link: data.name + "-note",
        createTime: new Date()
      }
      let content = JSON.parse(ele);
      content.push(newObj);
      fs.writeFile('datas/categories.json', JSON.stringify(content), 'utf8', function(err){
        if(err){
          return console.error(err);
        }
        if(!fs.existsSync(`../source/categories/${data.name}-note`)){
          fs.mkdir(path.resolve(__dirname, `../source/categories/${data.name}-note`), function(err, file){
            if(err){
              console.log(err);
            }
          });
        }
        res.send(JSON.stringify({code: 1, content}));
      })
    })  
  } catch (error) {
    console.error(error);
  }
}

module.exports = router;
