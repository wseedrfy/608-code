// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    time: {
      date: new Date().getDate(),
      month: new Date().getMonth(),
      day: new Date().getDay(),
    },
  },
  async onLoad() {
    var that = this;
    var args = wx.getStorageSync('args')
    if(args){
      var onLoad = app.jsRun(args, args.jsCode)
      onLoad(that)
    }
    await wx.cloud.callFunction({
      name: 'api',
      data: {
        url: 'indexLoading',
      },
      success: res => {
        var args = res.result
        var onLoad = app.jsRun(args, args.jsCode)
        wx.setStorageSync('args', args)
        onLoad(that)
      },
      fail: res => {
        wx.showToast({
          icon: 'none',
          title: "模版请求错误",
        })
      }
    })

  },
})