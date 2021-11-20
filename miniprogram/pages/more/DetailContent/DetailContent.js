var util = require("../../../utils/util.js")
var app = getApp()
Page({
  data:{
    isChecked:true,
    InputComment:" ",
    CommentList:[],
    ContentTime:0,
  },
  Comment_Inputting:function(){
    this.setData({
      isChecked:false,
    })
  },
  formSubmit:function(e){     //添加与存储
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
      wx.cloud.callFunction({
        name: 'CampusCircle',
        data: {
          CommentList:that.data.CommentList,
          Time:that.data.ContentTime,
          type: 'writeComment'
        }, success: res => { 
          that.ShowComment()
        }, 
        fail: err => {
          console.error
        }
      })
      that.setData({
        Input:" "
      })
    }
  },
  ShowComment:function(){
    var Show=[]
    var length=this.data.CommentList.length
    for(let i=0;i<length;i++){
      var PreTime=this.data.CommentList[i].CommentTime
      var AftTime=util.timeago(PreTime, 'Y年M月D日 h:m:s')
      Show.push({
        InputContent:this.data.CommentList[i].InputComment,
        InputTime:AftTime
      })
      console.log("Show",Show)
      this.setData({
        ShowList:Show,
        CommentNum:length
      })
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
    var Time=util.timeago(content.Time, 'Y年M月D日 h:m:s')
    this.data.ContentTime=content.Time

    this.animate('.ShowImg', [{
      opacity: '0',
      height: '30%',
    }, {
      opacity: '1',
      height: '100%',
    }], 1000)

    wx.cloud.callFunction({
      name: 'CampusCircle',
      data: {
        Time:content.Time,
        type: 'readComment'
      },
      complete: res => {
        this.data.CommentList=res.result.data[0].CommentList
        console.log("res.result.data[0].CommentList",this.data.CommentList)
        if(this.data.CommentList){ 
          this.ShowComment()
        }else{
          this.data.CommentList=[]
          this.setData({
            CommentNum:0
          })
        }
      }
    });

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
    this.ShowComment()
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