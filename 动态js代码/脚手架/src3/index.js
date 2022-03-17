
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
    wx.navigateToMiniProgram({
      appId: 'wxff0c6ed636f4ca90',
      path: '',
      envVersion: 'release',
      success(res) {
        wx.navigateBack({
          delta: 1,
        })
        console.log('跳转成功');
      },
      fail: function(err) {
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  },

})