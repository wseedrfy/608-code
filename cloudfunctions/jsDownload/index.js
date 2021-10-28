// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const   code = `
  function runCode() {
    var course = [];
    var msg = "";
    var zc = 0;
    var configData = wx.getStorageSync('configData')
    var personalInformation = wx.getStorageSync('personalInformation')
    var curriculum = personalInformation.curriculum;
    if(!curriculum){
      return
    }
    var xq = new Date().getDay();
    if (xq == 0) {
      xq = 7;
    }
    for (var y = 0; y < curriculum.length; y++) {
      zc = curriculum[y].zc
      if (curriculum[y].xq == "7") {
        zc = String(Number(curriculum[y].zc) - 1)
      }
      if (zc == util.getweekString() && curriculum[y].xq == xq) {
        course.push({
          day: '今天',
          time: '第' + curriculum[y].jcdm[1] + '节',
          name: curriculum[y].kcmc,
          site: curriculum[y].jxcdmc,
        })
      }
      // course.sort((b, a) => b.time.localeCompare(a.time, 'zh'))
    }
    personalInformation.curriculum = curriculum;
    wx.setStorageSync('personalInformation', personalInformation)
    if (course.length == 0) {
      var msg = "今天没有课哟～出去玩吧"
    }
    return Object.assign({
      course: course,
      show: '',
      msg: msg,
    }, configData)
  }
  module.exports = runCode;
`;
return {
  index:{
    onshow: code
  }
}
}