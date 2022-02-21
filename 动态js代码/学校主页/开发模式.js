function runCode(that) {
  var i;
  if (args.SchoolIndex.iconList) {
      for (i in args.SchoolIndex.iconList) {
          args.SchoolIndex.iconList[i].icon = util.getStorageImage(args.SchoolIndex.iconList[i].icon)
      }
  }
  wx.setStorageSync('configData', Object.assign(args.SchoolIndex, {
      "timeYear": args.StartTime
  }))
  that.setClass = function () {
      wx.switchTab({ url: '/pages/curriculum/curriculum' })
  }
  if(!wx.getStorageSync('JsTest')){
    wx.navigateTo({ url: '/pages/HOT/HotTest/HotTest' })
  }
  that.onPullDownRefresh=function (){
      console.log(123)
  }
  that.onShow = function () {
      var course = []; var msg = ""; var zc = 0;
      var configData = wx.getStorageSync('configData')
      var curriculum =[]
      if (!curriculum) {
          that.setData(Object.assign({ msg: '内容存在问题，请联系开发', }, configData))
          return
      } var xq = new Date().getDay(); if (xq == 0) { xq = 7; } for (var y = 0; y < curriculum.length; y++) {
          zc = curriculum[y].zc
          if (curriculum[y].xq == "7" || curriculum[y].xq == 7) {
              zc = String(Number(curriculum[y].zc) - 1)
              curriculum[y].zc = zc
          } if (zc == util.getweekString() && curriculum[y].xq == xq) { course.push({ day: '今天', time: '第' + curriculum[y].jcdm[1] + '节', name: curriculum[y].kcmc, site: curriculum[y].jxcdmc, }) } course.sort(function (b, a) { return b.time.localeCompare(a.time, 'zh') })
      }
      if (course.length == 0) { msg = "您现在处于游客登录哦～" } that.setData(Object.assign({ course: course, show: '', msg: msg, }, configData))
  }
  that.onShow()


}
module.exports = runCode;