const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
const _ = db.command

exports.main = async (event) => {
  let data = {
    msg: 'error'
  }
  switch (event.type) {
    case "read":
      data = await read(event); //  
      break;
    case "search":
      data = await search(event); //  
      break;
  }
  return data
}

async function read(event) {
  var skipPage = event.currentPage * 10;
  var obj = {
    School: event.School
  }
  event.ShowId != "全部" ? obj["Label"] = event.ShowId : '';
  console.log(event);
  try {

    // if(event.School === '茂名职业技术学院'){
    //   return await db.collection('Campus-Circle').orderBy('indexFront', 'desc').orderBy('Star', 'desc').where(obj).skip(skipPage).limit(10).get();
    // }
    return await db.collection('Campus-Circle').field({
      'CommentList.InputComment': false,
      'CommentList.CommentTime': false,
      'CommentList.iconUser': false,
      'CommentList.nickName': false,
      'CommentList.username': false,
      'Star_User.Star_time': false,
      'Star_User.iconUrl': false,
      'Star_User.username': false,
    }).orderBy('indexFront', 'desc').orderBy('Time', 'desc').where(obj).skip(skipPage).limit(10).get();
  } catch (e) {
    console.error(e);
  }

}

async function search(event) {
  try {
    return await db.collection('Campus-Circle').field({
      'CommentList.InputComment': false,
      'CommentList.CommentTime': false,
      'CommentList.iconUser': false,
      'CommentList.nickName': false,
      'CommentList.username': false,
      'Star_User.Star_time': false,
      'Star_User.iconUrl': false,
      'Star_User.username': false,
    }).where({
      Title: db.RegExp({
        regexp: event.searchKey,
        options: 'i',
      })
    }).get()

  } catch (e) {
    return e
  }
}