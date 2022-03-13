// components/inform.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    edit_style: {
      type: String,
      value: "edit_show"
    },
    comReply:{
      type: String,
      value: " "
    }
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    isChecked: true,
    CommentList: [],
    showComtBox: false,
    showEdit: false, // 控制评论区弹窗显示
    comEdit: false, // 评论区复制/删除弹窗
    CardID: "",
    inIndex: -1,
    ShowDelCom: 0, // 评论区控制是否出现“删除”按钮
    Commentindex: 0, // 评论区的 index
    Starurl: "../../../../images/zan1.png",
    // edit_style: 'edit_hide',
  },
  
  
  lifetimes: {
    
  },
  attached: function () {
    // 在组件实例进入页面节点树时执行
    this.getWindowData()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 激活焦点
    showComtBox () {
      this.setData({ showComtBox: true })
    },
   
    // 失去焦点
    comtBlur () {
      this.setData({ showComtBox: false })
    },
    popUp: function () {
      let edit_style = this.data.edit_style;
      // picker动画样式
      if (edit_style == undefined || edit_style == 'edit_hide') {
        edit_style = 'edit_show'
      } else {
        edit_style = 'edit_hide'
      }
      console.log("2333")
      this.setData({ edit_style })
    },
    async getWindowData () {
      let h = await app.getSystemData('windowHeight')
      this.setData({ windowHeight: h })
    },

    ReplyComment: function () {
      this.popUp()
      console.log("inter")
      this.setData({
        comEdit: false,
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

    async ctFocus (e) {
      let { windowHeight } = this.data
      let keyboard_h = e.detail.height
      let ctInput_top = windowHeight - keyboard_h
      let ctInput_h = await app.queryNodes('#ctInput', 'height')
      ctInput_top -= ctInput_h
      this.setData({ ctInput_top })
    },
  }
})