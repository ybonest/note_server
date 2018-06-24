const fs = require('fs');
const marked = require('marked');

function readFnMd(obj) {
  // const { filePath, name } = obj;
  // fs.watch('../source/categories/introduce.md',{encoding: 'buffer'}, (eventType, filename) => {
  //   if(filename){
  //     console.log(filename);
  //   }
  // })
  // return new Promise(function(resolve,reject){
    fs.readFile('../source/categories/introduce.md', function(err, data){
      var html = marked(data.toString());
      // resolve(html)
      console.log(html);
      
    // })
  })
}

readFnMd()

module.exports = {
  readFnMd
}