

const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
const _ = db.command
exports.main = async (event) => {
  let data = {msg: 'error'}
  if(event.delData) if(event.type === 'writeComment'){
    return await db.collection('Campus-Circle').where({
      _id: event._id
    }).update({
      data: {
        CommentList: _.push(event.addData)
      }
    })

 
  }
  if(event.type === 'delComment'){

    if(event.delData){
      await db.collection('Campus-Circle').where({
        _id: event._id
      }).update({
        data: {
          CommentList: _.pull(_.in(event.delData))
        }
      })
      data = {msg: 'success'}
    }
  
  }
  
  return data
}


