// pages/testdaka/allgroup/allgroup.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        statusBarHeight: getApp().globalData.statusBarHeight,
        lineHeight: getApp().globalData.lineHeight,
        room:[
            {roomlable:'学习',roomlist:[
              {roomname:'六级',roomintroduce:'每天50个单词',roomper:'99'},
              {roomname:'四级',roomintroduce:'每天50个单词',roomper:'99'},
              {roomname:'读书',roomintroduce:'每天50个单词',roomper:'99'},
            ]},
            {roomlable:'运动',roomlist:[{roomname:'六级',roomintroduce:'每天50个单词',roomper:'99'}]},
            {roomlable:'娱乐',roomlist:[{roomname:'六级',roomintroduce:'每天50个单词',roomper:'99'}]},
            {roomlable:'日常',roomlist:[{roomname:'六级',roomintroduce:'每天50个单词',roomper:'99'}]},
            {roomlable:'游戏',roomlist:[{roomname:'六级',roomintroduce:'每天50个单词',roomper:'99'}]},
            {roomlable:'其他',roomlist:[{roomname:'六级',roomintroduce:'每天50个单词',roomper:'99'}]}
          ]
    },
    back(){
      wx.navigateBack({
        delta: 1,
      })
    },
    temp(){
      wx.navigateTo({
        url: '/pages/testdaka/roomCreate/roomCreate',
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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