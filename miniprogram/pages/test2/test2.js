// pages/test2/test2.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftList: [
      {
        "_id": "213",
        "All": [
          "cloud://cloud1-6gtqj1v4873bad50.636c-cloud1-6gtqj1v4873bad50-1307814679/CampusCircle_images/164075598080458.png"
        ],
        "CommentList": null,
        "Cover": "cloud://cloud1-6gtqj1v4873bad50.636c-cloud1-6gtqj1v4873bad50-1307814679/CampusCircle_images/164075598080458.png",
        "CoverHeight": "370rpx",
        "CoverWidth": 640,
        "Label": "社团",
        "School": "广东石油化工学院",
        "ShowHeight": 370,
        "Star": null,
        "Star_User": null,
        "Text": "人间真实标题很长很长很长很长很长很长很长很长很长",
        "Time": 164055980760,
        "Title": "人间真实标题很长很长很长很长很长很长很长很长很长",
        "iconUrl": "https://thirdwx.qlogo.cn/mmopen/vi_32/o7Jeib8cHKLY1iclc71KqVcMYKks0KV6CQENCria8c3sPqT5ZfVZEVbqG1sGmpu57Ry3Vz8ZcBdQuueeOZs4GKZEg/132",
        "nickName": "騰丶",
        "username": 20014260415
      }
    ],
    rightList: [
      {
        "_id": "213",
        "All": [
          "cloud://cloud1-6gtqj1v4873bad50.636c-cloud1-6gtqj1v4873bad50-1307814679/CampusCircle_images/164075598080458.png"
        ],
        "CommentList": null,
        "Cover": "cloud://cloud1-6gtqj1v4873bad50.636c-cloud1-6gtqj1v4873bad50-1307814679/CampusCircle_images/164075598080458.png",
        "CoverHeight": "370rpx",
        "CoverWidth": 640,
        "Label": "社团",
        "School": "广东石油化工学院",
        "ShowHeight": 370,
        "Star": null,
        "Star_User": null,
        "Text": "人间真实",
        "Time": 164055980760,
        "Title": "人间真实标题很长",
        "iconUrl": "https://thirdwx.qlogo.cn/mmopen/vi_32/o7Jeib8cHKLY1iclc71KqVcMYKks0KV6CQENCria8c3sPqT5ZfVZEVbqG1sGmpu57Ry3Vz8ZcBdQuueeOZs4GKZEg/132",
        "nickName": "騰丶",
        "username": 20014260415
      }
    ],
    "openusername": 20114340331
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },
  getData() {
    // db.collection("Campus-Circle").get().then(res=>{
    //   console.log(res);
    // })
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