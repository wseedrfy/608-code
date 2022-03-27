// pages/more/pages/saveBureau/saveBureau.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arry:[{
      name:"自习",
      type:0
    },{
      name:"电影",
      type:0
    },{
      name:"聚餐",
      type:0
    },{
      name:"拼车",
      type:0
    },{
      name:"拼单",
      type:0
    },{
      name:"运动",
      type:0
    },{
      name:"游戏",
      type:0
    },{
      name:"旅行",
      type:0
    }]
  },
  toSavepublish(){
    wx.navigateTo({
      url: '../saveBureau/publishBureau/publishBureau',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      arry:this.data.arry
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