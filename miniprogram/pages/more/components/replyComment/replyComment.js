// components/inform.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    edit_style: {
      type: String,
      value: "edit_hide"
    },
    comReply: {
      type: String,
      value: "False"
    },
    outIndex:{
      type: Number,
      value: 0
    },
    inIndex:{
      type: Number,
      value: -1
    },
    CommentList:{
      type: Array,
      value: []
    },
    content:{
      type: Object,
      value: {}
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    isChecked: true,
    // CommentList: this.properties.CommentList,
    showComtBox: false,
    showEdit: false, // 控制评论区弹窗显示
    // showModal: false
    // CardID: "",
    // inIndex: -1,
    // ShowDelCom: 0, // 评论区控制是否出现“删除”按钮
    // Commentindex: 0, // 评论区的 index
    // Starurl: "../../../../images/zan1.png",
    // edit_style: 'edit_hide',
  },


  lifetimes: {

  },
  attached: function () {
    // 在组件实例进入页面节点树时执行
    this.popUp()
    console.log("comReply", this.properties.comReply)
  },
  /**
   * 组件的方法列表
   */
  methods: {

    popUp: function () {
      var edit_style = this.properties.edit_style;
      // picker动画样式
      if (edit_style == undefined || edit_style == 'edit_hide') {
        edit_style = 'edit_show'
      } else {
        edit_style = 'edit_hide'
      }
      this.setData({
        edit_style
      })
    },
    
    // ShowComment: function () {
    //   var Show = []
    //   var copyList = JSON.parse(JSON.stringify(this.properties.CommentList))
    //   for (let i = 0; i < this.properties.CommentList.length; i++) {
    //     if (this.properties.CommentList[i] != null) {
    //       var AftTime = util.timeago(this.properties.CommentList[i].CommentTime, 'Y年M月D日')
    //       if (copyList[i].Reply != null) {
    //         for (let j = 0; j < copyList[i].Reply.length; j++) {
    //           copyList[i].Reply[j].ReplyTime = util.timeago(copyList[i].Reply[j].ReplyTime, 'Y年M月D日')
    //         }
    //       }
    //       Show.push({
    //         InputContent: this.properties.CommentList[i].InputComment,
    //         InputTime: AftTime,
    //         iconUser: this.properties.CommentList[i].iconUser,
    //         nickName: this.properties.CommentList[i].nickName,
    //         username: this.data.CommentList[i].username,
    //         Reply: copyList[i].Reply
    //       })
    //     }
    //   }
  
    //   app.globalData.allList.forEach(e => {
    //     if (e) {
    //       if (e._id === this.data.CardID) {
    //         e.CommentList = this.data.CommentList
    //       }
    //     }
    //   })
    //   this.setData({
    //     ShowList: Show,
    //     CommentNum: this.data.CommentList.length,
    //   })
    // },

    ReplyComment: function () {
      setTimeout(() => {
        this.setData({
          comReply: !this.properties.comReply,
        })
      }, 200);
      this.triggerEvent(
        "sendEvent", {
          comReply: this.properties.comReply
        }
      )
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
          username: args.username,
          be_username: that.properties.content.username,
          content: Input,
          createTime: new Date().getTime(),
          arcticle: that.properties.content,
          arcticle_id: that.properties.content._id,
          _id: that.properties.content._id,
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
          // if(type === StarControlLogs){
          //   wx.showToast({
          //     title: '点赞失败',
          //     icon: 'none'
          //   })
          // }
        }
      })
    },

    isNull(str) {
      if (str == "") return true;
      var regu = "^[ ]+$";
      var re = new RegExp(regu);
      return re.test(str);
    },

    replySubmit: function (e) {
      var that = this;
      let res = that.isNull(e.detail.value);
      var outIndex = that.properties.outIndex
      var inIndex = that.properties.inIndex
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
          add.Replied = that.properties.CommentList[outIndex].nickName
          var be_character = {
            userName: that.properties.CommentList[outIndex].username,
            iconUrl: that.properties.CommentList[outIndex].iconUrl,
            nickName: that.properties.CommentList[outIndex].nickName
          }
        } else {
          add.Replied = that.properties.CommentList[outIndex].Reply[inIndex].nickName
          var be_character = {
            userName: that.properties.CommentList[outIndex].Reply[inIndex].username,
            iconUrl: that.properties.CommentList[outIndex].Reply[inIndex].iconUrl,
            nickName: that.properties.CommentList[outIndex].Reply[inIndex].nickName
          }
        }
        wx.cloud.callFunction({
          name: 'NewCampusCircle',
          data: {
            url: 'CommentControl',
            addData: add,
            index: outIndex,
            _id: that.properties.content._id,
            username: args.username,
            type: 'replyComment'
          },
          success: res => {
            that.properties.CommentList[outIndex].Reply.push(add)
            wx.hideLoading()
            this.triggerEvent(
              "sendCom", {
                CommentList: that.properties.CommentList
              }
            )
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
        that.callFunction('ReplyCommentControlLogs', be_character, e.detail.value)
        that.ReplyComment()
      }
      that.properties.inIndex = -1
    },

    async ctFocus(e) {
      // 获取键盘高度
      let keyboard_h = e.detail.height;
      this.setData({
        keyboard_h
      })
    },
  }
})