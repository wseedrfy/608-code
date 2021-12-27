var util = require("../../../utils/util.js")
var app = getApp()
Page({
  data: {
    isChecked: true,
    InputComment: " ",
    CommentList: [],

    showEdit: false,    // 控制评论区弹窗显示
    comEdit: false,     // 评论区复制/删除弹窗
    ShowDelCom: 0,      // 评论区控制是否出现“删除”按钮
    Commentindex: 0,    // 评论区的 index
    
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
  EditComment: function (e) {              // 12-27 重构本函数
    let index = e.currentTarget.dataset.index;
    this.data.Commentindex = index;
    let edit_style = this.data.edit_style;
    
    if(edit_style == undefined || edit_style == 'edit_show') {
      edit_style = 'edit_show'
    }else {
      edit_style = 'edit_hide'
    }
    this.setData({ comEdit:!this.data.comEdit,edit_style:edit_style})
    
    
    // 在点其他位置时，index = undefined
    if(index != undefined) {
      let userName = this.data.CommentList[index].userName;  // 该评论的评论者userName
      let iconUrl = this.data.CommentList[index].iconUser;   // 该评论的评论者iconUrl

      // 判断是否本人的评论
      if(userName == this.data.args.nickName && iconUrl == this.data.args.iconUrl) {
        this.setData({ ShowDelCom : 1})
      }
      this.setData({
        CommentName:userName,
        CommentContent:this.data.CommentList[index].InputComment
      })
    }
    this.data.ShowDelCom = 0     // 初始化0
  },
  //删除评论
  DelComment: function () {
    var index = this.data.Commentindex
    var that = this
    const args = this.data.args;
    const content = this.data.content;
    let character = {
      userName: args.username,
      iconUrl: args.iconUrl,
      nickName: args.nickName
    }
    let be_character = {
      iconUrl: content.iconUrl,
      nickName: content.nickName
    }
    let InputComment = this.data.CommentList[index].InputComment; 

    let changeStatusTime = new Date().getTime();
    wx.showModal({
      title: '提示',
      content: '确定删除?',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.data.CommentList.splice(index, 1)
          // console.log("that.data.CommentList", that.data.CommentList)
          // console.log(that.data.content._id);
          wx.cloud.callFunction({
            name: 'CampusCircle',
            data: {
              type: 'delComment',
              id: that.data.content._id,
              CommentList: that.data.CommentList
            },
            success: res => {
              // 12-27 新增,修改评论状态
              wx.cloud.callFunction({
                name:'CampusCircle',
                data: {
                  type: 'CancelCommentControlLogs',
                  character: character,
                  be_character: be_character,
                  content: InputComment,
                  createTime: changeStatusTime,
                  arcticle: content,
                  arcticle_id: content._id
                }
              }),
              
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
          console.log();
          
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

  Comment_Inputting: function () {
    this.setData({
      isChecked: false,
    })
  },
  // 评论内容判空 返回布尔值：false -> 非空; true -> 空/全是空格
  isNull( str ){
    if ( str == "" ) return true ;
    var regu = "^[ ]+$" ;
    var re = new RegExp(regu);
    return re.test(str);
  },
  formSubmit: function (e) { //添加与存储
    var that = this;
    // 判空
    let res = this.isNull(e.detail.value.InputComment);
    if( res ) {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none'
      })
    } else {
      let add = {
        "InputComment": e.detail.value.InputComment,
        "CommentTime": new Date().getTime(),
        "iconUser": that.data.args.iconUrl,   
        "userName": that.data.args.nickName   
      }
      this.data.CommentList.push(add)
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
      this.setData({
        Input: ""
      })
      // 12-27新增：将评论以记录形式上传
      // 处理得到评论者信息
      let character = {
        userName:this.data.args.username,
        iconUrl:this.data.args.iconUrl,
        nickName:this.data.args.nickName
      }
      // 被评论者信息
      let be_character = {
        // userName:this.data.content.username,    bug : content里面没有
        iconUrl:this.data.content.iconUrl,
        nickName:this.data.content.nickName
      }
      // 评论时间 
      let commentTime = new Date().getTime();
      // 如果想在后台看到具体的时间年月日，请用下面这句
      // let starTime = util.timeago(new Date().getTime(),'Y年M月D日');

      // 云函数增加一条评论记录
      wx.cloud.callFunction({
        name: "CampusCircle",
        data: {
          type: "CommentControlLogs",
          character: character,
          be_character:be_character,
          content: e.detail.value.InputComment,
          createTime:commentTime,
          arcticle:this.data.content,
          arcticle_id:this.data.content._id
        },
        success(res) { console.log(res,"调用评论云函数成功"); },
        fail(e) { 
          wx.showToast({
            title: '评论失败',
            icon: 'none'
          }) 
          console.log(e,"评论失败");
        }
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
    // var content = this.data.content;
    // console.log(content);
    // content.CommentList = Show;
    console.log("app.globalData.Comment", app.globalData.Comment)
    this.setData({
      ShowList: Show,
      CommentNum: length,
      // content
    })
    console.log(Show,"ShowComment函数中的show");
    console.log(this.data.content);
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
    var that = this
    var Time = util.timeago(content.Time, 'Y年M月D日')

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
          console.log("我得到content了",this.data.content);
        }
      }
    });

    this.setData({ args:wx.getStorageSync('args')})
    console.log("我得到args并赋值了",this.data.args);

    // 判空
    if (content.Star_User == undefined || !content.Star_User) {
      content.Star_User = []
      that.setData({
        content: content
      })
    }
    if (content.Star_User.includes(this.data.args.username)) {  // username学号
      that.setData({
        Starurl: "../../../images/zan.png",
      })
    }
    // !!!!!!!!!!!!!!!!!我没懂这两个在哪里用到，写这个代码的人仔细看看 xyq留言
    app.globalData.Star_count = content.Star_User.length
    app.globalData.Star_User = content.Star_User
    // !!!!!!!!!!!!!!!!!我没懂这两个在哪里用到，写这个代码的人仔细看看
    this.setData({
      Time: Time,
      more: more,
    })
  },
  //点赞
  get_Star() {
    var Star_User = this.data.content.Star_User          // content是帖子全部信息，Star_User是点赞用户id

    var that = this;
    var Starif = false;

    // 下面进行点赞/取消点赞操作
    let character = {                            // 处理得到点赞者信息
      userName:this.data.args.username,
      iconUrl:this.data.args.iconUrl,
      nickName:this.data.args.nickName
    }
    let be_character = {                         // 被点赞者信息
      // userName:this.data.content.username,    bug : content里面没有
      iconUrl:this.data.content.iconUrl,
      nickName:this.data.content.nickName
    }
    let starTime = new Date().getTime();         // 点赞时间
    // 如果想在后台看到具体的时间年月日，请用下面这句
    // let starTime = util.timeago(new Date().getTime(),'Y年M月D日');

    // 判断是不是为点赞过的学号
    if (Star_User.includes(that.data.args.username)) {   // openusername是args里的username=学号
      Starif = true
      that.setData({
        Starurl: "../../../images/zan1.png",
      })
      // 取消点赞
      Star_User.splice(Star_User.indexOf(that.data.args.username), 1)
      console.log(Star_User, "Star_User")
      wx.cloud.callFunction({   // 云函数更改点赞状态
        name: "CampusCircle",
        data: {
          type: "CancelStarControlLogs",
          character: character,
          be_character:be_character,
          createTime:starTime,
          arcticle:this.data.content,
          arcticle_id:this.data.content._id
        },
        success(res) { console.log(res,"调用'取消点赞'云函数成功"); },
        fail(e) { 
          wx.showToast({
            title: '点赞失败',
            icon: 'none'
          }) 
          console.log(e,"点赞失败");
        }
      })
    }
    
    if (!Starif) {                               // !Starif 表示未点赞
      // 不可以给自己点赞   缺陷：未来每个人的名称必须唯一不重复
      if(this.data.content.nickName == this.data.args.nickName) {
        wx.showToast({
          title: '不可以给自己点赞哦！',
          icon:'none'
        })
      }else {                                  // 点赞
        Star_User.push(this.data.args.username)
        wx.showToast({
          title: '点赞成功',
          icon: "none"
        })
        that.setData({
          Starurl: "../../../images/zan.png",
        })
        console.log(character,be_character,"云函数处理咯");
        // 云函数增加一条点赞记录
        wx.cloud.callFunction({
          name: "CampusCircle",
          data: {
            type: "StarControlLogs",
            character: character,
            be_character:be_character,
            createTime:starTime,
            arcticle:this.data.content,
            arcticle_id:this.data.content._id
          },
          success(res) { console.log(res,"调用点赞云函数成功"); },
          fail(e) { 
            wx.showToast({
              title: '点赞失败',
              icon: 'none'
            }) 
            console.log(e,"点赞失败");
          }
        })
        console.log(Star_User)
      }
    }
    // !!!!!!!!!!!!!!!!!!!!!!!!
    // !  太多云函数请求了     !
    // ！ 是不是可以一个云函数  !
    // !  得到全部需要的数据    !
    // !!!!!!!!!!!!!!!!!!!!!!!!!

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