// pages/more/pages/saveBureau/bureauContent/bureauContent.js
var app = getApp()
var util = require("../../../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    rectHeight: getApp().globalData.rectHeight,
    windowHeight: getApp().globalData.windowHeight,
  },
  chooseSex(){
    const args = wx.getStorageSync('args')
    wx.showModal({
      title: '请选择您的性别',
      content: '*确定后不能更改，请谨慎选择',
      cancelText: '男生',
      cancelColor: '#5D81CF',
      confirmText: '女生',
      confirmColor: '#EC7A73',
      success (res) {
        if (res.confirm) {
          console.log('用户选择女生')
          args.sex="woman"
        } else if (res.cancel) {
          console.log('用户选择男生')
          args.sex="man"
        }
        wx.setStorage({
          key:"args",
          data:args
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  joinIn(e){
    if(e.currentTarget.id){
      var index = parseInt(e.currentTarget.id)
    }
    var sex = e.currentTarget.dataset.sex
    const args = wx.getStorageSync('args')
    if(!args.sex){
      this.chooseSex()
    }else{
      var add={
        userName:args.username,
        iconUrl:args.iconUrl,
        nickName:args.nickName,
      }
      if((sex==="manNum" && args.sex==="woman") || (sex==="womanNum" && args.sex==="man")){
        wx.showToast({
          title: '请正确选择性别',
          icon: 'none'
        })
        return
      }else if(args.sex==="man" && this.data.userName!=args.username){
        var result = this.data.manNum.every((item) => {
          return item.userName!=args.username;
        });
        if(!!result){
          index!=undefined ? this.data.manNum[index] = add : this.data.manNum[this.data.manNum.length-1] = add
          wx.showToast({
            title: '您已入局~',
            icon: 'none'
          })
        }else{
          wx.showToast({
            title: '切勿重复加入~',
            icon: 'none'
          })
        }
      }else if(args.sex==="woman" && this.data.userName!=args.username){
        result = this.data.womanNum.every((item) => {
          return item.userName!=args.username;
        });
        if(!!result){
          index!=undefined ? this.data.womanNum[index] = add : this.data.womanNum[this.data.womanNum.length-1] = add
          wx.showToast({
            title: '您已入局',
            icon: 'none'
          })
        }else{
          wx.showToast({
            title: '切勿重复加入',
            icon: 'none'
          })
        }
      }else if(this.data.userName===args.username){
        wx.showToast({
          title: '您已经是局长',
          icon: 'none'
        })
      }
      this.setData({
        manNum:this.data.manNum,
        womanNum:this.data.womanNum
      })
    }
    
  },



  back(){
    wx.navigateBack({
      delta: 1,  // 返回上一级页面。
    })
  },
  
  onLoad: function (options) {
    var content=wx.getStorageSync('content')
    content.time = util.timeago(content.time, 'Y年M月D日')
    console.log(content);
    this.setData({
      iconUrl:content.iconUrl,
      locationName:content.locationName,
      manNum:content.manNum,
      womanNum:content.womanNum,
      nickName:content.nickName,
      userName:content.userName,
      photo:content.photo,
      text:content.text,
      time:content.time,
      i:0
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