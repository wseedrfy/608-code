// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
    switch(event.type){
        case "save_dakaRecord":
            return save_dakaRecord(event);
        case "save_dakaStatus":
            return save_dakaStatus(event);
        case "getDakaStatus_ByHashId":
            return await getDakaStatus_ByHashId(event);
        case "updateDakaStatus_ByHashId":
            return await updateDakaStatus_ByHashId(event);
        case "delDakaRecord_ByHashId":
            return delDakaRecord_ByHashId(event);
        case "getAllDakaRecord":
            return await getAllDakaRecord(event);
        case "updateIsDaka":
            return updateIsDaka(event);
    }
}

function save_dakaRecord(event){
    return db.collection("daka_record").add({
        data:{
            task:event.task,
            lable1:event.lable1,
            lable2:event.lable2,
            cycle:event.cycle,
            startTime:event.startTime,
            endTime:event.endTime,
            username:event.username,
            uuid:event.uuid,
            hashId:event.hashId,
        }
    })
}

function save_dakaStatus(event){
    return db.collection("daka_status").add({
        data:{
            task:event.task,
            isDaka:event.isDaka,
            username:event.username,
            count:event.count,
            hashId:event.hashId,
        }
    })
}

async function getDakaStatus_ByHashId(event){
    return await db.collection("daka_status").where({hashId:event.hashId}).get();
}

async function updateDakaStatus_ByHashId(event){
    return await db.collection("daka_status").where({
        hashId:event.hashId
    }).update({
        data:{
            isDaka:true,
            //次数自增1
            count:_.inc(1),
            daka_lastTime:new Date(),
        }
    })
}

function delDakaRecord_ByHashId(event){
    return db.collection("daka_record").where({
        hashId:event.hashId
    }).remove().then(res=>{
        console.log(res);
    })
}

async function getAllDakaRecord(event){
    return await db.collection("daka_record").where({username:event.username}).get()
}

function updateIsDaka(event){
    return db.collection("daka_status").where({
        hashId:event.hashId
    }).update({
        data:{
            isDaka:false
        }
    })
}