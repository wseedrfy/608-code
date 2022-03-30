// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command

// 云函数入口函数
exports.main = async (event) => {
  let data = {
    msg: 'error'
  }
  switch (event.type) {
    case "addCard":
      data = await addCard(event); // 
      break;
    case "readCard":
      data = await readCard(event); // 
      break;

  }
  return data
}
async function addCard(event) {
  if (event.addData) {
    await db.collection('saveBureau').add({
      data: {
        text:event.addData.text,
        label:event.addData.label,
        photo:event.addData.photo,
        locationName:event.addData.locationName,
        womanNum:event.addData.womanNum,
        manNum:event.addData.manNum,
        time: event.addData.time,
        userName:event.addData.userName,
        iconUrl:event.addData.iconUrl,
        nickName:event.addData.nickName,
        school:event.addData.school
      }
    })
    data = {
      msg: 'success'
    }
    return data
  }
}
async function readCard(event) {
  var page=event.currentPage * 10;
  var temp={
    'school': event.school
  }
  if(event.label!=null){
    var temp={
      'school': event.school,
      'label': event.label
    }
  }
  // event.label!=null ? temp['label'] = event.label : '';
  try {
    return await db.collection('saveBureau').orderBy('indexFront', 'desc').orderBy('SortTime', 'desc').orderBy('Time', 'desc').where(temp).skip(page).limit(15).get();
  } catch (e) {
    console.error(e);
  }
}
