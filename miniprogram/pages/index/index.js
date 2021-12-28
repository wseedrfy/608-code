// index.js

const util = require("../../utils/util")

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
  // 活动跳转 (点击事件)
  activity:function () {
    var that = this
    console.log("触发activity函数");
    app.fadein(that, 'slideupshow', 0)  
    wx.setStorage({ key: 'activityDialog', data: that.data.activityDialog });  //覆盖status=0的缓存
    wx.switchTab({ url: '../more/more' })
},
// 关闭活动通知 (点击事件)
  closeDialogAdd: function () {
    var that = this
    console.log("触发关闭函数");
    app.fadein(that, 'slideupshow', 0)
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
    var timeNow = new Date().getTime();
    
    if (wx.getStorageSync('activityDialog')) {
      var that = this;
      var activityDialog = wx.getStorageSync('activityDialog');
      let timeHour = (timeNow - activityDialog.time)/1000 /60/60 ;
      console.log(timeHour);
      if(timeHour >= 1 ) {
        app.slideupshow(that, 'slideupshow', 450, 1);    // 弹窗出现动效
        activityDialog.time = timeNow
        wx.setStorageSync('activityDialog', activityDialog)
      }else {
        activityDialog.time = timeNow
        wx.setStorageSync('activityDialog', activityDialog)
      }
      this.setData({ activityDialog });
    } else {
      wx.cloud.database().collection('activityDialog').orderBy('_createTime', 'desc').get({
          success: function (res) {
              console.log(res.data, "活动弹窗数据");
              res.data[0].time = time
              that.setData({ activityDialog: res.data[0] });
              app.slideupshow(that, 'slideupshow', 450, 1);    // 弹窗出现动效
              wx.setStorage({ key: 'activityDialog', data: res.data[0] })  // 存入本地
          }
      })
  }
    
    // 以下 2021-12-25新增
    // await wx.cloud.callFunction({
    //   name:"CampusCircle",
    //   data:{
    //     type:"readUser",
    //     currentPage:0,
    //     nickname:args.nickName,
    //     iconUrl:args.iconUrl
    //   },
    //   success(res){
    //     console.log("res.result.data",res.result.data)
    //     if(wx.getStorage('myTieZi')) {
    //       const newTieZi = res.result.data;
    //       const oldTieZi = wx.getStorage('myTieZi');
    //       // 遍历新帖子，与旧帖子做比较，得到是否有新消息
    //       for(let i = 0 ;i < newTieZi.length;i++) {
    //         // 判断点赞数是否增加
    //         if(newTieZi[i].Star.length > oldTieZi[i].Star.length) {
    //           var addedInfo = [];
    //           console.log("for循环star"+"第"+i+'次',newTieZi[i].Star,oldTieZi[i].Star);
              
    //         }
    //       }
    //     }
        
    //     if(wx.getStorageSync('myStar') === myStarAll) {
    //       wx.removeStorageSync('newStar')
    //       wx.hideTabBarRedDot({
    //         index: 2,
    //       })
    //     }else {
    //       console.log("myStar VS  Storage 看到这个log说明此时不相等",myStarAll,wx.getStorageSync('myStar'));
    //       var newStar = myStarAll - wx.getStorageSync('myStar');
    //       wx.setStorageSync('newStar', newStar)
    //       // 判空
    //       if(wx.getStorageSync('myStar')) {
    //         wx.showTabBarRedDot({
    //           index: 2,
    //         })
    //       }
    //     }
    //     wx.setStorageSync('myStar', myStarAll);
    //   },
    //   fail(res) {
    //     console.log("请求失败", res)
    //   }
    // })
    // 以上为新增代码
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