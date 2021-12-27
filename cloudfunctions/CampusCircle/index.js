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
    // 记得有空删除一下，下面逻辑，暂时用event._id兜底
    try {
      if(event._id){
        return await db.collection('Campus-Circle').where({
          _id: event._id
        }).get({
          success: function (res) {
            return res
          }
        })
      }
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
          iconUrl:event.iconUrl,
          status:0,
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
  // 12-27新增：将点赞与评论这些新消息提示上传到数据库
  if(event.type == "StarControlLogs"){
    try {
      return await db.collection('New-Information').add({
        data: {
          character: event.character,
          be_character: event.be_character,
          type: event.type_type,
          content: '',
          status: 0,
          createTime: event.createTime,
          arcticle: event.arcticle
        },
        success(res) { console.log(res,"点赞成功，数据库添加成功"); },
        fail(e) { console.log(e,"点赞失败，数据库存储失败"); }
      })
    } catch(e) {
      console.log(e);
    }
  }
  // 取消点赞/评论状态
  if(event.type == "CancelControlLogs"){
    try {
      return await db.collection('New-Information').where({
        character:event.character,
        be_character:event.be_character,
        arcticle:event.arcticle,
        type:event.type_type
      }).update({
        data: {
          status: -1,
          createTime:event.createTime
        },
        success(res) { console.log(res,"点赞状态更新成功"); },
        fail(e) { console.log(e,"点赞状态更新失败"); }
      })
    } catch(e) {
      console.log(e);
    }
  }
  // 评论
  if(event.type == "CommentControlLogs") {
    try {
      return await db.collection('New-Information').add({
        data: {
          character: event.character,
          be_character: event.be_character,
          type: '评论',
          content: event.content,
          status: 0,
          createTime: event.createTime,
          arcticle: event.arcticle
        },
        success(res) { console.log(res,"评论成功，数据库添加成功"); },
        fail(e) { console.log(e,"评论失败，数据库存储失败"); }
      })
    } catch(e) {
      console.log(e);
    }
  }
  if(event.type == 'ReadControlLogs') {
    try {
      return await db.collection('New-Information').where().add({
        data: {

        },
        success(res) { console.log(res,"评论成功，数据库添加成功"); },
        fail(e) { console.log(e,"评论失败，数据库存储失败"); }
      })
    } catch(e) {
      console.log(e);
    }
  }
  // 12-27新增：将点赞与评论这些新消息提示上传到数据库 ↑↑↑↑↑↑
}