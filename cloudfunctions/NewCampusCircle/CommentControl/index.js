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
    case "delComment":
      data = await delComment(event); // 
      break;
  }
  return data
}
async function writeComment(event, type, content) {

  if (event.delData) {
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
        CommentList: _.pull(_.in(event.delData))
      }
    })
    data = {
      msg: 'success'
    }
  }

}