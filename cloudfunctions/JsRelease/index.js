// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  if(event.isTj === '是'){
    return{msg: "暂时不支持自动配置，请去cms手动配置"}
  }

  if(event.school != '通用'){
    var loadData = (await db.collection("schoolLoading").where({
      schoolName: event.school
    }).get()).data[0]

    db.collection('jumpLog').add({
      data: {
        loadData: loadData,
        openid: wxContext.OPENID,
        tiem: new Date(),
      }
    })

    let otherPageCode = loadData.otherPageCode
    try{
      otherPageCode[event.name] = event.code
    }catch{
      otherPageCode = {...otherPageCode, [event.name]: event.code}
    }
    console.log(otherPageCode)

    await db.collection('schoolLoading').where({
      schoolName: event.school
    }).update({
      data: {
        otherPageCode: otherPageCode
      }
    })
    return {msg: '配置成功'}
  }else{
    return {msg: '暂时不支持通用模式，或者学校不存在'}
  }



  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}