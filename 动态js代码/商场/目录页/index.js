
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

  },

  goin: function (e) {
    console.log(e)
    wx.navigateToMiniProgram({
      appId: e.currentTarget.id,
      path: '',
      envVersion: 'release',
      success(res) {

        console.log('跳转成功');
      },
    })
  },


})