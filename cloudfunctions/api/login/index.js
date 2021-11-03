
exports.main = async (event) => {
  try{
    const loginSchool = require("./school/" + event.school + '/login.js') 
    return await loginSchool.main(event)
  }catch(e){
    console.log(e)
    return {msg:'学校错误'}
  }
}


