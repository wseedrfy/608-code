
const cloud = require('wx-server-sdk');
const wxContext = cloud.getWXContext()
exports.main = async (event) => {
  try{
    const loginSchool = require("./school/" + event.school + '/login.js') 
    let returnData = await loginSchool.main(event)
    if(returnData.msg === "welcome"){
      const isHave = (await db.collection("user").where({
        openid: wxContext.OPENID
      }).get()).data.length
      if(isHave === 0){
        await db.collection('user').add({
          data: {
            openid: wxContext.OPENID,
            username: Number(event.username),
            password: event.password,
            school: event.school,
            iconUrl: event.iconUrl,
            nickName: event.nickName
          }
        })
      }else{
        await db.collection('user').where({ openid: wxContext.OPENID }).update({
          data: {
            username: Number(event.username),
            password: event.password,
            school: event.school,
            iconUrl: event.iconUrl,
            nickName: event.nickName
          }
        })
      }
    }
    return returnData
  }catch(e){
    console.log(e)
    return {msg:'学校错误'}
  }
}


