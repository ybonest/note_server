const schedule = require("node-schedule");
const { reptileHttp, analiysSegment, analiysCss88 } = require('./reptile.js');

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

module.exports = function(){
  var rule3     = new schedule.RecurrenceRule();
  reptileHttp(urlAndFn);
  var times3    = [1,5,9,13,17,21];
  rule3.hour  = times3;
  let flag = 0;
  schedule.scheduleJob(rule3, function(){
    fs.readFile('datas/timerTaskFlag.json', 'utf8', function(err, data){
      if(err){
        return console.error(err);
      }
      let content = JSON.parse(data);
      content.push({flag: ++flag, date: new Date()});
      fs.writeFile('datas/timerTaskFlag.json', JSON.stringify(content), 'utf8', function(err){
        if(err){
          return console.error(err);
        }
      })
    })
    reptileHttp(urlAndFn);
  });
}

