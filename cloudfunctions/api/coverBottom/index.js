// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var isHave = (await db.collection("user").where({
    school: event.school,
    password: event.password,
    username: event.username,
  }).get()).data
  console.log(isHave)
  if(isHave.length >= 1){
    return{msg: 'welcome'}
  }else{
    return{msg: '校园网关闭或者服务器异常'}
  }

}