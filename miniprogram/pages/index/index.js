// index.js
// 获取应用实例

const app = getApp()

var util = require("../../utils/util.js")
Page({
  data: {
    time: {
      date: new Date().getDate(),
      month: new Date().getMonth(),
      day: new Date().getDay(),
    },
  },
  onShow() {
    if(getApp().globalData.func){
      var onshow = getApp().globalData.func.index.onshow
      onshow(this);
    }

  },
  onLoad() {
    var that = this;
    //进行JS的加载，JSJS针对不同学校的用法
    app.downloadJSJS().then(function () {
      //先运行一次onshow进行预加载
      that.onShow()
      var onLoad = getApp().globalData.func.index.onload
      that.setData(onLoad(that));
    })
  },
})