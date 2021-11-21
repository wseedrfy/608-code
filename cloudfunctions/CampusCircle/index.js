// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if(event.type == "read"){
    try {
        return await db.collection('Campus-Circle').where({}).skip(event.currentPage * event.pageSize).limit(event.pageSize).get({
        success: function (res) {
          return res
        }
      });
    } catch (e) {
      console.error(e);
    }
  }
  if(event.type == "write"){
    try {
      return await db.collection("Campus-Circle").add({
        data: {
          Cover: event.Cover,
          AllPhoto: event.AllPhoto,
          Title: event.Title,
          Text: event.Text,
          CoverHeight: event.CoverHeight,
          CoverWidth: event.CoverWidth,
          Label: event.Label,
          LabelId: event.LabelId,
          Time: event.Time,
          ShowHeight: event.ShowHeight,
          nickName:event.nickName,
          iconUrl:event.iconUrl,
          School:event.School
        }, success: res => { }, 
        fail: err => { }
      })
    } catch (e) {
      console.log(e)
    }
  }
  if(event.type == "writeComment"){
    try {
      return await db.collection('Campus-Circle').where({
        Time:event.Time
      }).update({
        data: {
          CommentList:event.CommentList
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
  if(event.type == "readComment"){
    try {
        return await db.collection('Campus-Circle').where({
        Time:event.Time
      }).get({
        success: function (res) {
          return res
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
}