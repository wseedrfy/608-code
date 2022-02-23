// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var isHave = (await db.collection("user").where({
    username: event.username,
    password: event.password,
    school: event.school,
  }).get()).data
  var isHave2
  try{
    isHave2 = (await db.collection("user").where({
      username: Number(event.username),
      password: event.password,
      school: event.school,
    }).get()).data
  }catch{}
  isHave =[...isHave, ...isHave2]

  if(isHave.length >= 1){
    await db.collection('user').where({
      openid: wxContext.OPENID
    }).update({
      data: {
        username: event.username,
        password: event.password,
        school: event.school,
        iconUrl: event.iconUrl,
        nickName: event.nickName
      }
    })
    return{msg: 'welcome'}
    
  }else{
    return{msg: '校园网关闭或者服务器异常'}
  }

}