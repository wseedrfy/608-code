const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
const _ = db.command
exports.main = async (event) => {
  let data = {
    msg: 'error'
  }
  switch (event.type) {
    case "writeComment":
      data = await writeComment(event); // 
      break;
    case "replyComment":
      data = await replyComment(event); // 
      break;
    case "delComment":
      data = await delComment(event); // 
      break;
    case "delReply":
      data = await delReply(event); // 
      break;
  }
  return data
}
async function writeComment(event, type, content) {
  
  if (event.addData) {
    await db.collection('Campus-Circle').where({
      _id: event._id
    }).update({
      data: {
        CommentList: _.push(event.addData)
      }
    })
    data = {
      msg: 'success'
    }

  }
}
async function delComment(event, type, content) {

  if (event.delData) {
    await db.collection('Campus-Circle').where({
      _id: event._id
    }).update({
      data: {
        CommentList: _.pull({
          CommentTime: _.eq(event.delData.CommentTime),
          username: _.eq(event.delData.username),
          iconUser: _.eq(event.delData.iconUser),
        })
      }
    })
    data = {
      msg: 'success'
    }
  }

}

async function delReply(event, type, content) {

  if (event.delData) {
    await db.collection('Campus-Circle').where({
      _id: event._id
    }).update({
      data: {
        ['CommentList.'+[event.index]+'.Reply']: _.pull({
          ReplyTime: _.eq(event.delData.ReplyTime),
          username: _.eq(event.delData.username),
          iconUser: _.eq(event.delData.iconUser),
        })
      }
    })
    data = {
      msg: 'success'
    }
  }

// }

async function replyComment(event, type, content) {

  if (event.addData) {
    await db.collection('Campus-Circle').where({
      _id: event._id
    }).update({
      data: {
        ['CommentList.'+[event.index]+'.Reply']: _.push(event.addData)
      }
    })
    data = {
      msg: 'success'
    }

  }
}