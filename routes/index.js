var express = require('express');
var router = express.Router();
const fs = require('fs');
const marked = require('marked');
const { TreeMd, pinyinConcat } = require('../utils/tree.js');
const pinyin = require('pinyin');
const { reptileHttp, analiysSegment, analiysCss88 } = require('../utils/reptile.js');


/* GET home page. */
router.get('/api/note', function(req, res, next) {
  const { arg,arg1,arg2 } = req.query;
  if(arg&&arg1&&arg2){
    fs.readFile(`source/${arg}/${arg1}/${arg2}.md`, function(err, data){
      if(err){
        return res.send('read files failured');
      }
      const tree = TreeMd(data);
      var rendererMD = new marked.Renderer();
      rendererMD.heading = function(text, level, raw) {
        const id = pinyinConcat(pinyin(raw.trim(),{style: pinyin.STYLE_NORMAL})).toLocaleLowerCase();
        if (this.options.headerIds) {
          return '<h'
            + level
            + ' id="'
            + id
            + '">'
            + text
            + '</h'
            + level
            + '>\n';
        }
        return '<h' + level + '>' + text + '</h' + level + '>\n';
      };
      var html = marked(data.toString(), { renderer: rendererMD });
      res.send(JSON.stringify({html, tree}));
    })
  } else {
    res.send('params is undefined or wrong')
  }
});

router.get('/api/sidebar', function(req, res, next) {
  fs.readFile('config.json', function(err, data){
    res.send(data);
  })
});

router.get('/api/categories', function(req, res, next) {
  fs.readFile('datas/categories.json', function(err, data){
    if(err){
      return console.error(err);
    }
    res.send(data);
  })
});

router.get('/api/bloglink', function(req, res, next) {
  fs.readFile('datas/bloglink.json', function(err, data){
    if(err){
      return console.error(err);
    }
    res.send(data);
  })
});

router.post('/api/addbloglink', function(req, res, next) {
  const { params } = req.body;
  const reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
  // console.log(params.href.test(reg));
  if(!reg.test(params.href)){
    const result = {err:'不是正确格式的链接',code:0}
    return res.send(JSON.stringify(result));
  }
  fs.readFile('datas/bloglink.json', 'utf8', function(err, data){
    if(err){
      return console.error(err);
    }
    // res.send(data);
    let content = JSON.parse(data);
    content.push(params);
    fs.writeFile('datas/bloglink.json', JSON.stringify(content), 'utf8', function(err){
      if(err){
        return console.error(err);
      }
      res.send(JSON.stringify({code: 1, data: content}));
    })
  })
})

router.get('/api/aeptile', function(req, res, next) {
  const urlAndFn = [
    {
      reptileUrl: 'https://segmentfault.com/channel/frontend',
      analiysFn: analiysSegment
    },
    {
      reptileUrl: 'http://www.css88.com/',
      analiysFn: analiysCss88
    }
  ]
  reptileHttp(res ,urlAndFn);
})
module.exports = router;
