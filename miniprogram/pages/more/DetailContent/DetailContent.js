var util = require("../../../utils/util.js")
Page({
  data:{
    isChecked:true,
    InputComment:" ",
    CommentList:[]
  },
  Comment_Inputting:function(){
    this.setData({
      isChecked:false,
    })
  },
  formSubmit:function(e){     //添加与存储
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let{InputComment}=e.detail.value
    var that=this
    if(!InputComment){
      wx.showToast({
        title: '内容不能为空',
        icon:'none'
      })
    }else{
      var add={
        "InputComment":InputComment,
        "CommentTime":new Date().getTime()
      }
      that.data.CommentList.push(add)
      console.log("that.data.CommentList",that.data.CommentList)
    }
  },
  
  /**
   * 页面的初始数据
   */
  ShowImg:function(e){
    var Photo=this.data.Photo
    var index=e.target.dataset.index
    wx.previewImage({
      current: Photo[index],
      urls:Photo,
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var content=JSON.parse(options.content)
    var jj=content.Time
    var Time=util.timeago(jj, 'Y年M月D日 h:m:s')
    console.log("content.ShowHeight",content.ShowHeight)
    this.setData({
      ImgSrc:content.Cover,
      Title:content.Title,
      Text:content.Text,
      Label:content.Label,
      Photo:content.AllPhoto,
      Time:Time,
      Height:content.ShowHeight
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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