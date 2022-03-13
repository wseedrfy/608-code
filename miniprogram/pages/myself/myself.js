// index.js
// 获取应用实例
var util = require("../../utils/util.js")
Page({
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    isLogin: false,
    userInfo: [],
    time: {
      year: new Date().getFullYear(),
      month: new Date().getMonth()+1,
      day: new Date().getDay(),
    },
  },
  onLoad() {
    
    var that = this
    var myselfData = wx.getStorageSync('myselfData')
    if(myselfData){
      that.setData({
        list:myselfData.list
      })
    }
    wx.cloud.database().collection('myself').orderBy('myself_Id','asc').get().then(res => {
      console.log(res.data);
      wx.setStorageSync('myselfData', {list: res.data})
      that.setData({
        list:res.data
      })
    });

    let args = wx.getStorageSync('args');
    // 如果 args 里有 username 字段，则是已登录状态
    console.log(args.username);
    if(args.username) {
      that.setData({
        storageInfo: args,
        isLogin: true
      });
    }
    this.handleStudyDate();
    this.handleStudyWeek();
  },
  school(e) {
    if(!this.data.isLogin) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
    // else {
    //   wx.showToast({
    //     icon:'none',
    //     title: '你的学校哟!',
    //   })
    // }
  },
  academy(e) {
    if(!this.data.isLogin) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
    // else {
    //   wx.showToast({
    //     icon:'none',
    //     title: '你的学号哟!',
    //   })
    // }
  },

  about(e) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  journal(e) {
    wx.navigateTo({
      url: '/pages/journal/journal',
    })
  },

  login(e) {
    // if (this.data.isLogin) {
      wx.showModal({
        title: '提示',
        content: '请确定是否注销/登录',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定');
            wx.redirectTo({
              url: '/pages/login/login'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    // }

  },

  association(e) {
    wx.navigateTo({
      url: '/pages/association/association',
    });
  },
  handleStudyWeek(){
    const day = this.data.time.day;
    const currWeek = util.getweekString();
    var date = '';
    switch (day) {
      case 0:
        date = '日'
        break;
      case 1:
        date = '一'
        break;
      case 2:
        date = '二'
        break;
      case 3:
        date = '三'
        break;
      case 4:
        date = '四'
        break;
      case 5:
        date = '五'
        break;
      case 6:
        date = '六'
        break;
      default:
        break;
    }
    this.setData({
      studyWeek:'第'+ currWeek + '周' + '--' + '星期' + date
    })
  },
  handleStudyDate() {
    var semester = '';
    const time = this.data.time;
    const nextYear = time.year+1
    if( 8<=time.month<=12 || time.momnth == 1){
      semester = '1';
    }else {
      semester = '2';
    }
    this.setData({
      studyDate: time.year + '-' + nextYear + '学年 第' + semester + '学期'
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: 'WE校园',
    }
  },
})
