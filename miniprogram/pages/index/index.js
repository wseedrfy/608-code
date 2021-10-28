// index.js
// 获取应用实例

const app = getApp()
const api = require('../../utils/api')
var util = require("../../utils/util.js")
const run = getApp().globalData.runFunc
Page({
  data: {
    time: {
      date: new Date().getDate(),
      month: new Date().getMonth(),
      day: new Date().getDay(),
    },
  },

  onshow() {
    
  },
  async onLoad() {
 
    var that = this;
    await run()
    that.onshow()
    // 加载icon
    api.get("https://api.test.com/api/index").then((res) => {
      // 图片缓存本地策略
     
      wx.setStorageSync('configData', res)
      for (let item in res.iconList) {
        res.iconList[item].icon = util.getStorageImage(res.iconList[item].icon);
      }
      that.setData(res);
      api.get("https://api.test.com/api/getPersonalInformation").then((res_data) => {
        wx.setStorageSync('personalInformation', res_data)
        that.onshow()
      })

    })
  },

})