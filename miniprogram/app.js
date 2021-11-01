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

