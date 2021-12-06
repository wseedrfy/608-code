// index.js
// 获取应用实例
const db = wx.cloud.database();
const journal = db.collection('journal');
const app = getApp()
var pagecount = 1
Page({
  data: {
    list:[
      {
        icon: "images/aboutUs.png",
        title: "关于我们",
        click: "about"
      }, {
        icon: "images/update.png",
        title: "更新日志",
        click: "journal"
      }, {
        icon: "images/login.png",
        title: "登录/注销账号",
        click: "login"
      }
    ],
    isLogin:'',
    userInfo:[]
  },
 
  onLoad() {
    var that = this
    wx.getStorage({
      key:'data',
      success(res) {
        that.setData({
          storageInfo:JSON.parse(res.data),
          isLogin:true
        });
        // that.getJournalData()
      },
      fail(err) {
        that.data.isLogin = false;
      }
    })
  },
  school(e){
    console.log(e,"学校");
  },
  academy(e){
    console.log(e,"专业");
  },

  about(e){
    console.log(e)
    console.log("关于我们")
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  journal(e){
    console.log(e)
    console.log("更新日志")
    wx.navigateTo({
      url: '/pages/journal/journal',
    })
  },

  login(e){
    wx.redirectTo({
      url: '/pages/login/login'
    })
    console.log(e)
    console.log("登录/注销账号")
  }
})
