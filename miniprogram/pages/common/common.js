//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    htmlText:"",
    foodList: [],
    htmlSrc: "",
  },
  //事件处理函数
  onLoad: function(options) {
    var that = this;
    console.log(options)
    if(options.type === "web"){
      that.setData({htmlSrc: options.url})
    }else if(options.type === "small"){
      wx.navigateToMiniProgram({
        appId: options.id,
        path: 'pages/index/index',
        extraData: {
          xuehao: getApp().globalData.xuehao
        },
        envVersion: 'release',
        success(res) {
          wx.navigateBack({
            delta: 1,
          })
          console.log('跳转成功');
        },
        fail: function(err) {
          wx.navigateBack({
            delta: 1,
          })
        }
      })
    }else if(options.type === "commonPage"){
      var args = wx.getStorageSync('args')
      if (args) {
        try {
          var onload = app.jsRun(args, args.otherPageCode[options.content])
          onload(that)
        } catch (e) {
          console.log(e)
        }
      }
    }else{
      wx.showToast({
        title: '内容出错',
        icon: 'none',
      })
    }

    
  },
  onShareAppMessage: function (res) {
    return {
      title: 'We广油',
    }
  },
})