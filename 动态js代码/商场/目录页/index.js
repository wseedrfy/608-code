const db = wx.cloud.database({env:'mall-7gi19fir46652cb4'})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop_m: [],
    item: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    db.collection('shop_m').orderBy('sort', 'desc').get().then(res => {
        that.setData({shop_m: res.data})
        console.log(that.data.shop_m)
        wx.hideLoading({
        })
    
    })
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