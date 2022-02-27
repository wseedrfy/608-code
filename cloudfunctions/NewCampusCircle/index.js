// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const CommentControl = require('./CommentControl/index');

exports.main = async (event, context) => {

  var data
  if(event.url === 'CommentControl'){
    data = await CommentControl.main(event)
  }

  return data
}