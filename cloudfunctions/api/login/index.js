
exports.main = async (wxContext, event) => {
  try{
    const loginSchool = require("../school/" + event.school + '/login.js') 
    return await loginSchool.main(wxContext, event)
  }catch(e){
    return '学校错误'
  }
}


