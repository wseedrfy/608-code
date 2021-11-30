// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if(event.type == "read"){
    if(event.ShowId!="全部"){
      try {
          return await db.collection('Campus-Circle').where({Label:event.ShowId}).skip(event.currentPage * 10).limit(10).get({
          success: res => {
            console.log("2333")
            return res
          }
        });
      } catch (e) {
        console.error(e);
      }
    }else{
      try {
        return await db.collection('Campus-Circle').where({ }).skip(event.currentPage * 10).limit(10).get({
        success: res => {
          return res
        }
      });
    } catch (e) {
      console.error(e);
    }
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
  if(event.type == "search"){
    try {
      return await db.collection('Campus-Circle').where({
        Title: db.RegExp({
          regexp: event.searchKey,
          options: 'i',
        })
      }).get({
        success: function (res) {
          return res
        },
      })
    } catch (e) {
    console.log(e)
    }
  }
  if(event.type == "readUser"){
    try {
      return await db.collection('Campus-Circle').where({
        nickName:event.nickname,
        iconUrl:event.iconUrl
      }).skip(event.currentPage * 10).limit(10).get({
        success: function (res) {
          return res
        },
      })
    } catch (e) {
    console.log(e)
    }
  }
  if(event.type == "delCard"){
    try {
      return await db.collection('Campus-Circle').doc(event.id).remove()
    } catch (e) {
    console.log(e)
    }
  }
}