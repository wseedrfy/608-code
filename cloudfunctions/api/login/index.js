const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database()
exports.main = async (event) => {
  try {
    const wxContext = cloud.getWXContext()
    
    const loginSchool = require("./school/" + event.school + '/login.js')
    const returnData = await loginSchool.main(event)

    if (returnData.msg === "welcome") {
  
      const isHave = (await db.collection("user").where({
        openid: wxContext.OPENID
      }).get()).data.length
          console.log(isHave)
      if (isHave === 0) {
        await db.collection('user').add({
          data: {
            openid: wxContext.OPENID,
            username: event.username,
            password: event.password,
            school: event.school,
            iconUrl: event.iconUrl,
            nickName: event.nickName
          }
        })
      } else {
 
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
      }
      return returnData
    }
    return returnData
  } catch (e) {
    console.log(e)
    return {
      msg: '学校错误',
      error: e
    }
  }
}