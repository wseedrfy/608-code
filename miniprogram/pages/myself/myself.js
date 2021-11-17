// index.js
// 获取应用实例
const app = getApp()

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
    userInfo:[
      {
        icon: "images/class.png",
        title: "班级",
        littleTitle: "暂未开通哟",
        click: "class"
      },{
        icon: "images/academy.png",
        title: "专业",
        littleTitle: "暂未开通哟",
        click: "academy"
      }

    ]
  },
  onLoad() {
    
  },
  
  class(e){
    console.log(e,"班级");
  },
  academy(e){
    console.log(e,"专业");
  },

  about(e){
    console.log(e)
    console.log("关于我们")
  },
  journal(e){
    console.log(e)
    console.log("更新日志")
  },
  login(e){
    wx.redirectTo({
      url: '/pages/login/login'
    })
    console.log(e)
    console.log("登录/注销账号")
  }

  
})
