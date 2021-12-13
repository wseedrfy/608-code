var got = require('got'); //引用 got
var querystring = require("querystring");
var iconv = require("iconv-lite");
var BufferHelper = require('bufferhelper');
var http = require("http");
const cloud = require('wx-server-sdk');
const {decode} = require("querystring");
var cheerio=require("cheerio");
cloud.init();
const db = cloud.database()
const _ = db.command;

// 云函数入口函数
exports.main = async (event) => {

    const str =encodeURI('谢东才');
    var xh = "31902200128"
    let cookie =  "ASP.NET_SessionId=0ehsxgnsl3a4uzr5gosiuu55";
    let getResponse = await got('https://jwc.mmpt.edu.cn/xskbcx.aspx?xh=' +
        xh+
        '&xm='+str+'&gnmkdm=N121603', {
        headers: {
            "Referer": "https://jwc.mmpt.edu.cn/xs_main.aspx?xh="+xh,
            "Content-Type":"text/html;charset=gb2312",
            "Cookie":cookie,
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
        },

    }) //get请求 用httpbin.org这个网址做测试
    var BufferHelper = require('bufferhelper');
    var bufferHelper = new BufferHelper();
    bufferHelper.concat(getResponse.rawBody);
    let body = iconv.decode(bufferHelper.toBuffer(),'GBK')
    let reg = /<td align="Center"(.*?)<br>(.*?)<br>(.*?)<br>(.*?)<\/td>/g;
    let reg1 = /[^a-z0-9A-Z">=%; &\/<](.*)/g;
    var regExpMatchArrays = body.matchAll(reg);
    for (let regExpMatchArray of regExpMatchArrays) {
        var regExpMatchArrays1 = regExpMatchArray[1].matchAll(reg1);
        for (let regExpMatchArray1 of regExpMatchArrays1) {
            console.log(regExpMatchArray1);
        }
    }
}
