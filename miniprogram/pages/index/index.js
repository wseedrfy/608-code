// index.js

const util = require("../../utils/util")

// 获取应用实例
const app = getApp()



Page({
  data: {
    modle:["https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%83%8F%E7%B4%A0%E7%94%BB%E4%BA%BA%E7%89%A92.png?sign=312a73ffb6956314699bb6dd723524b6&t=1647683154","https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%83%8F%E7%B4%A0%E7%94%BB%E4%BA%BA%E7%89%A94.png?sign=a60a5b2426a09e42f4511405b033cacb&t=1647683175","https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%83%8F%E7%B4%A0%E7%94%BB%E4%BA%BA%E7%89%A96.png?sign=fcca8d7a1f445cb3882ac003423b1f15&t=1647683193","https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%83%8F%E7%B4%A0%E7%94%BB%E4%BA%BA%E7%89%A95.png?sign=95ee702d75515ef883087580402b42cc&t=1647683205"],
    modle_display:"",
    dakaArr:[],
    theme: true,
    dark : wx.getSystemInfoSync().theme,
    time: {
      date: new Date().getDate(),
      month: new Date().getMonth(),
      day: new Date().getDay(),
    },
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    windowHeight: getApp().globalData.windowHeight,
    ad: true,
    adSrc: '',
    adHeight: '280'
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
    let dakaArr=wx.getStorageSync('dakaArr');
    let num=Math.floor(Math.random() * (this.data.modle.length-1));
    let res = this.data.modle[num]
    this.setData({modle_display:res})
    var that = this;
    wx.onThemeChange(function (e) {
      that.setData({ dark:  e.theme  });
    })
    if(wx.getStorageSync('theme') !== undefined){
      that.setData({ theme:  wx.getStorageSync('theme') });
    }

    var args = wx.getStorageSync('args')
    this.setData({
      ad: args.ad,
      otherAd: args.otherAd,
      dakaArr
    })
    if (args && options?.goin !== 'login') {
      try {
        console.log("进入主页兜底")
        var onload = app.jsRun(args, args.jsCode)
        onload(that, options)
      } catch (e) {
        console.log(e)
      }
    }
    wx.cloud.callFunction({
      name: 'api',
      data: {
        url: 'indexLoading',
        jsVersion: args.jsVersion
      },
      success: res => {
        var new_args = res.result
        console.log("获取到数据")
        new_args = {
          ...args,
          ...new_args
        }
        if ((options?.goin == 'login') || (!(JSON.stringify(new_args) === JSON.stringify(wx.getStorageSync('args'))))) {
          console.log("进入函数更新")

          wx.setStorageSync('args', new_args)
          var onload = app.jsRun(new_args, new_args.jsCode)

          try {
            onload(that, options)
          } catch(e) {
            console.log(e)
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
  // onShow() {
  //   console.log("onshow");
  //   let dakaArr=wx.getStorageSync('dakaArr');
  //   if(dakaArr==[]){
  //     this.daka=[{task_name:"无打卡任务",task_isDaka:"false"}]
  //   }
  //   this.setData({
  //     dakaArr
  //   })
  // },
  onShareAppMessage: function (res) {
    return {
      title: 'WE校园',
    }
  },
  switch1Change: function(res){
    wx.setStorageSync('theme', res.detail.value)
    this.setData({
      theme: res.detail.value
    })
  },

  adClose(){
    console.log("adClose")
    this.setData({ad: false})
  },
  adGo(){
    var that = this
    wx.navigateTo({
      url: that.data.otherAd.adUrl,
    })
  },
  onShareTimeline: function(res) {
    return {
      title: 'WE校园'
    }
  },
  daka(){
    wx.navigateTo({
      url: '../testdaka/index/index',
    })
  },
  
})