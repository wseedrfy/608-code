var util = require("../dist/util/公式/Formula")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray:["N = x + y 或 N = x - y","N = x * y","N = x / y","N = kx"],
    index:-1,
    instrument_name:"请选择使用的公式",
    show:false, //数据输入的状态
    uncertain_x:"",
    uncertain_y:"",
    x_value:"",
    y_value:"",
    computer_value:"NAN",
    Parameters_k:"",
    show_watch:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let a =util.add_u(1,2)
    console.log(a)
  },
  //校验数据类型
    //提交表单前的数据处理
 
   checkoutData:function(check_value,type) {
    if(type == "number"){
      if(isNaN(Number(check_value))){
        return false
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
      return false
    }
    else{
      if(res[0]==0){
        return false
      }
      return res
    }
    }
  },
  //想要封装称为一个函数还是先放在这里吧
  // process(a,b,fuc){
  //   if(a&&b){
  //     let res = util.add_u(a,b)
  //     this.setData({computer_value:res})
  //   }

  //   else{
  //     wx.showToast({
  //       title: "未输入或输入格式错误",
  //       icon:"none"
  //     })
  //   }
  // },
  computer_input(e){
      this.setData({ [e.target.id]:e.detail.value})
  },
  sumbit(){

    let uncertain_x = this.checkoutData(this.data.uncertain_x,"number")
    let uncertain_y = this.checkoutData(this.data.uncertain_y,"number")
    let x_value = this.checkoutData(this.data.x_value,"array")
    let y_value = this.checkoutData(this.data.y_value,"array")
    console.log(uncertain_x,uncertain_y)
    console.log(x_value,this.data.y_value,"我在86行")
    if(this.data.index==0){
      if(uncertain_x&&uncertain_y){
        let res = util.add_u(uncertain_x,uncertain_y)
        wx.showToast({
          title: '计算成功',
          icon:"none"
        })
        this.setData({computer_value:res})
      }

      else{
        wx.showToast({
          title: "未输入或输入格式错误",
          icon:"none"
        })
      }
    }
    else if (this.data.index==1){
      if(uncertain_x&&uncertain_y&&x_value.length==y_value.length){
        let res = util.multiply_u(uncertain_x,uncertain_y,x_value,y_value)
        this.setData({computer_value:res})
        wx.showToast({
          title: '计算成功',
          icon:"none"
        })
      }
      else{
        wx.showToast({
          title: "未输入或输入格式错误",
          icon:"none"
        })
      }
    }
    else if(this.data.index==2){

      if(uncertain_x&&uncertain_y&&x_value.length==y_value.length){
        let res = util.expect_u(uncertain_x,uncertain_y,x_value,y_value)
        this.setData({computer_value:res})
        wx.showToast({
          title: '计算成功',
          icon:"none"
        })
      }
      else{
        wx.showToast({
          title: "未输入或输入格式错误",
          icon:"none"
        })
      }
    }
    else if(this.data.index==3){
      let k = this.checkoutData(this.data.Parameters_k,"number")
      if(uncertain_x&&k){
        let res = util.linear_u(uncertain_x,k)
        this.setData({computer_value:res})
        wx.showToast({
          title: '计算成功',
          icon:"none"
        })
      }
      else{
        wx.showToast({
          title: "未输入或输入格式错误",
          icon:"none"
        })
      }
    }

  },
  bindMultiPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      instrument_name:this.data.multiArray[e.detail.value],
      computer_value:"NAN",
      // uncertain_x:"",
      // uncertain_y:"",
      // x_value:"",
      // y_value:"",

    })
    console.log(e.detail.value)
    if(this.data.index==0){
      this.setData({show:false})
    }
    else if(this.data.index==1){
      this.setData({show:true})
    }
    else if(this.data.index==2){
      this.setData({show:true})
    }
    else if(this.data.index==3){
      this.setData({show:false})

    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  watch(){
    wx.navigateTo({
      url: '/pages/HOT/HotTop/HotTop?content=间接不确定度二跳',
    })
    // if()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }

})