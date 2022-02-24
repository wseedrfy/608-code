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
    // 去除数组中的 NULL
    let addCurriculumLogs = event.addCurriculumLogs.filter(item => item);

    return await cloud.database().collection('user').where({
        username: event.username
    }).update({
        data: {
            addCurriculumLogs: addCurriculumLogs
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
        username: event.username
    }).update({
        data: {
            ConcealCurriculumLogs: event.ConcealCurriculumLogs
        }
    })
}