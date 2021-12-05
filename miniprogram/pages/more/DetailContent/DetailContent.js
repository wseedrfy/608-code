var util = require("../../../utils/util.js")
var app = getApp()
Page({
  data:{
    isChecked:true,
    InputComment:" ",
    CommentList:[],
    ContentTime:0,
    showEdit:false,
    comEdit:false,
    CardID:"",
    Commentindex:0,
    ShowDelCom:0,
  },
  More:function(){
    var showEdit=this.data.showEdit
    var that=this
    console.log("33333")
    if(showEdit){
      this.setData({
        edit_style:"edit_hide"
      })
      setTimeout(() => {
        that.setData({
          showEdit: !showEdit
        })
      }, 200);
    }else{
      this.setData({
        edit_style:"edit_show",
        showEdit:!showEdit
      })
    }
  },
  EditComment:function(e){
    var comEdit=this.data.comEdit
    var that=this
    var index=e.currentTarget.dataset.index
    that.data.Commentindex=index
    console.log("index",index)
    if(index || index==0){
      console.log("233")
      console.log("that.data.CommentList[index].userName",that.data.CommentList[index].userName)
      console.log("that.data.userName",that.data.userName)
      if((that.data.CommentList[index].userName==that.data.userName && that.data.CommentList[index].iconUser==that.data.iconUrl) || (that.data.SentName==that.data.userName && that.data.SenticonUrl==that.data.iconUrl)){
        that.data.ShowDelCom=1
      }
    }
    if(comEdit){
      that.setData({
        edit_style:"edit_hide"
      })
      setTimeout(() => {
        that.setData({
          comEdit: !comEdit
        })
      }, 200);
    }else{
      that.setData({
        edit_style:"edit_show",
        comEdit:!comEdit,
        ShowDelCom:that.data.ShowDelCom,
        CommentName:that.data.ShowList[index].userName,
        CommentContent:that.data.ShowList[index].InputContent
      })
    }
    that.data.ShowDelCom=0
  },
  DelCard:function(){
    var that=this
    wx.showModal({
      title: '提示',
      content: '确定删除?',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.cloud.callFunction({
            name: 'CampusCircle',
            data: {
              id:that.data.CardID,
              type: 'delCard'
            }, success: res => { 
              console.log("success")
              that.setData({
                showEdit:!that.data.showEdit
              })
              let pages = getCurrentPages();   //获取小程序页面栈
              let beforePage = pages[pages.length -2];  //获取上个页面的实例对象
              console.log("beforePage",beforePage)
              beforePage.onLoad();
              wx.navigateBack({
                delta: 1,
              })
            }, 
            fail: err => {
              console.error
              that.setData({
                showEdit:!that.data.showEdit
              })
            },
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  DelComment:function(){
    var index=this.data.Commentindex
    var that=this
    wx.showModal({
      title: '提示',
      content: '确定删除?',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.data.CommentList.splice(index,1)
          console.log("that.data.CommentList",that.data.CommentList)
          wx.cloud.callFunction({
            name: 'CampusCircle',
            data: {
              id:that.data.CardID,
              CommentList:that.data.CommentList,
              type: 'delComment',
            }, success: res => { 
              console.log("success")
              that.ShowComment()
              that.setData({
                comEdit:!that.data.comEdit
              })
            }, 
            fail: err => {
              console.error
              that.setData({
                comEdit:!that.data.comEdit
              })
            },
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  
  CopyComment:function(){
    wx.setClipboardData({
      //准备复制的数据
       data: this.data.CommentContent,
       success: function (res) {
         wx.showToast({
           title: '复制成功',
         });
       }
    });
    this.setData({
      comEdit:!this.data.comEdit
    })
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
        "CommentTime":new Date().getTime(),
        "iconUser":that.data.iconUrl,
        "userName":that.data.userName
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
    console.log("length",length)
    for(let i=0;i<length;i++){
      var PreTime=this.data.CommentList[i].CommentTime
      console.log("PreTime",PreTime)
      var AftTime=util.timeago(PreTime, 'Y年M月D日')
      Show.push({
        InputContent:this.data.CommentList[i].InputComment,
        InputTime:AftTime,
        iconUser:this.data.CommentList[i].iconUser,
        userName:this.data.CommentList[i].userName
      })
    }
    console.log("Show",Show)
    app.globalData.Comment=this.data.CommentList
    console.log("app.globalData.Comment",app.globalData.Comment)
    this.setData({
      ShowList:Show,
      CommentNum:length
    })
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
    var more=options.del
    var jj=content.Time
    var Time=util.timeago(jj, 'Y年M月D日')
    this.data.CardID=content._id
    this.data.ContentTime=content.Time
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
    var that=this
    wx.getStorage({
      key:"data",
      success(res){
        console.log("JSON.parse(res.data)",JSON.parse(res.data))
        var data = JSON.parse(res.data)
        var userName = data.nickName
        var iconUrl = data.iconUrl
        that.setData({
          userName:userName,
          iconUrl:iconUrl
        })
      },
    })
    this.setData({
      ImgSrc:content.Cover,
      Title:content.Title,
      Text:content.Text,
      Label:content.Label,
      Photo:content.AllPhoto,
      Time:Time,
      Height:content.ShowHeight,
      SenticonUrl:content.iconUrl,
      SentName:content.nickName,
      more:more
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