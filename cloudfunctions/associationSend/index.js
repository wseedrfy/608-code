// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let type = event.type
  // 发布  招新
  if (type == 0) {
    return await cloud.database().collection("Campus-Circle").add({
      data: {
        AllPhoto: event.AllPhoto,
        CommentList: null,
        Cover: event.Cover,
        CoverHeight: event.CoverHeight,
        CoverWidth: event.CoverWidth,
        Label: "社团招新",
        School: event.School,
        ShowHeight: event.ShowHeight,
        Star: null,
        Star_User: null,
        Text: event.Text,
        Time: Date.now(),
        Title: event.Title,
        iconUrl: null,
        nickName: null,
        username: null,
        index: event.index,
        endTime:event.endTime
      }
    })
  }
  // 删除  招新
  else if(type==1){
    return await cloud.database().collection("Campus-Circle").where({index:event.count+'社团'}).remove().then(res=>{
      cloud.database().collection("associationMess").where({count:event.count}).update({
        data:{
          sendStatus:false
        }
      })
    })
  }
  // 保存并发布  赛事
  else if(type==2){
    return await cloud.database().collection("Campus-Circle").add({
      data:{
        AllPhoto: event.AllPhoto,
        CommentList: null,
        Cover: event.Cover,
        CoverHeight: event.CoverHeight,
        CoverWidth: event.CoverWidth,
        Label: "社团赛事",
        School: event.School,
        ShowHeight: event.ShowHeight,
        Star: null,
        Star_User: null,
        Text: event.Text,
        Time: Date.now(),
        Title: event.Title,
        iconUrl: null,
        nickName: null,
        username: null,
        index: event.index,
        question:event.question
      }
    })
  }
  // 删除  赛事
  else if(type==3){
    cloud.database().collection("Campus-Circle").where({index:event.index}).remove().then(res=>{
      // cloud.database().collection("associtaionMath").where({})
    })
  }
}