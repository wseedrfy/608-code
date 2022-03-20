var util = require("../dist/util/公式/Formula")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray:["N = x + y","N = x * y","N = x / y","N = kX"],
    index:-1,
    instrument_name:"请选择使用的公式",
    show:false, //数据输入的状态
    uncertain_x:"",
    uncertain_y:"",
    x_value:"",
    y_value:"",
    computer_value:"NAN"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

  },
  //校验数据类型
    //提交表单前的数据处理
 
   checkoutData:function(check_value,type) {
    if(type == "number"){
      if(isNaN(Number(check_value))){
        return "输入格式错误"
      }
      else{
        return Number(check_value)
      }
    }
    if(type=="array"){
      let value =check_value.split(" ")
      console.log(value)
      let res = []
      let flag = 0
      value.forEach(element => {
        if(isNaN(Number(element))){
          flag=1        
        }
      res.push(Number(element))
    });
    if(flag==1){
      return "数据输入框格式错误"
    }
    else{
      if(res[0]==0){
        return "您还未输入数据"
      }
      return res
    }
    }
  },
  computer_input(e){
    console.log(e)
      this.setData({ [e.target.id]:e.detail.value})
  },
  sumbit(){
    let uncertain_x = this.checkoutData(this.data.uncertain_x,"number")
    let uncertain_y = this.checkoutData(this.data.uncertain_y,"number")
    let x_value = this.checkoutData(this.data.x_value,"array")
    let y_value = this.checkoutData(this.data.y_value,"array")
    if(this.data.index==0){
      let res = util.add_u(uncertain_x,uncertain_y)
      console.log(res)
    }
    else if (this.data.index==1){
      let res = util.multiply_u(uncertain_x,uncertain_y,x_value.y_value)
      console.log(res)
    }
    else if(this.data.index==2){
      let res = util.expect_u(uncertain_x,uncertain_y,x_value,y_value)
      console.log(res)
    }
    // else if(this.data.index==3){

    // }
    // switch (this.data.index){
    //   case 1:
    //     let res = util.add_u(Number(this.data.uncertain_x),Number(this.data.uncertain_y))
    //   case 2:

    // }
  },
  bindMultiPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      instrument_name:this.data.multiArray[e.detail.value]
    })
    console.log(e.detail.value)
    if(this.data.index==0){
      this.setData({show:false})
    }
    else if(this.data.index==1||2){
      this.setData({show:true})
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  onReady: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        isLoading: false
      });
    }, 800);
  },
})