// pages/more/pages/PublishContent/PublishContent.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        statusBarHeight: getApp().globalData.statusBarHeight,
        lineHeight: getApp().globalData.lineHeight,
        rectHeight: getApp().globalData.rectHeight,

        menu: [],                   // 标签
        choosenLabel: '',           // 选中的标签
        showTab: false,             // 控制标签显隐
    },
    showTab() {
        // 点击事件
        this.setData({ showTab: !this.data.showTab })
    },
    chooseTab(e) {                  // 选择标签
        // 获取索引值
        let index = e.detail.currentTarget.dataset.index;
        this.setData({
          choosenLabel: this.data.menu[index],
        })
    },
    onLoad: function (options) {
        let args = wx.getStorageSync('args');
        
        this.setData({
            menu: args.tabitem.slice(1,)
        })
    },

    onReady: function () {

    },

    onShow: function () {

    },

    onHide: function () {

    },

    onUnload: function () {

    },

    onPullDownRefresh: function () {

    },

    onReachBottom: function () {

    },

    onShareAppMessage: function () {

    }
})