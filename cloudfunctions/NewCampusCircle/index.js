// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const CommentControl = require('./CommentControl/index');
const Card = require('./Card/index');

exports.main = async (event, context) => {

  var data
  if(event.url === 'CommentControl'){
    data = await CommentControl.main(event)
  }

  if(event.url === 'Card'){
    data = await Card.main(event)
  }

  return data
}