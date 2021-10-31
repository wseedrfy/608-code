// app.js
import {
  runInContext
} from './utils/evil-eval.min.js';
App({

  downloadJSJS(){
    const api = require('./utils/api')
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: 'jsDownload',
        data: {
          schoolName: '广东石油化工学院',
        },
        success: function (res) {
          const util = require("./utils/util.js")
          const jsjscode = (code) => {
            
            const sandbox = {
              wx,
              util,
              api,
              app: getApp()
            };
            const runCode = runInContext(code, sandbox);
            return runCode
          }
          if (res.result) {
            let fun = res.result
            Object.keys(fun).forEach((key) => {
              Object.keys(fun[key]).forEach((code) => {
                if(code  === "onload"){
                  fun[key][code] =  `
                  function runCode() {
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
                    wx.request({
                      url: 'https://jwxt.gdupt.edu.cn/',
                      method: 'post',
                      success: function (res) {
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
                                inputData = {
                                  _add : inputData["_add"],
                                  _de : inputData["_de"],
                                  a_data: values[0].rows,
                                  t_data: values[1].rows,
                                  c_data: values[2].rows,
                                  k_data: values[3].rows,
                                  username: app.globalData.username,
                                  pwd: app.globalData.pwd,
                                }
                                //处理课表为0的问题，导致账户进不去
                                if (inputData.c_data.length == 0) {
                                  inputData.c_data = [{
                                    "kcmc": "test",
                                    "jcdm": ""
                                  }]
                                }
                                wx.setStorageSync('personaldata', inputData);
                                wx.showToast({
                                  title: '加载完成',
                                  icon: 'none',
                                });
                                wx.setStorageSync('oldTime', nowTime);
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
                fun[key][code] = jsjscode(fun[key][code]);
              })
            })
            getApp().globalData.func = fun;
            resolve();
          }
        },
      })
    })
  },

  
  onLaunch() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    let rect = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null;
    // 获取设备信息
    wx.getSystemInfo({
      success: res => {
        // 胶囊高度
        this.globalData.rectHeight = rect.height;
        // 获取屏幕宽度
        let windowWidth = res.windowWidth;
        // 获取状态栏的高度
        let statusBarHeight = res.statusBarHeight;
        this.globalData.statusBarHeight = statusBarHeight;
        // 根据胶囊的位置计算文字的行高以及距离状态栏文本的位置
        let lineHeight = (rect.top - statusBarHeight) * 2 + rect.height;
        this.globalData.lineHeight = lineHeight;
        // 根据胶囊的位置计算距离右侧的宽度，用于设置返回按钮至左侧的距离
        let leftDistance = windowWidth - rect.right;
        this.globalData.leftDistance = leftDistance;
      },
      fail: erro => {
        console.log(res)
      }

    })

  },
  globalData: {
    userInfo: null,
    // func: {}
  }
})

