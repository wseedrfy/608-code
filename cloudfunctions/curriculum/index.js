// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

    switch(event.type) {
        case "addCurriculumLogs":
            return await addCurriculumLogs(event);      // 添加课程记录
        case "ConcealCurriculumLogs":
            return await ConcealCurriculumLogs(event);  // 隐藏课程记录
    }
}

/**
* @param: username: "用户学号" num;
*         nickName: "用户名称" String,
*         addCurriculumLogs: "课程添加记录" [Object],
*/
async function addCurriculumLogs(event) {
    return await cloud.database().collection('user').where({
        username: event.username,
        nickName: event.nickName
    }).update({
        data: {
            addCurriculumLogs: event.addCurriculumLogs
        }
    })
}


/**
* @param: username: "用户学号" num;
*         nickName: "用户名称" String,
*         ConcealCurriculumLogs: "隐藏课程记录" [Object],
*/
async function ConcealCurriculumLogs(event) {
    return await cloud.database().collection('user').where({
        username: event.username,
        nickName: event.nickName
    }).update({
        data: {
            ConcealCurriculumLogs: event.ConcealCurriculumLogs
        }
    })
}