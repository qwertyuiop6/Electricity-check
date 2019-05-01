var http = require('http');
var cheerio = require('cheerio');

// cheerio处理页面
function parseHtml(data){
  var $ =cheerio.load(data);
  var bg=$('html').find('tbody');
  let itemlist={
      room:bg.find('tr:first-child').text(),
      www:$('html').find('#Energy-1').text().replace(/^\d0{4,7}/g,''),
      yue:bg.find('tr:nth-child(3)').find('td:nth-child(2)').text(),
      zong:bg.find('tr:nth-child(4)').find('td:nth-child(2)').text(),
      light:bg.find('tr:nth-child(5)').find('td:nth-child(2)').text(),
      kongtiao:bg.find('tr:nth-child(5)').find('td:nth-child(4)').text(),
      light_on:$('html').find('#tspan22058-7-8').text(),
      kongtiao_on:$('html').find('#tspan22058-7-8-1').text()
    };
    for (let key in itemlist) {
        itemlist[key]= itemlist[key].replace(/\s+/g, '');
    }

  return itemlist;
}

// 导出搜索接口
module.exports=(url)=>{
    return new Promise((resolve,reject)=>{
        http.get(url, (res)=>{
            let data='';
            res.on("data",(chunk)=>{
                data+=chunk;
            });
            res.on("end",()=> {
                console.log("Got response: " + res.statusCode+" "+res.statusMessage);
                resolve(parseHtml(data));
            });
        }).on('error', (e)=> {console.log("查询错误: " + e.message);});
    });
};

