var util = require("../../../utils/util.js")
var app = getApp()
Page({
  data: {
    isChecked: true,
    InputComment: " ",
    CommentList: [],
    ContentTime: 0,
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
      if ((that.data.CommentList[index].userName == that.data.userName && that.data.CommentList[index].iconUser == that.data.iconUrl) || (that.data.SentName == that.data.userName && that.data.SenticonUrl == that.data.iconUrl)) {
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
        "iconUser": that.data.iconUrl,
        "userName": that.data.userName
      }
      that.data.CommentList.push(add)
      wx.cloud.callFunction({
        name: 'CampusCircle',
        data: {
          CommentList: that.data.CommentList,
          Time: that.data.ContentTime,
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
  // ShowStar:function(){

  // },
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
  /**
   * 页面的初始数据
   */
  ShowImg: function (e) {
    var Photo = this.data.Photo
    var index = e.target.dataset.index
    wx.previewImage({
      current: Photo[index],
      urls: Photo,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var content = JSON.parse(options.content)
    var more = options.del
    var jj = content.Time
    var that = this
    var Time = util.timeago(jj, 'Y年M月D日')
    this.data.CardID = content._id
    this.data.Star = content.Star
    this.data.ContentTime = content.Time
    // console.log(this.data.CardID,233)
    wx.cloud.callFunction({
      name: 'CampusCircle',
      data: {
        Time: content.Time,
        _id: that.data.CardID,
        type: 'readComment'
      },
      complete: res => {
        this.data.CommentList = res.result.data[0].CommentList
        console.log("res.result.data[0].CommentList", this.data.CommentList)
        if (this.data.CommentList) {
          this.ShowComment()
        } else {
          this.data.CommentList = []
          this.setData({
            CommentNum: 0,
            content: content
          })
        }
      }
    });
    var data = wx.getStorageSync('args')
    var userName = data.nickName
    var iconUrl = data.iconUrl
    var openusername = data.username
    // console.log(content, 233)
    if (!content.Star_User) {
      content.Star_User = []
    }
    if (content.Star_User.includes(openusername)) {
      that.setData({
        Starurl: "../../../images/zan.png",
      })
    }
    this.setData({
      userName: userName,
      Star_User: content.Star_User,
      iconUrl: iconUrl,
      openusername,
      ImgSrc: content.Cover,
      Title: content.Title,
      Text: content.Text,
      Label: content.Label,
      Photo: content.AllPhoto,
      Time: Time,
      Height: content.ShowHeight,
      SenticonUrl: content.iconUrl,
      SentName: content.nickName,
      more: more,
      // Starurl: app.globalData.Starurl 
      // Starcount:content.Star
    })
    console.log(content)
    // console.log(this.data.openid)
  },
  //点赞
  get_Star() {
    // console.log(this.data.content.Star_User,233)
    var Star_User = this.data.content.Star_User
    if (!Star_User) {
      Star_User = []
    }
    var that = this
    var Starif = false
    //判断是不是为点赞过的openid
    console.log(Star_User, 244)
    if (Star_User.includes(that.data.openusername)) {
      Starif = true
      that.setData({
        // Starif: true,
        Starurl: "../../../images/zan1.png",
      })

      // console.log(Star_User.indexOf(that.data.openusername), 244)
      Star_User.splice(Star_User.indexOf(that.data.openusername), 1)
      console.log(Star_User, "Star_User")
    }
    if (!Starif) {
      //push到openid
      Star_User.push(that.data.openusername)
      wx.showToast({
        title: '点赞成功',
        icon: "none"
      })
      that.setData({
        Starurl: "../../../images/zan.png",
      })
      console.log(Star_User)
    }
    var Star_count = Star_User.length
    console.log("Star_count", Star_count)
    console.log(that.data.Star_count)
    wx.cloud.callFunction({
      name: "CampusCircle",
      data: {
        type: "starCount",
        Time: that.data.ContentTime,
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
    that.setData({
      openusername: that.data.openusername,
      // Starif:Starif
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