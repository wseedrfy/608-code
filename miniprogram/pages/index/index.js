// index.js
// 获取应用实例

const app = getApp()
Page({
  data: {
    time: {
      date: new Date().getDate(),
      month: new Date().getMonth(),
      day: new Date().getDay(),
    },
  },
  onshow() {
    var onShow = getApp().globalData.func.index.onshow
    this.setData(onShow());
  },
  onLoad() {
    var that = this;
    //进行JS的加载，JSJS针对不同学校的用法
    app.downloadJSJS().then(function () {
      //先运行一次onshow进行预加载
      that.onshow()
      var onLoad = getApp().globalData.func.index.onshow
      this.setData(onLoad());
    })
  },
})