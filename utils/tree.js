const pinyin = require('pinyin');

function TreeMd(data){
  data = data.toString();
  const reg = /\#(.*?)(?=\&\*\&)/g;
  const splitReg = /\\s+|\n+|\t+|\r+/;
  data = data.split(splitReg);

  let arr = [];
  data.forEach((item) => {
    if(/^\#/.test(item)){
      arr.push(item.trim());
    }
  })
  return TreeDG(arr);
};

function TreeDG(data){
  let arr = [];
  let flagIndex = 0;
  data.forEach((item, index) => {
    const count = item.match(/\#/g);
    flagIndex = index;
    const removeReg = /^\#*/;
    const ele = item.replace(removeReg, "");
    arrDG(arr, ele, count.length);
  })
  return arr;  
}

function arrDG(arr, item, type){
  const id = pinyinConcat(pinyin(item.trim(),{style: pinyin.STYLE_NORMAL})).toLocaleLowerCase();
  if(arr.length === 0 || type === 1){
    arr.push({name: item, type, id })
    return;
  }
  let childArr = [];
  let lastV = arr[arr.length-1];
  const lastVType = lastV.type;
  if(lastV.type >= type) {
    arr.push({name: item, type, id })
    return;
  }
  if(lastV.child) {
    let lastVChild = lastV.child[lastV.child.length-1];
      arrDG(lastV.child, item, type);
  } else {
    lastV['child'] = [{name: item, type, id}]
  }
}

function pinyinConcat(arr){
  let pinyin = ''
  arr.forEach((item) => {
    pinyin = pinyin + item[0].trim()
  })
  return pinyin;
}

module.exports = {
  TreeMd,
  pinyinConcat
}