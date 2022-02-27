const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
const _ = db.command
exports.main = async (event) => {
  let data = {
    msg: 'error'
  }
  switch (event.type) {
    case "addStar":
      data = await addStar(event); // 
      break;
    case "deStar":
      data = await deStar(event); // 
      break;
  }
  return data
}
async function addStar(event, type, content) {

  if (event.delData) {
    await db.collection('Campus-Circle').where({
      _id: event._id
    }).update({
      data: {
        Star_User: _.push(event.addData)
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
        Star_User: _.pull(_.in(event.delData))
      }
    })
    data = {
      msg: 'success'
    }
  }

}