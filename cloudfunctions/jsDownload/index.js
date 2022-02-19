// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const code = `
  function runCode(that) {
    var course = [];
    var msg = "";
    var zc = 0;
    var personalInformation = wx.getStorageSync('personalInformation')
    var configData = wx.getStorageSync('configData')
    var curriculum = personalInformation.curriculum;
    if(!curriculum){
      return
    }
    var xq = new Date().getDay();
    if (xq == 0) {
      xq = 7;
    }
    for (var y = 0; y < curriculum.length; y++) {
      zc = curriculum[y].zc
      if (curriculum[y].xq == "7") {
        zc = String(Number(curriculum[y].zc) - 1)
      }
      if (zc == util.getweekString() && curriculum[y].xq == xq) {
        course.push({
          day: '今天',
          time: '第' + curriculum[y].jcdm[1] + '节',
          name: curriculum[y].kcmc,
          site: curriculum[y].jxcdmc,
        })
      }
      // course.sort((b, a) => b.time.localeCompare(a.time, 'zh'))
    }
    personalInformation.curriculum = curriculum;
    wx.setStorageSync('personalInformation', personalInformation)
    if (course.length == 0) {
      msg = "今天没有课哟～出去玩吧"
    }
    console.log(msg)
    that.setData( Object.assign({
      course: course,
      show: '',
      msg: msg,
    }, configData))
  }
  module.exports = runCode;
`;
  return {
    index: {
      onshow: code,
      onload: `
      function runCode(that) {
        var PromiseAllArr = []; //*********************用来存多个Promise
        var urlData = [{
            url: "https://jwxt.gdupt.edu.cn/xskccjxx!getDataList.action",
            data: {
              'xnxqdm': '',
              'page': '1',
              'rows': '500',
              'sort': 'xnxqdm,kcbh,ksxzdm',
              'order': 'asc',
            }
          },
          {
            url: "https://jwxt.gdupt.edu.cn/xsktsbxx!getYxktDataList.action",
            data: {
              'xnxqdm': '',
              'page': '1',
              'rows': '100',
              'sort': 'cjsj',
              'order': 'desc',
            }
          },
          {
            url: "https://jwxt.gdupt.edu.cn/xsgrkbcx!getDataList.action",
            data: {
              'xnxqdm': "202101",
              'page': '1',
              'rows': '1000',
              'sort': 'kxh',
              'order': 'asc',
            }
          },
          {
            url: "https://jwxt.gdupt.edu.cn/xskktzd!getDataList.action",
            data: {
              'xnxqdm': "",
              'page': '1',
              'rows': '2000',
              'sort': 'kcbh',
              'order': 'asc',
              'kcmc': '',
              'kcfldm': '',
              'kcdldm': ''
            }
          }
        ]
        wx.setStorageSync('configData', { "timeYear": "2021-08-30",
        "inform": [{
          "comment": "消息",
          "name": "下拉可刷新，课本可左右滑动",
          "tiele": "下拉可刷新，课本可左右滑动"
        }, {
          "comment": "消息",
          "name": "下拉可刷新，课本可左右滑动",
          "tiele": "下拉可刷新，课本可左右滑动"
        }],
        "iconList": [{
          "id": "1",
          "url": "achievement/achievement",
          "icon": "../../images/icon/grade.png",
          "name": "成绩"
        }, {
          "id": "1",
          "url": "achievement/achievement",
          "icon": "../../images/icon/grade.png",
          "name": "成绩"
        }]
      })
        wx.request({
          url: 'https://jwxt.gdupt.edu.cn/',
          method: 'post',
          success: function (res) {
            console.log(app.globalData.username)
            console.log(app.globalData.pwd)
            wx.request({
              url: 'https://jwxt.gdupt.edu.cn/login!doLogin.action',
              method: 'post',
              data: {
                account: app.globalData.username,
                pwd: app.globalData.pwd,
                verifycode: ''
              },
              header: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Cookie': res.cookies[0]
              },
              success: function (res1) {
                if (res1.data.msg == "/login!welcome.action") {
                  var header = {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Cookie': res.cookies[0]
                  }
                  for (var k = 0; k < urlData.length; k++) {
                    PromiseAllArr.push(
                      new Promise(function (resolve, reject) {
                        wx.request({
                          url: urlData[k].url,
                          data: urlData[k].data,
                          method: 'post',
                          header: header,
                          success: function (getinfo) {
                            return resolve(getinfo.data);
                          },
                          fail: function (error) {
                            return error;
                          },
                          complete: function (complete) {
                            return complete;
                          }
                        })
                      })
                    )
                  }
                  var data = {}
                  //*********************Promise存好了，现在来用
                  Promise.all(PromiseAllArr).then(function (values) {
                     var inputData = {
                      a_data: values[0].rows,
                      t_data: values[1].rows,
                      curriculum: values[2].rows,
                      k_data: values[3].rows,
                      username: app.globalData.username,
                      pwd: app.globalData.pwd,
                    }
                    //处理课表为0的问题，导致账户进不去
                    if (inputData.curriculum.length == 0) {
                      inputData.curriculum = [{
                        "kcmc": "test",
                        "jcdm": ""
                      }]
                    }
                    wx.setStorageSync('personalInformation', inputData);
                    var course = [];
                    var msg = "";
                    var zc = 0;
                    var configData = wx.getStorageSync('configData')
                    var personalInformation = wx.getStorageSync('personalInformation')
                    var curriculum = personalInformation.curriculum;
                    if(!curriculum){
                      return
                    }
                    var xq = new Date().getDay();
                    if (xq == 0) {
                      xq = 7;
                    }
                    for (var y = 0; y < curriculum.length; y++) {
                      zc = curriculum[y].zc
                      if (curriculum[y].xq == "7") {
                        zc = String(Number(curriculum[y].zc) - 1)
                      }
                      if (zc == util.getweekString() && curriculum[y].xq == xq) {
                        course.push({
                          day: '今天',
                          time: '第' + curriculum[y].jcdm[1] + '节',
                          name: curriculum[y].kcmc,
                          site: curriculum[y].jxcdmc,
                        })
                      }
                      // course.sort((b, a) => b.time.localeCompare(a.time, 'zh'))
                    }
                    personalInformation.curriculum = curriculum;
                    wx.setStorageSync('personalInformation', personalInformation)
                    that.onShow()
                    wx.showToast({
                      title: '加载完成',
                      icon: 'none',
                    });
                  }).catch(function (reason) {
                    wx.showToast({
                      title: '本地完成',
                      icon: 'none',
                    });
                  });
                } else {
                  wx.clearStorageSync();
                  app.globalData.username = 0;
                  app.globalData.pwd = 0;
                  wx.showToast({
                    title: '加载完成',
                    icon: 'none',
                  });
                }
              }
            })
          }
        })
      }
      module.exports = runCode;
      
    `
    }
  }
}