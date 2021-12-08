const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database()
exports.main = async (event) => {
  const wxContext = cloud.getWXContext()
  const usernameData = (await db.collection("user").where({
    openid: wxContext.OPENID
  }).get()).data[0]
  usernameData ? delete usernameData.openid : null;
  const school = usernameData ? usernameData.school : '';
  const schoolInitData = (await db.collection("schoolLoading").where({
    schoolName: school ? school : '空'
  }).get()).data[0]
  var SchoolIndex = {}
  SchoolIndex = {
    SchoolIndex: {
      iconList: (await db.collection("jumpPage").where({
        schoolName: school ? school : '空'
      }).get()).data.concat((await db.collection("jumpPage").where({
        schoolName: '通用'
      }).get()).data),
      inform: (await db.collection("inform").where({
        schoolName: school ? school : '空'
      }).get()).data.concat((await db.collection("inform").where({
        schoolName: '通用'
      }).get()).data),
    }
  }
  SchoolIndex.SchoolIndex.iconList.forEach(e => {
    if(e.type === '跳转WEB'){
      e.url = '/pages/common/common?type=web&url=' + e.url;
    }else if(e.type === '跳转小程序'){
      e.url = '/pages/common/common?type=small&id=' + e.url;
    }else if(e.type === '通用展示栏'){
      e.url = '/pages/common/common?type=commonPage&content=' + e.url;
    }
  })
  // 加载其他信息内容
  let otherData = {}
  if(usernameData.runOtherJS){
    try{
      const SchoolRunOther = require("./school/" + school + '/index.js') 
      SchoolRunOther =  await School.main(event)
    }catch(e){
      return {
        ...usernameData,
        ...schoolInitData,
        ...SchoolIndex,
      }
    }
  }
  return {
    ...usernameData,
    ...schoolInitData,
    ...SchoolIndex,
    ...otherData
  }
}