// const { isGeneratorFunction } = require("util/types")
// const { Console } = require("console")
var util = require("../../../../utils/util.js")
var moreUtil = require("../../utils/utils")
var app = getApp()

Page({
  data: {
    isChecked: true,
    CommentList: [],
    showEdit: false, // 控制评论区弹窗显示
    comEdit: false, // 评论区复制/删除弹窗
    comReply: false,
    CardID: "",
    inIndex: -1,
    ShowDelCom: 0, // 评论区控制是否出现“删除”按钮
    Commentindex: 0, // 评论区的 index
    Starurl: "../../../../images/zan1.png",
    edit_style: 'edit_hide',
  },
  callFunction: function (type,be_character,Input) {
    const args = wx.getStorageSync('args')
    var that=this
    let character = { // 处理得到点赞者信息
      userName: args.username,
      iconUrl: args.iconUrl,
      nickName: args.nickName
    }
    wx.cloud.callFunction({
      name: "CampusCircle",
      data: {
        type: type,
        character: character,
        be_character: be_character,
        username: that.data.username,
        be_username: that.data.content.username,
        content: Input,
        createTime: new Date().getTime(),
        arcticle: that.data.content,
        arcticle_id: that.data.content._id,
        _id: that.data.content._id,
        Time: that.data.content.Time,
        Star: that.data.content.Star_User.length,
        Star_User: that.data.content.Star_User,
      },
      success(res) {
        console.log(res, "调用评论云函数成功");
      },
      fail(e) {
        if(type === "ReplyCommentControlLogs"){
          wx.showToast({
            title: '回复评论失败',
            icon: 'none'
          })
        }
        if(type === "CommentControlLogs"){
          wx.showToast({
            title: '评论失败',
            icon: 'none'
          })
        }
        if(type === StarControlLogs){
          wx.showToast({
            title: '点赞失败',
            icon: 'none'
          })
        }
      }
    })
  },
  popUp: function () {
    let edit_style = this.data.edit_style;
    // picker动画样式
    if (edit_style == undefined || edit_style == 'edit_hide') {
      edit_style = 'edit_show'
    } else {
      edit_style = 'edit_hide'
    }
    this.setData({ edit_style })
  },

  More: function () {
    var showEdit = this.data.showEdit
    this.popUp()
    this.setData({ showEdit: !showEdit })
  },
  
  EditComment: function (e) { // 3-07 重构本函数
    const args = wx.getStorageSync('args')
    let outIndex = e.currentTarget.dataset.bigindex
    let inIndex = e.currentTarget.dataset.small
    let ShowDelCom = 0;
    this.data.Commentindex = outIndex
    this.data.inIndex = inIndex
    this.popUp()
    this.setData({ comEdit: !this.data.comEdit });
    if (outIndex != undefined) {
      if(inIndex === undefined){
        var nickName = this.data.CommentList[outIndex].nickName; // 该评论的评论者
        var username = this.data.CommentList[outIndex].username; // 该评论的评论者学号
        var CommentContent = this.data.CommentList[outIndex].InputComment
      }else{
        var nickName = this.data.CommentList[outIndex].Reply[inIndex].nickName; // 该评论的评论者
        var username = this.data.CommentList[outIndex].Reply[inIndex].username; // 该评论的评论者学号
        var CommentContent = this.data.CommentList[outIndex].Reply[inIndex].InputReply
      }
      // 判断是否本人的评论 -> 凭学号
      if (username === args.username) {
        ShowDelCom = 1;
      }
      this.setData({
        ShowDelCom,
        CommentName: nickName,
        CommentContent: CommentContent,
        isChecked: true,
      })
    }
    // this.data.ShowDelCom = 0;    //初始化
    outIndex = 0
  },
  ReplyComment: function () {
      this.popUp()
      this.setData({
        comEdit: !this.data.comEdit,
      })
      setTimeout(() => {
        this.setData({
          comReply: !this.data.comReply,
        })
      }, 200);
  },
  replySubmit: function (e) {
    var that = this;
    let res = that.isNull(e.detail.value);
    var outIndex = that.data.Commentindex
    var inIndex = that.data.inIndex
    const args = wx.getStorageSync('args')
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
      if (inIndex === -1 || inIndex === undefined) {
        add.Replied = that.data.CommentList[outIndex].nickName
        var be_character = {
          userName: that.data.CommentList[outIndex].username,
          iconUrl: that.data.CommentList[outIndex].iconUrl,
          nickName: that.data.CommentList[outIndex].nickName
        }
      } else {
        add.Replied = that.data.CommentList[outIndex].Reply[inIndex].nickName
        var be_character = {
          userName: that.data.CommentList[outIndex].Reply[inIndex].username,
          iconUrl: that.data.CommentList[outIndex].Reply[inIndex].iconUrl,
          nickName: that.data.CommentList[outIndex].Reply[inIndex].nickName
        }
      }
      wx.cloud.callFunction({
        name: 'NewCampusCircle',
        data: {
          url: 'CommentControl',
          addData: add,
          index: outIndex,
          _id: that.data.content._id,
          username: that.data.username,
          type: 'replyComment'
        },
        success: res => {
          that.data.CommentList[outIndex].Reply.push(add)
          wx.hideLoading()
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
      that.setData({
        Input: ""
      })
      that.callFunction('ReplyCommentControlLogs',be_character,e.detail.value)
      setTimeout(() => {
        that.setData({
          comReply: !that.data.comReply,
        })
      }, 200);
      
    }
    that.data.inIndex = -1
  },
  DelComment: function () {
    var outIndex = this.data.Commentindex
    var inIndex=this.data.inIndex
    var that = this
    if(inIndex === undefined || inIndex === -1){
      var be_character = {
        iconUrl: that.data.content.iconUrl,
        nickName: that.data.content.nickName
      }
      var delData = that.data.CommentList[outIndex]
      var type1 = 'delComment'
      var type2 = 'CancelCommentControlLogs'
      var Input = that.data.CommentList[outIndex].InputComment; 
    }else{
      var be_character = {
        iconUrl: that.data.CommentList[outIndex].Reply[inIndex].iconUser,
        nickName: that.data.CommentList[outIndex].Reply[inIndex].nickName
      }
      var delData = that.data.CommentList[outIndex].Reply[inIndex]
      var type1 = 'delReply'
      var type2 = 'CancelReplyControlLogs'
      var Input = that.data.CommentList[outIndex].Reply[inIndex].InputReply; 
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
              if(inIndex===undefined || inIndex===-1){
                that.data.CommentList.splice(outIndex, 1)
              }else{
                that.data.CommentList[outIndex].Reply.splice(inIndex, 1)
              }
              that.callFunction(type2,be_character,Input)
              that.ShowComment()
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
            },
          })
          that.setData({
            comEdit: !that.data.comEdit
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
          that.setData({ ShowDelCom:1 })
        }
      }
    })
    that.data.inIndex=-1
  },
  CopyComment: function () {
    wx.setClipboardData({
      //准备复制的数据
      data: this.data.CommentContent,
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
  //删除
  DelCard: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定删除?',
      success(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'CampusCircle',
            data: {
              _id: that.data.CardID,
              username: that.data.username,
              type: 'delCard'
            },
            success: res => {
              that.setData({
                showEdit: !that.data.showEdit
              })
              // 更新全局
              app.globalData.allList.forEach((item,index) => {
                item.forEach((e,i) => {
                  if (e._id === that.data.CardID) {
                    app.globalData.allList[index].splice(i,1);
                  }
                })
              })
              // 内外部渲染一致
              moreUtil.setAllList(app.globalData.allList,"删除卡片")
            },
            fail: err => {
              console.error
              that.setData({
                showEdit: !that.data.showEdit
              })
            },
          })
        }
      }
    })
  },

  Comment_Inputting: function () {
    this.setData({ isChecked: false })
  },
  // 评论内容判空 返回布尔值：false -> 非空; true -> 空/全是空格
  isNull(str) {
    if (str == "") return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
  },
  formSubmit: function (e) { //添加与存储
    var that = this;
    const args = wx.getStorageSync('args')
    // 判空
    let res = that.isNull(e.detail.value.InputComment);
    if (res) {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none'
      })
    } else {
      let add = {
        "InputComment": e.detail.value.InputComment,
        "CommentTime": new Date().getTime(),
        "iconUser": args.iconUrl,
        "nickName": args.nickName,
        "username": args.username,
        "Reply": [],
      }
      wx.showLoading({
        title: '发送中',
        mask: true
      })

      wx.cloud.callFunction({
        name: 'NewCampusCircle',
        data: {
          url: 'CommentControl',
          addData: add,
          username: that.data.username,
          Time: that.data.content.Time,
          _id: that.data.content._id,
          type: 'writeComment'
        },
        success: res => {
          that.data.CommentList.push(add);
          wx.hideLoading()
          that.ShowComment()
          // 更新全局
          app.globalData.allList.forEach(item => {
            item.forEach(e => {
              if (e._id === that.data.CardID) {
                e["CommentList"] = that.data.CommentList;
              }
            })
          })
          // 内外渲染一致
          moreUtil.setAllList(app.globalData.allList,"评论")
        },
        fail: err => {
          wx.showToast({
            title: '请求失败',
            icon: 'none',
          })
          console.error
        }
      })
      that.setData({ Input: "" })
      // 被评论者信息
      let be_character = {
        userName: this.data.content.username,
        iconUrl: this.data.content.iconUrl,
        nickName: this.data.content.nickName
      }
      // 云函数增加一条评论记录
      that.callFunction('CommentControlLogs',be_character,e.detail.value.InputComment)
    }
  },
  ShowComment: function () {
    var Show = []
    var copyList = JSON.parse(JSON.stringify(this.data.CommentList))
    for (let i = 0; i < this.data.CommentList.length; i++) {
      if (this.data.CommentList[i] != null) {
        var AftTime = util.timeago(this.data.CommentList[i].CommentTime, 'Y年M月D日')
        if (copyList[i].Reply != null) {
          for (let j = 0; j < copyList[i].Reply.length; j++) {
            copyList[i].Reply[j].ReplyTime = util.timeago(copyList[i].Reply[j].ReplyTime, 'Y年M月D日')
          }
        }
        Show.push({
          InputContent: this.data.CommentList[i].InputComment,
          InputTime: AftTime,
          iconUser: this.data.CommentList[i].iconUser,
          nickName: this.data.CommentList[i].nickName,
          username: this.data.CommentList[i].username,
          Reply: copyList[i].Reply
        })
      }
    }

    app.globalData.allList.forEach(e => {
      if (e) {
        if (e._id === this.data.CardID) {
          e.CommentList = this.data.CommentList
        }
      }
    })
    this.setData({
      ShowList: Show,
      CommentNum: this.data.CommentList.length,
    })
  },

  ShowImg: function (e) {
    var Photo = this.data.content.AllPhoto
    var index = e.target.dataset.index
    wx.previewImage({
      current: Photo[index],
      urls: Photo,
    })
  },

  //
  async getWindowData () {
    let h = await app.getSystemData('windowHeight')
    this.setData({ windowHeight: h })
  },
 
  async ctFocus (e) {
    let { windowHeight } = this.data
    let keyboard_h = e.detail.height
    let ctInput_top = windowHeight - keyboard_h
    let ctInput_h = await app.queryNodes('#ctInput', 'height')
    ctInput_top -= ctInput_h
    this.setData({ ctInput_top })
  },
  
  onLoad: function (options) {
    var that = this;
    const args = wx.getStorageSync('args')
    let jsonStr = decodeURIComponent(options.content)
    var content = JSON.parse(jsonStr) // 将JSON帖子信息转成对象
    var more = 0;
    this.getWindowData()
    this.setData({content})
    // 被评论者信息
    if (args.username === content.username) {
      more = 1
    }
    var Time = util.timeago(that.data.content.Time, 'Y年M月D日')
    that.data.username = args.username
    this.data.CardID = content._id
    wx.cloud.callFunction({
      name: 'CampusCircle',
      data: {
        username: that.data.username,
        Time: content.Time,
        _id: content._id,
        type: 'readComment'
      },
      complete: res => {
        this.data.CommentList = res.result.data[0].CommentList
        if (this.data.CommentList) {
          this.setData({
            content: content
          })
          this.ShowComment()
        } else {
          this.data.CommentList = []
          content.CommentList = []
          this.setData({
            CommentNum: 0,
            content: content
          })
        }
      }
    });

    // 判空
    if (content.Star_User == undefined || !content.Star_User) {
      content.Star_User = []
      that.setData({
        content: content,
      })
    }
    for (var i = 0; i < content.Star_User.length; i++) {
      if (content.Star_User[i].username === args.username) {
        that.setData({
          Starurl: "../../../../images/zan.png",
        })
      }
    }
    this.setData({
      iconUrl: args.iconUrl,
      Time: Time,
      more: more,
    })
  },
  //点赞
  get_Star() {
    const args = wx.getStorageSync('args')
    var Star_User = this.data.content.Star_User
    let be_character = { // 被点赞者信息
      userName: this.data.content.username, // 学号来查找
      iconUrl: this.data.content.iconUrl,
      nickName: this.data.content.nickName
    }
    if (!Star_User) {
      Star_User = []
    }
    var that = this
    var Starif = false
    //判断是不是为点赞过的username
    for (var i = 0; i < Star_User.length; i++) {
      if (Star_User[i].username === args.username) {
        Starif = true
        Star_User.splice(Star_User.indexOf(args.username), 1)
        that.setData({
          Starurl: "../../../../images/zan1.png",
        })
        that.callFunction('StarControlLogs',be_character,"null")
      }
    }
    if (!Starif) {
      // openusername.Star_time = new Date().getTime()
      let obj = {
        username: args.username
      }
      Star_User.push(obj)
      wx.showToast({
        title: '点赞成功',
        icon: "none"
      })
      that.setData({
        Starurl: "../../../../images/zan.png",
      })
      that.callFunction('StarControlLogs',be_character,"null")
    }
    // 更新全局
    app.globalData.allList.forEach(item => {
      item.forEach(e => {
        if (e._id === that.data.CardID) {
          e.Star_User = Star_User;
        }
      })
    })
    moreUtil.setAllList(app.globalData.allList,"点赞")
  },
  onShow: function () {
    this.ShowComment()
  },
})