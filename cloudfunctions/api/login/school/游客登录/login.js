var got = require('got'); //引用 got
// 云函数入口函数
exports.main = async (event) => {

  if (event.password == "test" && event.username == "guest") { //游客模式
    return {msg: 'welcome'}
  } else if (event.password == "test" && event.username == "developer") {
    wx.reLaunch({
      url: '/pages/index/index' //开发模式
    })
  } else {
    return {msg: '错误，请找管理员'}
  }

}