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
  // onPullDownRefresh(){
  //   wx.showNavigationBarLoading() //在标题栏中显示加载
  //   console.log("下拉刷新")
  //   setTimeout( function() {
  //     wx.hideNavigationBarLoading() //完成停止加载
  //     wx.stopPullDownRefresh() //停止下拉刷新
  //   },1500);
  //   console.log("over")
  // },
  async onLoad() {
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.request({
      url: "https://jwc.mmpt.edu.cn/xskbcx.aspx?xh=31902200128&xm=谢东才&gnmkdm=N121603",
      data: {
      },
      header: {
        "Referer": "https://jwc.mmpt.edu.cn/xskbcx.aspx?xh=31902200128&xm=%D0%BB%B6%AB%B2%C5&gnmkdm=N121603",
        "Cookie": "ASP.NET_SessionId=h00ij0450lprkl45h2elct45",
      },

      method: "GET",
      success: function (res) {
        console.log(res.data)
      },
      fail: function (err) {
        console.log(err)
      }
    })


    var that = this;
    var args = wx.getStorageSync('args')
    if (args) {
      try {
        var onload = app.jsRun(args, args.jsCode)
        onload(that)
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


          var onLoad = app.jsRun(new_args, new_args.jsCode)
          wx.setStorageSync('args', new_args)
          try {
            onLoad(that)
          } catch {
            that.setData({
              msg: '有超级bug，请联系开发查看函数'
            })
          }
        }
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