
Page({
    data: {
        statusBarHeight: getApp().globalData.statusBarHeight,
        lineHeight: getApp().globalData.lineHeight,
        rectHeight: getApp().globalData.rectHeight,
        windowHeight: getApp().globalData.windowHeight,

        tabItem: [{
            title: '全部',
            type: 0,
        }, {
            title: '王者荣耀',
            type: 0
        }, {
            title: '和平精英',
            type: 0
        }]
    },
    // 初始化函数
    init() {
        const args = wx.getStorageSync('args');
        // 判断登录
        app.loginState();
        // 初始化标签
        let tabItem = args.tabitem ? args.tabItem.map((e, index) => {
            if (index == 0) {
                return {
                    title: e,
                    type: 1
                }
            }
            return {
                title: e,
                type: 0
            }
        }) : this.data.tabItem;
        this.setData({
            tabItem
        })
    },
    onLoad: function (options) {

    },

    onReady: function () {

    },

    onShow: function () {

    },

    onPullDownRefresh: function () {

    },

    onReachBottom: function () {

    },


    onShareAppMessage: function () {

    }
})