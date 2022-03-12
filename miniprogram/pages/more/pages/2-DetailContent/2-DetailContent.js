// pages/more/pages/2-DetailContent/2-DetailContent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  EditComment: function (e) { // 12-27 重构本函数
    let outIndex = e.currentTarget.dataset.bigindex
    let inIndex = e.currentTarget.dataset.small
    let edit_style = this.data.edit_style;
    let ShowDelCom = 0;
    this.data.Commentindex = outIndex
    this.data.inIndex = inIndex
    // picker动画样式
    if (edit_style == undefined || edit_style == 'edit_hide') {
      edit_style = 'edit_show'
    } else {
      edit_style = 'edit_hide'
    }
    console.log(edit_style);
    this.setData({
      edit_style: edit_style
    })
    setTimeout(() => {
      this.setData({
        comEdit: !this.data.comEdit,
      })
    }, 200);
    if (outIndex != undefined) {
      if(inIndex === undefined){
        let nickName = this.data.CommentList[outIndex].nickName; // 该评论的评论者
        let username = this.data.CommentList[outIndex].username; // 该评论的评论者学号
        let CommentContent = this.data.CommentList[outIndex].InputComment
      }else{
        let nickName = this.data.CommentList[outIndex].Reply[inIndex].nickName; // 该评论的评论者
        let username = this.data.CommentList[outIndex].Reply[inIndex].username; // 该评论的评论者学号
        let CommentContent = this.data.CommentList[outIndex].Reply[inIndex].InputComment
      }
      // 判断是否本人的评论 -> 凭学号
      if (username === args.username) {
        ShowDelCom = 1;
      }
      this.setData({
        ShowDelCom,
        CommentName: nickName,
        CommentContent: this.data.CommentList[outIndex].InputComment,
        isChecked: true,
      })
    }
    // this.data.ShowDelCom = 0;    //初始化
    outIndex = 0
  },
  replySubmit: function (e) {
    var that = this;
    let res = this.isNull(e.detail.value);
    var outIndex = this.data.Commentindex
    var inIndex = this.data.inIndex
    const content = this.data.content;
    if (res) {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none'
      })
    } else {
      var add = {
        "InputReply": e.detail.value,
        "ReplyTime": new Date().getTime(),
        "iconUser": args.iconUrl,
        "nickName": args.nickName,
        "username": args.username,
        "Replied": "",
      }
      if (inIndex === -1) {
        add.Replied = this.data.CommentList[outIndex].nickName
      } else {
        add.Replied = this.data.CommentList[outIndex].Reply[inIndex].nickName
      }
      // this.data.CommentList[index].Reply.push(add)
      // console.log("this.data.CommentList",this.data.CommentList)
      wx.cloud.callFunction({
        name: 'NewCampusCircle',
        data: {
          url: 'CommentControl',
          addData: add,
          index: this.data.Commentindex,
          _id: that.data.content._id,
          username: that.data.username,
          type: 'replyComment'
        },
        success: res => {
          this.data.CommentList[outIndex].Reply.push(add)
          wx.hideLoading()
          console.log("成功添加", res);
          that.ShowComment()
        },
        fail: err => {
          wx.showToast({
            title: '请求失败',
            icon: 'none',
          })
          console.error
        }
      })
      this.setData({
        Input: ""
      })
      // 12-27新增：将评论以记录形式上传
      // 处理得到评论者信息
      let character = {
        userName: args.username,
        iconUrl: args.iconUrl,
        nickName: args.nickName
      }
      // 被评论者信息
      if (inIndex === -1) {
        var be_character = {
          userName: this.data.CommentList[outIndex].username,
          iconUrl: this.data.CommentList[outIndex].iconUrl,
          nickName: this.data.CommentList[outIndex].nickName
        }
        var be_username = this.data.CommentList[outIndex].username
      } else {
        var be_character = {
          userName: this.data.CommentList[outIndex].Reply[inIndex].username,
          iconUrl: this.data.CommentList[outIndex].Reply[inIndex].iconUrl,
          nickName: this.data.CommentList[outIndex].Reply[inIndex].nickName
        }
        var be_username = this.data.CommentList[outIndex].Reply[inIndex].username
      }


      // 云函数增加一条评论记录
      wx.cloud.callFunction({
        name: "CampusCircle",
        data: {
          type: "ReplyCommentControlLogs",
          character: character,
          be_character: be_character,
          username: that.data.username,
          be_username: be_username,
          content: e.detail.value,
          createTime: new Date().getTime(),
          arcticle: this.data.content,
          arcticle_id: this.data.content._id,
          _id: this.data.content._id
        },
        success(res) {
          console.log(res, "调用评论云函数成功");
        },
        fail(e) {
          wx.showToast({
            title: '回复评论失败',
            icon: 'none'
          })
          console.log(e, "回复评论失败");
        }
      })
      setTimeout(() => {
        this.setData({
          comReply: !this.data.comReply,
        })
      }, 200);
      
    }
    this.data.inIndex = -1
  },
  DelComment: function () {
    var outIndex = this.data.Commentindex
    var inIndex=this.data.inIndex
    var that = this
    const content = that.data.content;
    let changeStatusTime = new Date().getTime();
    let character = {
      userName: args.username,
      iconUrl: args.iconUrl,
      nickName: args.nickName
    }
    if(inIndex===undefined || inIndex===-1){
      var be_character = {
        iconUrl: content.iconUrl,
        nickName: content.nickName
      }
      var delData = that.data.CommentList[outIndex]
      var type1 = 'delComment'
      var type2 = 'CancelCommentControlLogs'
      var Input = that.data.CommentList[outIndex].InputComment; 
      var List=that.data.CommentList
    }else{
      var be_character = {
        iconUrl: that.data.CommentList[outIndex].Reply[inIndex].iconUser,
        nickName: that.data.CommentList[outIndex].Reply[inIndex].nickName
      }
      var delData = that.data.CommentList[outIndex].Reply[inIndex]
      var type1 = 'delReply'
      var type2 = 'CancelReplyControlLogs'
      var Input = that.data.CommentList[outIndex].Reply[inIndex].InputReply; 
      var List=that.data.CommentList[outIndex].Reply
    }
    wx.showModal({
      title: '提示',
      content: '确定删除?',
      success(res) {
        that.setData({
          ShowDelCom:0
        })
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'NewCampusCircle',
            data: {
              url: 'CommentControl',
              type: type1,
              username : that.data.username,
              _id: that.data.content._id,
              index:outIndex,
              delData: delData
            },
            success: res => {
              that.data.CommentList.splice(outIndex, 1)
              // 12-27 新增,修改评论状态
              wx.cloud.callFunction({
                name:'CampusCircle',
                data: {
                  type: type2,
                  character: character,
                  username : that.data.username,
                  be_character: be_character,
                  be_username: that.data.content.username,
                  content: Input,
                  createTime: changeStatusTime,
                  arcticle: content,
                  arcticle_id: content._id,
                  _id: that.data.content._id
                }
              }),
              that.ShowComment()
              that.setData({
                comEdit: !that.data.comEdit
              })
              // 更新全局
              app.globalData.allList.forEach((item,outIndex) => {
                item.forEach((e,i) => {
                  if (e._id === that.data.CardID) {
                    e.CommentList.pop()
                  }
                })
              })
              // 内外渲染一致
              moreUtil.setAllList(app.globalData.allList,"评论")
            },
            fail: err => {
              console.error
              that.setData({
                comEdit: !that.data.comEdit
              })
            },
          })
          console.log();
          
        } else if (res.cancel) {
          console.log('用户点击取消')
          that.setData({
            ShowDelCom:1
          })
        }
      }
    })
    that.data.inIndex=-1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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