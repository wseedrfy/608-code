wx.cloud.init()
const db = wx.cloud.database()

const Business = db.collection('Business')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: "",
    pwd: "",
    school: [],
    url: '',
    urls: [],
    show_detail:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  hide_model(e){
    console.log(e)
    if(e.target.id=="show"){
      this.setData({
        show_detail:false
      })
    }

  },
  show_img(e){
    wx.previewImage({
      urls: ["../images/kefu.jpg"],
      current:"../images/kefu.jpg"
    })
  },
 login: function (e) {
   console.log(e)
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
    wx.cloud.callFunction({
      name: 'Bussiness',
      data: {
        type: 'login',
        user: that.data.user,
        password: that.data.pwd,
      },
      success: res => {
        console.log(res)
        if (res.result.msg == "welcome") {
          console.log(res.result.msg)
          console.log(res.result.data)
          wx.setStorageSync("LoginStorage",res.result.data)
          let LoginStorage = wx.getStorageSync("LoginStorage")
           console.log(LoginStorage)
           wx.hideLoading()
          // wx.reLaunch({
          //   url: '/pages/index/index'
          // })
        } else {
          console.log(res.result.msg)
          wx.showToast({
            icon: 'none',
            title: res.msg,
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
  input: function (e) {
    this.setData({
      [e.target.id]: e.detail.value
    })
  },
  apply(){
    this.setData({
      show_detail:true
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})