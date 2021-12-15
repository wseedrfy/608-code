var got = require('got'); //引用 got
var iconv = require("iconv-lite");
const cloud = require('wx-server-sdk');
const querystring = require("querystring");
cloud.init();
const db = cloud.database()
const _ = db.command;
var iconv = require('iconv-lite');
var BufferHelper = require('bufferhelper');
const fs = require('fs')
const utils = require("../../../utils/recogCaptcha")

const login = async (username, password) => {
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
  try {
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
        TextBox1: username,
        TextBox2: password,
        TextBox3: code1 //验证码
      })
    })
  } catch (e) {
    if (String(e).match(/405/)) {
      return cookie[0]
    } else {
      return '错误'
    }
  }
  // return encoder.encode(str);
  var bufferHelper = new BufferHelper();
  bufferHelper.concat(postResponse.rawBody);
  let returnData = iconv.decode(bufferHelper.toBuffer(), 'GBK')
  return String(returnData)
}
// 云函数入口函数
exports.main = async (username, password) => {
  var returnData = await login(username, password)
  console.log(returnData)
  while (true) {
    if (returnData.match(/用户名或密码不正确/)) {
      return {
        msg: '账号密码错误'
      }
    } else if (returnData.match(/SessionId/)) {
      break
    } else if (returnData.match(/验证码/)) {
      returnData = await login(username, password)
    } else {
      return {
        msg: '异常'
      }
    }
  }
  //获取名字
  let cookie = returnData;

  let getname = await got('https://jwc.mmpt.edu.cn/xs_main.aspx?xh=' + username, {
    headers: {
      "Referer": "https://jwc.mmpt.edu.cn/xs_main.aspx?xh=" + username,
      "Content-Type": "text/html;charset=gb2312",
      "Cookie": cookie,
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
    }

  });
  var Test = new BufferHelper();
  Test.concat(getname.rawBody);
  let testname = iconv.decode(Test.toBuffer(), 'GBK')
  // <span id="xhxm">(?s:(.*?))同学
  regname = /欢迎您：<em><span id="xhxm">(.*?)同学/g;
  for (let regExpMatchArray of testname.matchAll(regname)) {
    var name = regExpMatchArray[1]
  }
  const str = encodeURI(name);
  var xh = username

  var Test = new BufferHelper();


  //获取__VIEWSTATE
  let get_VIEWSTATE = await got('https://jwc.mmpt.edu.cn/xscjcx.aspx?xh=' +
    username +
    "&xm=" +
    name +
    '&gnmkdm=N121605', {
      headers: {
        "Referer": "https://jwc.mmpt.edu.cn/xs_main.aspx?xh=" + username,
        "Content-Type": "text/html;charset=gb2312",
        "Cookie": cookie,
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
      },
    });
  Test.concat(get_VIEWSTATE.rawBody);
  testname = iconv.decode(Test.toBuffer(), 'GBK')
  get_VIEWSTATE_reg = /<input type="hidden" name="__VIEWSTATE" value="(.*?)" \/>/g;
  var regExpMatchArrays = testname.matchAll(get_VIEWSTATE_reg);
  for (let regExpMatchArray of regExpMatchArrays) {
    var VIEWSTATE = regExpMatchArray[1];
  }


  let getResponse = await got('https://jwc.mmpt.edu.cn/xskbcx.aspx?xh=' +
    xh +
    '&xm=' + str + '&gnmkdm=N121603', {
      headers: {
        "Referer": "https://jwc.mmpt.edu.cn/xs_main.aspx?xh=" + xh,
        "Content-Type": "text/html;charset=gb2312",
        "Cookie": cookie,
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
      },

    })

  getname = await got.post('https://jwc.mmpt.edu.cn/xscjcx.aspx?xh=' +
    username +
    "&xm=" +
    str +
    "&gnmkdm=N121605", {
      headers: {
        "Referer": "https://jwc.mmpt.edu.cn/xscjcx.aspx?xh=31902200128&xm=%D0%BB%B6%AB%B2%C5&gnmkdm=N121605",
        "Cookie": cookie,
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
      },
      body: querystring.stringify({
        btn_zcj: "历年成绩",
        __VIEWSTATE: VIEWSTATE
      })
    });
  var getname_codice = new BufferHelper();
  getname_codice.concat(getname.rawBody)
  let getname_test = iconv.decode(getname_codice.toBuffer(), 'GBK')
  console.log(getname_test)

  var bufferHelper = new BufferHelper();
  bufferHelper.concat(getResponse.rawBody);
  let body = iconv.decode(bufferHelper.toBuffer(), 'GBK')

  Array.prototype.notempty = function () {
    var arr = [];
    this.map(function (val, index) {
      let buf = val.split("<\/td>")
      //过滤规则为，不为空串、不为null、不为undefined，也可自行修改
      if (buf.length > 2) {
        arr.push(val);
      }
    });
    return arr;
  }

  // 仅剩<tr>和<td>标签
  var test = formatContent(body)
  // tr用来分片
  test = test.replace(/<tr>/ig, "");
  var arr = test.split("</tr>")
  // 去除（去除非课表元素后的）空数组
  arr = arr.notempty()
  reg = /<td>(.*?)<\/td>/g;
  newreg = /周(.*?)第(.*?),(.*?)节{第(.*?)-(.*?)周}/g; //用来划分某周某天某节课
  let test_br;
  let temp = [];
  let all = [];
  for (let kb of arr) {
    let matchAll = kb.matchAll(reg);
    for (let matchAllElement of matchAll) {
      test_br = matchAllElement[1].split("<br>")
      if (test_br.length >= 4) {
        //判断是否为课表内容
        if (test_br.length > 6) {
          let p1 = [],
            p2 = [];
          for (let i = 0; i < (test_br.length - 1) / 2; i++) {
            if (test_br[i] !== "")
              p1.push(test_br[i]);
          }
          temp.push(p1);
          for (let i = (test_br.length - 1) / 2; i < test_br.length; i++) {
            if (test_br[i] !== "")
              p2.push(test_br[i]);
          }
          temp.push(p2)

        } else {
          temp.push(test_br)
        }
      }
    }

  }
  for (let tempElement of temp) {
    let matchAll1 = tempElement[1].matchAll(newreg);
    for (let matchAll1Element of matchAll1) {
      //将周 节 天 分出
      tempElement.push(matchAll1Element[1]);
      tempElement.push(parseInt(matchAll1Element[2]));
      tempElement.push(parseInt(matchAll1Element[3]));
      tempElement.push(parseInt(matchAll1Element[4]));
      tempElement.push(parseInt(matchAll1Element[5]));
    }
    // console.log(tempElement)
  }
  for (let i = 0; i < 20; i++) {
    let week = new Array(7)
    for (let j = 0; j < 7; j++) {
      let week_day = new Array(10)
      for (let k = 0; k < 10; k++) {
        for (let tempElement of temp) {
          let length = tempElement.length;
          let week_day_i = 0;
          switch (tempElement[length - 5]) {
            case "一":
              week_day_i = 0;
              break;
            case "二":
              week_day_i = 1;
              break;
            case "三":
              week_day_i = 2;
              break;
            case "四":
              week_day_i = 3;
              break;
            case "五":
              week_day_i = 4;
              break;
            case "六":
              week_day_i = 5;
              break;
            case "日":
              week_day_i = 6;
              break;
          }
          let min = tempElement[length - 2],
            max = tempElement[length - 1];
          if (min <= i + 1 && i + 1 <= max && week_day_i === j) {
            let course = [];
            //存放内容
            course.push(tempElement[0])
            course.push(tempElement[2])
            course.push(tempElement[3])
            week_day[tempElement[length - 4] - 1] = course;

          }
        }
      }
      week[j] = week_day
    }
    all.push(week)
  }
  let m = []
  const isNotEmpty = arr => Array.isArray(arr) && arr.length > 0;
  for (let i = 0; i < all.length; i++) {
    let week = all[i];
    for (let j = 0; j < week.length; j++) {
      let day = week[j];
      for (let k = 0; k < day.length; k++) {
        // console.log(day[k].length);
        let course = day[k];
        if (!isNotEmpty(course)) continue;
        let object = {
          kcmc: course[0], //课程名称
          teaxms: course[1], //老师
          jxcdmc: course[2],
          xq: "" + (j + 1), //星期
          zc: "" + (i + 1), //周
          jcdm: "0" + (k + 1) + "0" + (k + 2) //节数
        }
        m.push(object)
      }

    }

  }

  return {
    otherData: {
      curriculum: m
    }
  }

  function formatContent(str) {

    // 去除指定标签的行内元素
    str = str.replace(/<head>([\S\s]*?)<\/head>/ig, "");
    str = str.replace(/<script([\S\s]*?)<\/script>/ig, "");
    str = str.replace(/<!--([\S\s]*?)-->/ig, "");
    str = str.replace(/<td([\S\s]*?)>/ig, "<td>");
    str = str.replace(/<tr([\S\s]*?)>/ig, "<tr>");
    str = str.replace(/<td>第([\S\s]*?)节<\/td>/ig, "");

    // 去除指定标签及其包含内容
    str = str.replace(/<\/?(!DOCTYPE|!--|html|head|title|meta|body|font|em|input|div|form|p|span|table|select|option)\b[^>]*>/ig, "");

    // 去除空行
    str = str.replace(/<td>&nbsp;<\/td>/ig, "");
    str = str.replace(/&nbsp;/ig, "");
    // 清除所有换行和空格
    str = str.replace(/[\r\n]/g, "");
    str = str.replace(/[\t]+/g, "");

    // 去除没用的字段标签
    str = str.replace(/<tr><\/tr>/ig, "");
    str = str.replace(/<\/tr><br>([\S\s]*?)<\/tr>/ig, "<tr>");
    str = str.replace(/<tr><td><tr>([\S\s]*?)<\/tr><\/td><\/tr>/ig, "");
    str = str.replace(/<\/td>/ig, "<\/td>");
    str = str.replace(/<\/tr>/ig, "<\/tr>");

    return str;

  }
}