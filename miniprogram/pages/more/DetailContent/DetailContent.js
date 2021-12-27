var util = require("../../../utils/util.js")
var app = getApp()
Page({
  data: {
    isChecked: true,
    InputComment: " ",
    CommentList: [],
    // ContentTime: 0,
    showEdit: false,
    comEdit: false,
    CardID: "",
    Commentindex: 0,
    ShowDelCom: 0,
    Starurl: "../../../images/zan1.png",
    Starif: app.globalData.Starif,
    Star_count: 0,

  },
  More: function () {
    var showEdit = this.data.showEdit
    var that = this
    console.log("33333")
    if (showEdit) {
      this.setData({
        edit_style: "edit_hide"
      })
      setTimeout(() => {
        that.setData({
          showEdit: !showEdit
        })
      }, 200);
    } else {
      this.setData({
        edit_style: "edit_show",
        showEdit: !showEdit
      })
    }
  },
  EditComment: function (e) {
    var comEdit = this.data.comEdit
    var that = this
    var index = e.currentTarget.dataset.index
    that.data.Commentindex = index
    console.log("index", index)
    if (index || index == 0) {
      console.log("that.data.CommentList[index].userName", that.data.CommentList[index].userName)
      console.log("that.data.userName", that.data.userName)
      if ((that.data.CommentList[index].userName == that.data.userName && that.data.CommentList[index].iconUser == that.data.args.iconUrl) || (that.data.content.nickName == that.data.userName && that.data.content.iconUrl == that.data.args.iconUrl)) {
        that.data.ShowDelCom = 1
      }
    }
    if (comEdit) {
      that.setData({
        edit_style: "edit_hide"
      })
      setTimeout(() => {
        that.setData({
          comEdit: !comEdit
        })
      }, 200);
    } else {
      that.setData({
        edit_style: "edit_show",
        comEdit: !comEdit,
        ShowDelCom: that.data.ShowDelCom,
        CommentName: that.data.ShowList[index].userName,
        CommentContent: that.data.ShowList[index].InputContent
      })
    }
    that.data.ShowDelCom = 0
  },
  //删除
  DelCard: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定删除?',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.cloud.callFunction({
            name: 'CampusCircle',
            data: {
              id: that.data.CardID,
              type: 'delCard'
            },
            success: res => {
              console.log("success")
              that.setData({
                showEdit: !that.data.showEdit
              })
              let pages = getCurrentPages(); //获取小程序页面栈
              let beforePage = pages[pages.length - 2]; //获取上个页面的实例对象
              console.log("beforePage", beforePage)
              let beforePage_ = pages[pages.length - 3]; //获取上个页面的实例对象
              console.log("beforePage", beforePage_)
              beforePage.onLoad();
              beforePage_.onPullDownRefresh()
              wx.navigateBack({
                delta: 1,
              })
            },
            fail: err => {
              console.error
              that.setData({
                showEdit: !that.data.showEdit
              })
            },
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //删除评论
  DelComment: function () {
    var index = this.data.Commentindex
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定删除?',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.data.CommentList.splice(index, 1)
          console.log("that.data.CommentList", that.data.CommentList)
          wx.cloud.callFunction({
            name: 'CampusCircle',
            data: {
              id: that.data.CardID,
              CommentList: that.data.CommentList,
              type: 'delComment',
            },
            success: res => {
              console.log("success")
              that.ShowComment()
              that.setData({
                comEdit: !that.data.comEdit
              })
            },
            fail: err => {
              console.error
              that.setData({
                comEdit: !that.data.comEdit
              })
            },
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
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
    this.setData({
      comEdit: !this.data.comEdit
    })
  },
  Comment_Inputting: function () {
    this.setData({
      isChecked: false,
    })
  },
  formSubmit: function (e) { //添加与存储
    let {
      InputComment
    } = e.detail.value
    var that = this
    if (!InputComment) {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none'
      })
    } else {
      var add = {
        "InputComment": InputComment,
        "CommentTime": new Date().getTime(),
        "iconUser": that.data.args.iconUrl,   
        "userName": that.data.args.nickName   
      }
      that.data.CommentList.push(add)
      wx.cloud.callFunction({
        name: 'CampusCircle',
        data: {
          CommentList: that.data.CommentList,
          Time: that.data.content.Time,
          type: 'writeComment'
        },
        success: res => {
          that.ShowComment()
        },
        fail: err => {
          console.error
        }
      })
      that.setData({
        Input: " "
      })
    }
  },

  ShowComment: function () {
    var Show = []
    var length = this.data.CommentList.length
    console.log("length", length)
    for (let i = 0; i < length; i++) {
      var PreTime = this.data.CommentList[i].CommentTime
      console.log("PreTime", PreTime)
      var AftTime = util.timeago(PreTime, 'Y年M月D日')
      Show.push({
        InputContent: this.data.CommentList[i].InputComment,
        InputTime: AftTime,
        iconUser: this.data.CommentList[i].iconUser,
        userName: this.data.CommentList[i].userName
      })
    }
    console.log("Show", Show)
    app.globalData.Comment = this.data.CommentList
    
    console.log("app.globalData.Comment", app.globalData.Comment)
    this.setData({
      ShowList: Show,
      CommentNum: length
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

  onLoad: function (options) {
    var content = JSON.parse(options.content)  // 将JSON帖子信息转成对象
    var more = options.del
    var jj = content.Time
    var that = this
    var Time = util.timeago(jj, 'Y年M月D日')
    // this.data.Star = content.Star
    // this.data.ContentTime = content.Time
    // console.log(this.data.CardID,233)
    wx.cloud.callFunction({
      name: 'CampusCircle',
      data: {
        Time: content.Time,
        _id: content._id,
        type: 'readComment'
      },
      complete: res => {
        this.data.CommentList = res.result.data[0].CommentList
        console.log("res.result.data[0].CommentList", this.data.CommentList)
        if (this.data.CommentList) {
          this.ShowComment()
          this.setData({
            content: content
          })
        } else {
          this.data.CommentList = []
          this.setData({
            CommentNum: 0,
            content: content
          })
          console.log("我得到content了",this.data.content);
        }
      }
    });

    this.setData({ args:wx.getStorageSync('args')})
    console.log("我得到args并赋值了",this.data.args);
    // var data = wx.getStorageSync('args')
    // var userName = this.data.args.nickName
    // var userName = data.nickName
    // var iconUrl = this.data.args.iconUrl
    // var openusername = this.data.args.username

    // 点赞判断 ×   留言：点赞函数里已经进行判空了！！！！！
    // if (content.Star_User == undefined || !content.Star_User) {
    //   content.Star_User = []
    //   that.setData({
    //     content: content
    //   })
    // }
    if (content.Star_User.includes(this.data.args.username)) {  // username学号
      that.setData({
        Starurl: "../../../images/zan.png",
      })
    }
    // app.globalData.Starif = Starif

    // !!!!!!!!!!!!!!!!!我没懂这两个在哪里用到，写这个代码的人仔细看看 xyq留言
    app.globalData.Star_count = content.Star_User.length
    app.globalData.Star_User = content.Star_User
    // !!!!!!!!!!!!!!!!!我没懂这两个在哪里用到，写这个代码的人仔细看看

    this.setData({
      // userName: userName,
      // Star_User: content.Star_User,
      // iconUrl: iconUrl,
      // openusername,
      // ImgSrc: content.Cover,
      // Title: content.Title,
      // Text: content.Text,
      // Label: content.Label,
      // Photo: content.AllPhoto,
      Time: Time,
      // Height: content.ShowHeight,
      // SenticonUrl: content.iconUrl,
      // SentName: content.nickName,
      more: more,
      // Starurl: app.globalData.Starurl 
      // Starcount:content.Star
    })
    // console.log(content)
    // console.log(this.data.openid)
  },
  //点赞
  get_Star() {
    var Star_User = this.data.content.Star_User  // content是帖子全部信息，Star_User是点赞用户id

    // 判空
    if (!Star_User || Star_User == undefined) {
      Star_User = []
    }
    var that = this
    var Starif = false
    // 判断是不是为点赞过的学号
    if (Star_User.includes(that.data.args.username)) {  // openusername是args里的username=学号
      Starif = true
      that.setData({
        // Starif: true,
        Starurl: "../../../images/zan1.png",
      })

      // 取消点赞
      Star_User.splice(Star_User.indexOf(that.data.args.username), 1)
      console.log(Star_User, "Star_User")
    }
    if (!Starif) {
      // 不可以给自己点赞   缺陷：未来每个人的名称必须唯一不重复
      if(this.data.content.nickName == this.data.args.nickName) {
        wx.showToast({
          title: '不可以给自己点赞哦！',
          icon:'none'
        })
      }else {
        //push到openid
        Star_User.push(this.data.args.username)
        wx.showToast({
          title: '点赞成功',
          icon: "none"
        })
        that.setData({
          Starurl: "../../../images/zan.png",
        })
        console.log(Star_User)
      }
    }
    var Star_count = Star_User.length
    console.log("Star_count", Star_count)
    console.log(that.data.Star_count)
    wx.cloud.callFunction({
      name: "CampusCircle",
      data: {
        type: "starCount",
        Time: that.data.content.Time,
        Star: Star_count,
        Star_User: Star_User
      },
      success(res) {
        console.log(res)
      }
    })
    app.globalData.Starurl = this.data.Starurl
    app.globalData.Starif = Starif
    app.globalData.Star_count = Star_count
    app.globalData.Star_User = Star_User
    console.log(Starif)
  },
  onShow: function () {
    this.ShowComment()
  },

})