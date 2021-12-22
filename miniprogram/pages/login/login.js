//index.js
//获取应用实例

const db = wx.cloud.database()
const schoolLoading = db.collection('schoolLoading')

const app = getApp()
Page({
  data: {
    user: "",
    pwd: "",
    school: [],
    url: '',
    urls: []
  },

  bindPickerChange: function(e) {
    var that = this
    this.setData({
      index: e.detail.value,
      url: that.data.urls[e.detail.value]
    })
  },

  async onLoad() {
    wx.showLoading({
      title: '加载基础信息中',
      mask: true
    })
    // 注意！这个只能拉100个学校，我也希望未来我们能超过100个
    var that = this;
    var res = (await schoolLoading.where({}).get()).data
    res.forEach(e => {
      if(e.schoolName !== '空'){
        this.data.school.push(e.schoolName)
        this.data.urls.push(e.url)
      }
    })
    this.setData({res: res, school: that.data.school});
    wx.hideLoading()
  },

  login: function (e) {
    var that = this
    if (this.data.user.length == 0 || this.data.pwd.length == 0) {
      wx.showToast({
        title: '帐号及密码不能为空',
        icon: "none"
      })
      return -1;
    }
    wx.showLoading({
      title: '刷新中',
      mask: true
    })
    var that = this;
    wx.showLoading({
      title: '登录中',
      mask: true
    })
    wx.getUserProfile({
      desc: '获取头像和信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res.userInfo)
        console.log(that.data.school[that.data.index])
        var data = {
          url: 'login',
          username: that.data.user,
          password: that.data.pwd,
          nickName: res.userInfo.nickName, 
          iconUrl: res.userInfo.avatarUrl,
          school: that.data.school[that.data.index]
        }
        app.globalData.school = that.data.school[that.data.index]
        wx.cloud.callFunction({
          name: 'api',
          data: {
            url: 'login',
            username: that.data.user,
            password: that.data.pwd,
            nickName: res.userInfo.nickName, 
            iconUrl: res.userInfo.avatarUrl,
            school: that.data.school[that.data.index]
          },
          success: res => {
            if (res.result.msg == "welcome") {
              wx.reLaunch({
                url: '/pages/index/index'
              })
            } else {
              console.log(res.result)
              wx.showToast({
                icon: 'none',
                title: res.result.msg,
              })
            }
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '校园网关闭或者服务器异常',
            })
          }
        })
      },
      fail: (res) => {
        wx.showToast({
          icon: 'none',
          title: '授权失败',
        })
      }
    })

  },
  input: function (e) {
    this.setData({
      [e.target.id]: e.detail.value
    })
  },
  // 帮助弹窗
  tapHelp: function (e) {
    if (e.target.id == 'help_model') {
      this.hideHelp();
    }
  },
  showHelp: function (e) {
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function (e) {
    this.setData({
      'help_status': false
    });
  },
  copy() {
    wx.setClipboardData({
      data: this.data.url,
      success() {
        wx.showToast({
          title: '已成功复制地址，快用浏览器打开吧',
          icon: "none"
        })
      }
    })
  }

})