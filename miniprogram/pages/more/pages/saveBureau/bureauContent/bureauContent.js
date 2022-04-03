// pages/more/pages/saveBureau/bureauContent/bureauContent.js
var app = getApp()
var util = require("../../../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    rectHeight: getApp().globalData.rectHeight,
    windowHeight: getApp().globalData.windowHeight,
    commentList:[],
    comEdit: false,       // 评论区复制/删除弹窗
  },
  popUp: function () {          //控制卡片/评论弹窗
    var edit_style = 'edit_hide';
    // picker动画样式
    if (edit_style == undefined || edit_style == 'edit_hide') {
      edit_style = 'edit_show'
    } else {
      edit_style = 'edit_hide'
    }
    this.setData({ edit_style })
  },
  chooseSex(){
    const args = wx.getStorageSync('args')
    wx.showModal({
      title: '请选择您的性别',
      content: '*确定后不能更改，请谨慎选择',
      cancelText: '男生',
      cancelColor: '#5D81CF',
      confirmText: '女生',
      confirmColor: '#EC7A73',
      success (res) {
        if (res.confirm) {
          args.sex="woman"
        } else if (res.cancel) {
          args.sex="man"
        }
        wx.setStorage({
          key:"args",
          data:args
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  joinIn(e){        //-----这代码写得太垃圾了，全是if else嵌套
    if(this.endTime  - this.startTime < 350){     //----解决因长按事件与短按事件同时绑定而引发的冲突
      var result=0
      var sex = e.currentTarget.dataset.sex
      const args = wx.getStorageSync('args')
      if(e.currentTarget.id){
        var index = parseInt(e.currentTarget.id)      //----直接获取的e.currentTarget.id类型为string，不能直接使用。需要转为number类型
      }
      if(!args.sex){        //-----判断有无绑定性别
        this.chooseSex()
      }else{
        var add={
          userName:args.username,
          iconUrl:args.iconUrl,
          nickName:args.nickName,
        }

        if((sex==="manNum" && args.sex==="woman") || (sex==="womanNum" && args.sex==="man")){     //-----若点击事件的性别与绑定的性别不一致
          wx.showToast({
            title: '请正确选择性别',
            icon: 'none'
          })
          return
        }else if(this.data.userName===args.username){
          wx.showToast({
            title: '您已经是局长',
            icon: 'none'
          })
        }else if(this.data.userName!=args.username){       //-----判断“我”是不是局长
          this.data.manNum.forEach(item => {
            if(item.userName===args.username){
              result=-1
            }
          });
          this.data.womanNum.forEach(item => {
            if(item.userName===args.username){
              result=-1
            }
          });
          if(result===-1){
            wx.showToast({
              title: '切勿重复加入',
              icon: 'none'
            })
          }else{     //-----通过判断用户args.sex，决定用户进男组还是女组
            if(args.sex==="man"){
              index!=undefined ? this.data.manNum[index] = add : this.data.manNum[this.data.manNum.length-1] = add
            }else{
              index!=undefined ? this.data.womanNum[index] = add : this.data.womanNum[this.data.womanNum.length-1] = add
            }
            wx.cloud.callFunction({
              name: 'saveBureau',
              data: {
                manNum:this.data.manNum,
                womanNum:this.data.womanNum,
                _id:this.data._id,
                type: "bureauMember"
              },
              success: res => {
                wx.showToast({
                  title: '入局成功',
                  icon: 'none'
                })
              },
              fail: err => {
                console.error
              }
            })
          }
        }
        this.setData({
          manNum:this.data.manNum,
          womanNum:this.data.womanNum
        })
      }
    }
  },

  bindTouchStart: function(e) {
    this.startTime = e.timeStamp;
  },
  bindTouchEnd: function(e) {
    this.endTime = e.timeStamp;
  },

  delNum(e){    //----删除入局成员
    const args = wx.getStorageSync('args')
    var index = parseInt(e.currentTarget.id)
    var sex = e.currentTarget.dataset.sex
    var show=0
    var that=this
    if(sex==="manNum"){
      if(that.data.manNum[index].userName===args.username){
        show=1
      }
    }else{
      if(that.data.womanNum[index].userName===args.username){
        show=1
      }
    }
    if(show===1){
    wx.showModal({
      title: '确定删除？',
      success (res) {
        if (res.confirm) {
          sex === "manNum" ? that.data.manNum[index] = 1 : that.data.womanNum[index] = 1
          wx.cloud.callFunction({
            name: 'saveBureau',
            data: {
              manNum:that.data.manNum,
              womanNum:that.data.womanNum,
              _id:that.data._id,
              type: "bureauMember"
            },
            success: res => {
              wx.showToast({
                title: '出局成功!',
                icon: 'none'
              })
              that.setData({
                manNum:that.data.manNum,
                womanNum:that.data.womanNum
              })
            },
            fail: err => {
              console.error
              wx.showToast({
                title: '出局失败!',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  }
  },



  back(){
    // let pages = getCurrentPages();
    // let prevPage = pages[pages.length - 2];
    // console.log(this.data.commentList);
    // prevPage.setData({ 
    //   manNum:this.data.manNum,
    //   womanNum:this.data.womanNum,
    //   commentList:this.data.commentList,
    // })
    wx.navigateBack({
      delta: 1,  // 返回上一级页面。
    })
  },
  transformTime(){
    var showComment=[]
    if(this.data.commentList.length!=0){
      showComment=JSON.parse(JSON.stringify(this.data.commentList))
      showComment.forEach(item => {
        item.time = util.timeago(item.time, 'Y年M月D日')
        if(item.reply){
          item.reply.map(item => {
            item.time = util.timeago(item.time, 'Y年M月D日')
          })
        }
      })
      this.setData({
        showComment,
        none:false
      })
    }else{
      this.setData({
        showComment,
        none:true
      })
    }
  },
  showInput(){
    this.setData({
      showInput:true
    })
  },
  
  obatinComment(e){
    const args = wx.getStorageSync('args')
    var outIndex=this.data.outIndex
    var inIndex=this.data.inIndex
    var index=this.data.index
    var type=""
    var indexTemp = -1
    if(e){
      this.setData({
        inputComment:e.detail.value
      })
      if(e.detail.value.textarea){
        this.setData({
          inputComment:e.detail.value.textarea
        })
      }
    }
    var addData={
      input:this.data.inputComment,
      userName: args.username,
      time:new Date().getTime(),
      iconUrl:args.iconUrl,
      nickName:args.nickName,
    }
    if(outIndex>=0 || index>=0){
      console.log("enter");
      if(inIndex>=0){
        addData.replyName=this.data.commentList[outIndex].reply[inIndex].nickName
      }else{
        outIndex>=0 ? addData.replyName=this.data.commentList[outIndex].nickName : addData.replyName=this.data.commentList[index].nickName
      }
      outIndex>=0 ? this.data.commentList[outIndex].reply.push(addData) : this.data.commentList[index].reply.push(addData)
      outIndex>=0 ? indexTemp=outIndex : indexTemp=index
      type="replyComment"
    }else{
      addData.reply=[]
      this.data.commentList.push(addData)
      type="writeComment"
    }
    wx.cloud.callFunction({
      name: 'saveBureau',
      data: {
        addData:addData,
        index:indexTemp,
        _id:this.data._id,
        type: type
      },
      success: res => {
        wx.showToast({
          title: '评论成功',
          icon: 'none'
        })

        this.transformTime()
        this.setData({
          input:"",
          index:-1
        })
      },
      fail: err => {
        console.error
      }
    })
  },
  editComment(e){
    const args = wx.getStorageSync('args')
    var index = parseInt(e.currentTarget.id)
    var inIndex = e.currentTarget.dataset.in
    var outIndex = e.currentTarget.dataset.out
    var ShowDelCom=false
    var CommentName=""
    var CommentContent=""
    var that=this
    this.popUp()
    if(!!this.data.commentList[index]){
      if(this.data.commentList[index].userName===args.username){
        ShowDelCom=true
      }
      CommentName=this.data.commentList[index].nickName
      CommentContent=this.data.commentList[index].input
    }
    if(!!this.data.commentList[outIndex]){
      if(this.data.commentList[outIndex].reply[inIndex].userName===args.username){
        ShowDelCom=true
      }
      CommentName=this.data.commentList[outIndex].reply[inIndex].nickName
      CommentContent=this.data.commentList[outIndex].reply[inIndex].input
    }
    this.setData({ 
      comEdit:!this.data.comEdit,
      ShowDelCom,
      CommentName,
      CommentContent,
      index,
      inIndex,
      outIndex
    })
  },

  replyComment(){
    this.popUp()
    this.setData({
      showInput:true,
      comEdit: !this.data.comEdit
    })
    // this.obatinComment()
  },

  copyComment() {
    var index=this.data.index
    wx.setClipboardData({
      //准备复制的数据
      data: this.data.commentList[index].input,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
    // 改变 edit_style
    this.popUp()
    // 改变 comEdit
    this.setData({
      comEdit: !this.data.comEdit
    })
  },

  delComment(){
    var inIndex=this.data.inIndex
    var outIndex=this.data.outIndex
    var index=this.data.index
    var delData=""
    var type=""
    var that=this
    if(outIndex>=0){
      type="delReply"
      delData=that.data.commentList[outIndex].reply[inIndex]
    }else{
      type="delComment"
      delData=that.data.commentList[index]
    }
    wx.showModal({
      title: '确定删除？',
      success (res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'saveBureau',
            data: {
              delData:delData,
              _id:that.data._id,
              outIndex:outIndex,
              type: type
            },
            success: res => {
              outIndex>=0 ? that.data.commentList[outIndex].reply.splice(inIndex,1) : that.data.commentList.splice(index,1)
              that.transformTime()
              wx.showToast({
                title: '删除成功!',
                icon: 'none'
              })
              that.popUp()
              that.setData({
                comEdit:!that.data.comEdit,
              })
            },
            fail: err => {
              console.error
              wx.showToast({
                title: '删除失败!',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  },
  
  onLoad: function (options) {
    var content=wx.getStorageSync('content')
    content.time = util.timeago(content.time, 'Y年M月D日')
    this.data.commentList=content.commentList
    this.transformTime()
    this.setData({
      iconUrl:content.iconUrl,
      locationName:content.locationName,
      manNum:content.manNum,
      womanNum:content.womanNum,
      nickName:content.nickName,
      userName:content.userName,
      photo:content.photo,
      text:content.text,
      time:content.time,
      _id:content._id,
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
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    console.log(this.data.commentList);
    prevPage.setData({ 
      manNum:this.data.manNum,
      womanNum:this.data.womanNum,
      commentList:this.data.commentList,
    })
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