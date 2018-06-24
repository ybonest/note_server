var express = require('express');
var router = express.Router();
const fs = require('fs');
const marked = require('marked');
const { TreeMd, pinyinConcat } = require('../utils/tree.js');
const pinyin = require('pinyin');


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
            // + raw.toLowerCase().replace(/[^\w]+/g, '-')
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

module.exports = router;
