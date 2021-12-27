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
    model:{
      title: "圣诞树下的悄悄话",
      src: "../../images/model.png",
      time: "*活动时间: 2021.12.24-12.26"
    }
  },
  onPullDownRefresh(){
    wx.showNavigationBarLoading() //在标题栏中显示加载
    console.log("下拉刷新")
    var that = this
    setTimeout( function() {
      var args = wx.getStorageSync('args')
      if (args) {
        try {
          var onload = app.jsRun(args, args.jsCode)
          onload(that)
        } catch (e) {
          console.log(e)
        }
      }
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },1500);
    console.log("over")
  },
  async onLoad(options) {
    var that = this;
    var args = wx.getStorageSync('args')
    if (args) {
      try {
        var onload = app.jsRun(args, args.jsCode)
        onload(that, options)
      } catch (e) {
        console.log(e)
      }
    }
    await wx.cloud.callFunction({
      name: 'api',
      data: {
        url: 'indexLoading',
      },
      success: res => {
        var new_args = res.result
        if (!(JSON.stringify(new_args) === JSON.stringify(wx.getStorageSync('args')))) {
          console.log("进入函数更新")
          var onload = app.jsRun(new_args, new_args.jsCode)
          wx.setStorageSync('args', new_args)
          try {
            onload(that)
          } catch {
            that.setData({
              msg: '有超级bug，请联系开发查看函数'
            })
          }
        }
      },
      fail: res => {
        console.log(res)
        wx.showToast({
          icon: 'none',
          title: "模版请求错误",
        })
      }
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: 'WE校园',
    }
  },
  onShareTimeline: function(res) {
    return {
      title: 'WE校园'
    }
  }
  
})