// index.js
// 获取应用实例
const db = wx.cloud.database();
const journal = db.collection('journal');
const app = getApp()
var util = require("../../utils/util.js")
var pagecount = 1
Page({
  data: {
    list: [
      {
        icon: "images/sheTuan.png",
        title: "社团注册",
        intro: "添加你的社团",
        click: "association"
      },
      {
        icon: "images/aboutUs.png",
        title: "关于我们",
        intro: "找到我们",
        click: "about"
      }, {
        icon: "images/update.png",
        title: "更新日志",
        intro: "更新日志",
        click: "journal"
      }, {
        icon: "images/login.png",
        title: "登录/注销账号",
        intro: "登录/注销",
        click: "login"
      }
    ],
    isLogin: '',
    userInfo: [],
    time: {
      year: new Date().getFullYear(),
      month: new Date().getMonth()+1,
      day: new Date().getDay(),
    },
  },

  onLoad() {
    var that = this
    wx.getStorage({
      key: 'args',
      success(res) {
        console.log(res.data)
        that.setData({
          // storageInfo: JSON.parse(res.data),
          storageInfo: res.data,
          isLogin: true
        });
        // that.getJournalData()
      },
      fail(err) {
        that.data.isLogin = false;
      }
    })
    this.handleStudyDate();
    this.handleStudyWeek();
  },
  school(e) {
    if(!this.data.isLogin) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else {
      wx.showToast({
        icon:'none',
        title: '你的学校哟!',
      })
    }
  },
  academy(e) {
    if(!this.data.isLogin) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else {
      wx.showToast({
        icon:'none',
        title: '你的学号哟!',
      })
    }
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
    wx.redirectTo({
      url: '/pages/login/login'
    })
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
  }
})
