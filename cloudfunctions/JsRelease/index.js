// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  if(event.school != '通用'){
    const isHave = (await db.collection("schoolLoading").where({
      school: event.school
    }).get()).data.length

    await db.collection('schoolLoading').where({
      openid: wxContext.OPENID
    }).update({
      data: {
        username: event.username,
      }
    })
  }



  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}