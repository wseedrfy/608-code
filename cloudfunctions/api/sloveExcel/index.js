
const cloud = require('wx-server-sdk');
cloud.init();
exports.main = async (event) => {
  try{
    const sloveExcel = require("./" + event.school + '/index.js') 
    const returnData = await sloveExcel.main(event)
  }catch(e){
    console.log(e)
    return {msg:'学校错误',error: e}
  }
}


