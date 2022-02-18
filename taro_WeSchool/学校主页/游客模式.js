function runCode(that) {
  var i;
  if (args.SchoolIndex.iconList) {
    for (i in args.SchoolIndex.iconList) {
      args.SchoolIndex.iconList[i].icon = util.getStorageImage(args.SchoolIndex.iconList[i].icon)
    }
  }
  if(args.otherData){
    wx.setStorageSync('personalInformation', args.otherData)
  }
  wx.setStorageSync('configData', Object.assign(args.SchoolIndex, {
    "timeYear": args.StartTime
  }))
  that.setClass = function () {
    wx.switchTab({
      url: '/pages/curriculum/curriculum'
    })
  }
  that.onPullDownRefresh = function () {
    console.log(123)
  }
  that.onShow = function () {
    var course = [];
    var msg = "";
    var zc = 0;
    var personalInformation = wx.getStorageSync('personalInformation')
    var configData = wx.getStorageSync('configData')
    var curriculum = personalInformation.curriculum;
    if (!curriculum) {
        msg = '加载中'
        if (args.msg) {
            msg = '加载中'
        }
        that.setData(Object.assign({
            msg: msg,
        }, configData))
        return
    }
    var xq = new Date().getDay();
    if (xq == 0) {
        xq = 7;
    }
    for (var y = 0; y < curriculum.length; y++) {
        zc = curriculum[y].zc
        // if (curriculum[y].xq == "7") {
        //     zc = String(Number(curriculum[y].zc) - 1)
        // }
        if (zc == util.getweekString() && curriculum[y].xq == xq) {
            course.push({
                day: '今天',
                time: '第' + curriculum[y].jcdm[1] + '节',
                name: curriculum[y].kcmc,
                site: curriculum[y].jxcdmc,
            })
        }
        course.sort(function (b, a) {
            return b.time.localeCompare(a.time, 'zh')
        })
    }
    personalInformation.curriculum = curriculum;
    wx.setStorageSync('personalInformation', personalInformation)
      msg = "您现在处于游客登录哦～"
    
    that.setData(Object.assign({
      course: course,
      show: '',
      msg: msg,
    }, configData))
  }
  that.onShow()


}
module.exports = runCode;