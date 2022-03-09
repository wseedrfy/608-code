// pages/more/pages/Freshman/Freshman.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var content = JSON.parse(options.content)
    let _id = content._id
    let args = wx.getStorageSync('args');
    let username = args.username
    // console.log(args.username);
    this.setData({
      content
    })
    wx.cloud.callFunction({
      name: "associationSend",
      data: {
        _id,
        username,
        type:4
      }
    }).then(res => {
      console.log(res);
    })
  },
  // 查询是否已参与并操作
  // getPerson(){

  // },

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