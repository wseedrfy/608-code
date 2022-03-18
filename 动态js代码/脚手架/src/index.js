
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:[
      {
        title:"美团外卖红包",
        label:"低价外卖",
        btn:"折扣购买",
        icon:"https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/coupon-img/logo.png?sign=71e2303e03df7c011e81f9dfd97197b9&t=1647496070",
        banner_img:"https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/coupon-img/meituan.png?sign=daa94d028da89f3ccf97c339e8bae823&t=1647496039",
        appid:"wxde8ac0a21135c07d",
        path:"/index/pages/h5/h5?lch=cps:waimai:5:401c6e8a33376657a4d076948b9d76ec:001:33:164009&f_userId=1&weburl=https%3A%2F%2Fclick.meituan.com%2Ft%3Ft%3D1%26c%3D2%26p%3DwTe5Vb5z7TbP&f_token=1"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  btn(e){
    console.log(e)
    let index = Number(e.target.id)
    let res = this.data.detail[index]
    console.log(res)
    wx.navigateToMiniProgram({
      appId: res.appid,
      path:res.path,
      success(res){
        console.log(res)
        console.log(111)
      }
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