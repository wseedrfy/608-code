// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command;
// 云函数入口函数
const login = require('./login/index');
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var data
  if(event.url === 'downloadJs'){
    data = await login.main(wxContext, event)
  }

  if(event.url === 'login'){
    data = await login.main(wxContext, event)
  }
  return data
}