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

    const isHava = (await cloud.database().collection('curriculumControl').where({
        username: event.username
    }).get()).data.length
    if(isHava === 0) {          // 数据库无此账号
        return await cloud.database().collection('curriculumControl').add({
            data: {
                username: event.username,
                addCurriculumLogs: addCurriculumLogs
            }
        })
    }else {                     // 数据库有此账号
        return await cloud.database().collection('curriculumControl').where({
            username: event.username
        }).update({
            data: {
                addCurriculumLogs: addCurriculumLogs
            }
        })
    }
    
}


/**
* @param: username: "用户学号" num;
*         nickName: "用户名称" String,
*         ConcealCurriculumLogs: "隐藏课程记录" [Object],
*/
async function ConcealCurriculumLogs(event) {
    // 去除数组中的 NULL
    let ConcealCurriculumLogs = event.ConcealCurriculumLogs.filter(item => item);

    const isHava = (await cloud.database().collection('curriculumControl').where({
        username: event.username
    }).get()).data.length
    if(isHava === 0) {          // 数据库无此账号
        return await cloud.database().collection('curriculumControl').add({
            data: {
                username: event.username,
                ConcealCurriculumLogs: ConcealCurriculumLogs
            }
        })
    }else {                     // 数据库有此账号
        return await cloud.database().collection('curriculumControl').where({
            username: event.username
        }).update({
            data: {
                ConcealCurriculumLogs: ConcealCurriculumLogs
            }
        })
    }
}