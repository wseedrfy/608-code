
const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database()
exports.main = async (event) => {
  const wxContext = cloud.getWXContext()
  const usernameData = (await db.collection("user").where({
    openid: wxContext.OPENID
  }).get()).data[0]
  const school = usernameData ? usernameData.school : '';
  const schoolInitData = (await db.collection("schoolLoading").where({
    schoolName: school ? school : '空'
  }).get()).data[0]
  return {
    ...usernameData,
    ...schoolInitData
  }
}
