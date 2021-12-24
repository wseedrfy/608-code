// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if(event.type == "read"){
    if(event.ShowId!="全部"){
      if(event.addAft==0){
        try {
            return await db.collection('Campus-Circle').orderBy('Time','desc').where({Label:event.ShowId,School:event.School}).skip(event.currentPage * 10).limit(10).get({
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
          return await db.collection('Campus-Circle').orderBy('Time','desc').where({Label:event.ShowId,School:event.School}).skip(event.currentPage * 10 + 1).limit(10).get({
            success: res => {
              console.log("2333")
              return res
            }
          });
        } catch (e) {
          console.error(e);
        }
      }
    }else{
      if(event.addAft==0){
        try {
          return await db.collection('Campus-Circle').orderBy('Time','desc').where({ School:event.School}).skip(event.currentPage * 10).limit(10).get({
            success: res => {
              return res
            }
          });
        } catch (e) {
          console.error(e);
        }
      }else{
        try {
          return await db.collection('Campus-Circle').orderBy('Time','desc').where({ School:event.School}).skip(event.currentPage * 10 + 1).limit(10).get({
            success: res => {
              return res
            }
          });
        } catch (e) {
          console.error(e);
        }
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
          School:event.School,
          Star:0
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
  if(event.type == "starCount"){
    try {
      return await db.collection('Campus-Circle').where({
        Time:event.Time
      }).update({
        data: {
          Star:event.Star,
          Star_User:event.Star_User
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
  if(event.type == "star"){
    try {
      return await db.collection('Campus-Circle').where({
        Time:event.Time
      }).update({
        data: {
          StarUser:event.StarUser
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
      return await db.collection('Campus-Circle').orderBy('Time','desc').where({
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
  if(event.type == "delComment"){
    try {
      return await db.collection('Campus-Circle').doc(event.id).update({
        data: {
          CommentList: event.CommentList
        },
      })
    } catch (e) {
    console.log(e)
    }
  }
}