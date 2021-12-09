var got = require('got'); //引用 got
var querystring = require("querystring");
const cloud = require('wx-server-sdk');
const {get} = require("../../../../../miniprogram/utils/api");
cloud.init();
const db = cloud.database()
const _ = db.command;

// 云函数入口函数
exports.main = async (event) => {
  if (!(event.password && event.username)) {
    return {msg: '没有账号或者密码'}
  }
  const wxContext = cloud.getWXContext()
  //获取cookie
  let getResponse = await got('https://jwc.mmpt.edu.cn/default2.aspx') 
  let cookie = getResponse.headers["set-cookie"]
  //获取验证码
  let yzm = await  got.get('https://jwc.mmpt.edu.cn/CheckCode.aspx',
      {
        headers:{
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge / 18.18362',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Accept': 'application/json, text/javascript, */*; q=0.01',
          'Cookie': cookie
        }
      }
      )
      //发送post请求给default2尝试登录
  let postResponse = await got.post('https://jwc.mmpt.edu.cn/default2.aspx', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge / 18.18362',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Cookie': cookie

    },
    body: querystring.stringify({ //把json数据（对象）解析成字符串
      __VIEWSTATE:"dDw3OTkxMjIwNTU7Oz5qFv56B08dbR82AMSOW+P8WDKexA==", //登录参数
      Button1:"", //按钮参数
      TextBox1: event.username,
      TextBox2: event.password,
      TextBox3: event.iconUrl//验证码
    })
  })
}
