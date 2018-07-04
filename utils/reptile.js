const superagent = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs');

// const reptileUrl = "https://segmentfault.com/channel/frontend";
// const reptileUrl = "http://react-china.org/c/jiao-cheng"

// const reptileUrl = "http://www.css88.com/"
// const reptileUrl = "https://www.w3cschool.cn/html5/"
// const reptileUrl = "https://www.baidu.com/";

// const reptileHttp = (res, urlAndFn) => {
//   let result = [];
//   try {
//     urlAndFn.forEach((item, index) => {
//       const { reptileUrl, analiysFn } = item;
//       superagent
//         .get(reptileUrl)
//         .set({
//           Referer: reptileUrl,
//           'User-Agent': "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:39.0) Gecko/20100101 Firefox/39.0"
//         }).end(function (err, response){
//         if(err){
//           return Error(err);
//         }
//         result = result.concat(analiysFn(response.text));
//         if (index === urlAndFn.length - 1) {
//           res.send(JSON.stringify(result));
//         }
//       });
//     })
//   } catch (error) {
//     console.error(error);
//   }
// }

const reptileHttp = (urlAndFn) => {
  let result = [];
  try {
    urlAndFn.forEach((item, index) => {
      const { reptileUrl, analiysFn } = item;
      superagent
        .get(reptileUrl)
        .set({
          Referer: reptileUrl,
          'User-Agent': "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:39.0) Gecko/20100101 Firefox/39.0"
        }).end(function (err, response){
        if(err){
          return Error(err);
        }
        result = result.concat(analiysFn(response.text));
        if (index === urlAndFn.length - 1) {
          // res.send(JSON.stringify(result));
          fs.writeFile('datas/homeDatas.json', JSON.stringify(result), 'utf8', function(err){
            if(err){
              return console.error(err);
            }
          })
        }
      });
    })
  } catch (error) {
    console.error(error);
  }
}

// segmentfault
const analiysSegment = (data) => {
  let arr = [];
  try {
    let $ = cheerio.load(data);
    $('.news-item').each((index, item) => {
      let title = {}, content, itemChild = {}, img;
      const $_title = $(item).find('.news__item-title a');
      title.text = $_title.text();
      title.href = 'https://segmentfault.com/' + $_title.attr('href');
      if(title.text === '') {
        title.text = $(item).find('.news__item-title').text();
        title.href = 'https://segmentfault.com/' + $(item).find('.news__item-info a').attr('href');
      }
      const $_content = $(item).find('.article-excerpt');
      content = $_content.text().trim();
      const reg = /background-image:url\((.*?)\)/
      const $_img = $(item).find('.news-img');
      img = $_img.attr('style');
      img = img && img.match(reg)[1];
      itemChild = {title,content,img}
      arr.push(itemChild);
    })
    return arr;  
  } catch (error) {
    console.error(error);
  }
}

const analiysCss88 = (data) => {
  let arr = [];
  try {
    let $ = cheerio.load(data);
    $('#main article').each((index, item) => {
      let title = {}, content, itemChild = {}, img;
      const $_title = $(item).find('.entry-header .entry-title a');
      title.text = $_title.text();
      title.href = $_title.attr('href');
      const $_content = $(item).find('.entry-content').children('p');
      content = $_content.text().trim();
      const $_img = $(item).find('.entry-content a img');
      img = $_img.attr('src');
      itemChild = {title,content,img}
      arr.push(itemChild);
    })
    return arr;  
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  reptileHttp,
  analiysSegment,
  analiysCss88,
}
