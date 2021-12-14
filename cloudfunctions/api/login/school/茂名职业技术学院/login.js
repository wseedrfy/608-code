var got = require('got'); //引用 got
const utils = require("../../../utils/recogCaptcha")
var querystring = require("querystring");
const fs = require('fs');
// 云函数入口函数
exports.main = async (event) => {
  if (!(event.password && event.username)) {
    return {
      msg: '没有账号或者密码'
    }
  }
  //获取cookie
  let getResponse = await got('https://jwc.mmpt.edu.cn/default2.aspx')
  let cookie = getResponse.headers["set-cookie"]
  //获取验证码
  const writer = await fs.createWriteStream('/tmp/a.gif', {
    //默认值为w， 通过调用writer.write方法写入数据的时候，会直接覆盖文件所有的内容，
    // 即会把文件之前的内容全部再删除，写入新的数据
    flags: 'w'
  })
  var ab = await got('https://jwc.mmpt.edu.cn/CheckCode.aspx?', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge / 18.18362',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Cookie': cookie
    }
  })
  await writer.write(ab.rawBody)
  // let ab = await got('https://jwc.mmpt.edu.cn/CheckCode.aspx')
  // writer.write(ab.rawBody)
  let code1
  await utils.recogCaptcha('/tmp/a.gif', function (code) {
    code1 = code
  })
  let postResponse
  try{
    postResponse = await got.post('https://jwc.mmpt.edu.cn/default2.aspx', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge / 18.18362',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Cookie': cookie
      },
      body: querystring.stringify({ //把json数据（对象）解析成字符串
        __VIEWSTATE: "dDw3OTkxMjIwNTU7Oz5qFv56B08dbR82AMSOW+P8WDKexA==", //登录参数
        Button1: "", //按钮参数
        TextBox1: event.username,
        TextBox2: event.password,
        TextBox3: code1 //验证码
      })
    })
  }catch(e){
    if(String(e).match(/405/)){
      return {msg: 'welcome'}
    }else{
      return '错误'
    }
  }

  // return encoder.encode(str);
  var iconv = require('iconv-lite'); 
  var BufferHelper = require('bufferhelper');
  var bufferHelper = new BufferHelper();
  bufferHelper.concat(postResponse.rawBody);
  let returnData = iconv.decode(bufferHelper.toBuffer(),'GBK')

  if(returnData.match(/用户名或密码不正确/)){
    return {msg: '账号密码错误'}
  }else if(returnData.match(/验证码不正确/)){
    return {msg: '呜呜呜，人工智障没有识别出验证码，可以重新点击登录哟'}
  }else{
    return {msg: '异常'}
  }
  console.log(returnData.match(/用户名/))
  // console.log(retu)

}
