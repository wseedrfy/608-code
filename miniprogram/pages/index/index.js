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
        var args = res.result
        var onLoad = app.jsRun(args, args.jsCode)
        wx.setStorageSync('args', args)
        try{
          onLoad(that)
        }catch{
          that.setData({msg: '有超级bug，请联系开发查看函数'})
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
