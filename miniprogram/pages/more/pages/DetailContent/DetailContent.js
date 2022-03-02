var util = require("../../../../utils/util.js")
var app = getApp()
const args = wx.getStorageSync('args')
Page({
  data: {
    isChecked: true,
    ReplyChecked:true,  // 新增-回复
    InputComment: " ",
    CommentList: [],
    ContentTime:0,      // 新增-回复
    showEdit: false,    // 控制评论区弹窗显示
    reply_style:"",
    comEdit: false,     // 评论区复制/删除弹窗
    comReply:false,
    CardID:"",
    inIndex:-1,
    ShowDelCom: 0,      // 评论区控制是否出现“删除”按钮
    Commentindex: 0,    // 评论区的 index
    Commentindex222:0,
    ShowReplyComment:0,
    ReplyCom_input:"",
    obtain:0,
    iconUrl: '',
    Starurl: "../../../../images/zan1.png",
    Star_count: 0,
  },
  
  // More: function () {
  //   var showEdit = this.data.showEdit
  //   var that = this

  //   if (showEdit) {
  //     this.setData({
  //       edit_style: "edit_hide"
  //     })
  //     setTimeout(() => {
  //       that.setData({
  //         showEdit: !showEdit
  //       })
  //     }, 200);
  //   } else {
  //     this.setData({
  //       edit_style: "edit_show",
  //       showEdit: !showEdit
  //     })
  //   }
  // },
  hhh:function(e){
    let index = e.currentTarget.dataset.index;
    console.log("wai",e.currentTarget.dataset.bigindex)
    console.log("nei",e.currentTarget.dataset.small)

  },

  d:function(){
    let edit_style = this.data.edit_style;
      console.log("edit_style".edit_style)
      // picker动画样式
      if(edit_style == undefined || edit_style == 'edit_hide') {
        edit_style = 'edit_show'
      }else {
        edit_style = 'edit_hide'
      }
      console.log(edit_style);
      this.setData({ comEdit:!this.data.comEdit,edit_style:edit_style})
  },
  EditComment: function (e) {              // 12-27 重构本函数
    console.log("e.currentTarget.dataset.small",e.currentTarget.dataset.small)
    if(e.currentTarget.dataset.small===undefined){
      let index = e.currentTarget.dataset.index;
      this.data.Commentindex = index;
      let edit_style = this.data.edit_style;
      console.log("edit_style".edit_style)
      // picker动画样式
      if(edit_style == undefined || edit_style == 'edit_hide') {
        edit_style = 'edit_show'
      }else {
        edit_style = 'edit_hide'
      }
      console.log(edit_style);
      this.setData({ comEdit:!this.data.comEdit,edit_style:edit_style})
      
      // 在点其他位置时，index = undefined
      if(index != undefined) {
        let nickName = this.data.CommentList[index].nickName;  // 该评论的评论者
        let username = this.data.CommentList[index].username;  // 该评论的评论者学号
        let ShowDelCom = 0;
        // 判断是否本人的评论 -> 凭学号
        if(username == args.username) {
          ShowDelCom = 1;
        }
        this.setData({
          ShowDelCom,
          CommentName:nickName,
          CommentContent:this.data.CommentList[index].InputComment,
          isChecked: true,
        })
      }
      // this.data.ShowDelCom = 0;    //初始化
      index=0
  }else{
    let outIndex=e.currentTarget.dataset.bigindex
    let inIndex=e.currentTarget.dataset.small
    let edit_style = this.data.edit_style;
    this.data.Commentindex=outIndex
    this.data.inIndex=e.currentTarget.dataset.small
    console.log("edit_style".edit_style)
    // picker动画样式
    if(edit_style == undefined || edit_style == 'edit_hide') {
      edit_style = 'edit_show'
    }else {
      edit_style = 'edit_hide'
    }
    console.log(edit_style);
    this.setData({ comEdit:!this.data.comEdit,edit_style:edit_style})
    
    // 在点其他位置时，index = undefined
    if(inIndex != undefined) {
      let nickName = this.data.CommentList[outIndex].Reply[inIndex].nickName;  // 该评论的评论者
      let username = this.data.CommentList[outIndex].Reply[inIndex].username;  // 该评论的评论者学号
      let ShowDelCom = 0;
      // 判断是否本人的评论 -> 凭学号
      if(username == args.username) {
        ShowDelCom = 1;
      }
      this.setData({
        ShowDelCom,
        CommentName:nickName,
        CommentContent:this.data.CommentList[outIndex].Reply[inIndex].InputReply,
        isChecked: true,
      })
    }
    // this.data.ShowDelCom = 0;    //初始化
  }
  },
  ReplyComment:function(){
    
     this.d()

    this.setData({
      comReply: true,
      comEdit:false
    })
  },
  replySubmit:function(e){
    var that = this;
    // 判空
    let res = this.isNull(e.detail.value.InputReply);
    var index = this.data.Commentindex
    var inIndex=this.data.inIndex
    const content = this.data.content;
    console.log("inIndex",inIndex)
    console.log("this.data.CommentList[index].Reply[inIndex]",this.data.CommentList[index].Reply[inIndex])
    if( res ) {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none'
      })
    } else {
      if(inIndex===-1){
        console.log("inIndex=null")
        var add = {
          "InputReply": e.detail.value.InputReply,
          "ReplyTime": new Date().getTime(),
          "iconUser": args.iconUrl,  
          "nickName": args.nickName,
          "username": args.username,
          "Replied":this.data.CommentList[index].nickName,
        }
      }else{
        console.log("indel exit")
        var add = {
          "InputReply": e.detail.value.InputReply,
          "ReplyTime": new Date().getTime(),
          "iconUser": args.iconUrl,  
          "nickName": args.nickName,
          "username": args.username,
          "Replied":this.data.CommentList[index].Reply[inIndex].nickName,
        }
      }
      // this.data.CommentList[index].Reply.push(add)
      // console.log("this.data.CommentList",this.data.CommentList)
      wx.cloud.callFunction({
        name: 'NewCampusCircle',
        data: {
          url: 'CommentControl',
          addData: add,
          index:this.data.Commentindex,
          _id: that.data.content._id,
          username : that.data.username,
          type: 'replyComment'
        },
        success: res => {
          this.data.CommentList[index].Reply.push(add)
          wx.hideLoading()
          console.log("成功添加",res);
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
        userName:args.username,
        iconUrl:args.iconUrl,
        nickName:args.nickName
      }
      // 被评论者信息
      if(inIndex===-1){
      var be_character = {
        userName:this.data.CommentList[index].username,    
        iconUrl:this.data.CommentList[index].iconUrl,
        nickName:this.data.CommentList[index].nickName
      }
      var be_username=this.data.CommentList[index].username
      }else{
        var be_character = {
          userName:this.data.CommentList[index].Reply[inIndex].username,    
          iconUrl:this.data.CommentList[index].Reply[inIndex].iconUrl,
          nickName:this.data.CommentList[index].Reply[inIndex].nickName
        }
        var be_username=this.data.CommentList[index].Reply[inIndex].username
      }
      // 评论时间 
      let commentTime = new Date().getTime();
      // 如果想在后台看到具体的时间年月日，请用下面这句
      // let starTime = util.timeago(new Date().getTime(),'Y年M月D日');

      // 云函数增加一条评论记录
      wx.cloud.callFunction({
        name: "CampusCircle",
        data: {
          type: "ReplyCommentControlLogs",
          character: character,
          be_character:be_character,
          username : that.data.username,
          be_username: be_username,
          content: e.detail.value.InputReply,
          createTime:new Date().getTime(),
          arcticle:this.data.content,
          arcticle_id:this.data.content._id,
          _id: this.data.content._id
        },
        success(res) { console.log(res,"调用评论云函数成功"); },
        fail(e) { 
          wx.showToast({
            title: '回复评论失败',
            icon: 'none'
          }) 
          console.log(e,"回复评论失败");
        }
      })
    }
    this.data.inIndex=-1
  },
  //删除评论
  DelComment: function () {
    var index = this.data.Commentindex
    var inIndex=this.data.inIndex
    var that = this
    const content = this.data.content;
    let character = {
      userName: args.username,
      iconUrl: args.iconUrl,
      nickName: args.nickName
    }
    console.log("inIndex",inIndex)
    // if(inIndex===undefined || inIndex===-1){
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
        console.log(that.data.CardID)
        that.setData({
          ShowDelCom:0
        })
        if (res.confirm) {
          console.log('用户点击确定')
     
          console.log(that.data.CommentList)
          console.log("that.data.CommentList[index]",that.data.CommentList[index])
          // console.log("that.data.CommentList", that.data.CommentList)
          // console.log(that.data.content._id);
          wx.cloud.callFunction({
            name: 'NewCampusCircle',
            data: {
              url: 'CommentControl',
              type: 'delComment',
              username : that.data.username,
              _id: that.data.content._id,
              delData: that.data.CommentList[index]
            },
            success: res => {
              console.log("successDel")
              that.data.CommentList.splice(index, 1)
              // 12-27 新增,修改评论状态
              wx.cloud.callFunction({
                name:'CampusCircle',
                data: {
                  type: 'CancelCommentControlLogs',
                  character: character,
                  username : that.data.username,
                  be_character: be_character,
                  be_username: that.data.content.username,
                  content: InputComment,
                  createTime: changeStatusTime,
                  arcticle: content,
                  arcticle_id: content._id,
                  _id: that.data.content._id
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
          that.setData({
            ShowDelCom:1
          })
        }
      }
    })
  // }else{
  //   console.log("inter")
  //   let be_character = {
  //     iconUrl: this.data.CommentList[index].Reply[inIndex].iconUrl,
  //     nickName: this.data.CommentList[index].Reply[inIndex].nickName
  //   }
  //   let InputReply = this.data.CommentList[index].Reply[inIndex].InputReply; 

  //   let changeStatusTime = new Date().getTime();
  //   wx.showModal({
  //     title: '提示',
  //     content: '确定删除?',
  //     success(res) {
  //       console.log(that.data.CardID)
  //       that.setData({
  //         ShowDelCom:0
  //       })
  //       if (res.confirm) {
  //         console.log('用户点击确定')
  //         console.log("del")
  //         console.log(that.data.CommentList)
  //         // console.log("that.data.CommentList", that.data.CommentList)
  //         // console.log(that.data.content._id);
  //         console.log("that.data.CommentList[index].Reply[inIndex]",that.data.CommentList[index].Reply[inIndex])
  //         wx.cloud.callFunction({
  //           name: 'NewCampusCircle',
  //           data: {
  //             url: 'CommentControl',
  //             type: 'delReply',
  //             username : that.data.username,
  //             _id: that.data.content._id,
  //             index:index,
  //             delData: that.data.CommentList[index].Reply[inIndex]
  //           },
  //           success: res => {
  //             console.log("success")
  //             this.data.CommentList[index].Reply.splice(inIndex, 1)
  //             // 12-27 新增,修改评论状态
  //             wx.cloud.callFunction({
  //               name:'CampusCircle',
  //               data: {
  //                 type: 'CancelReplyControlLogs',
  //                 character: character,
  //                 username : that.data.username,
  //                 be_character: be_character,
  //                 be_username: that.data.content.username,
  //                 content: that.data.CommentList[index].Reply[inIndex].InputReply,
  //                 createTime: changeStatusTime,
  //                 arcticle: content,
  //                 arcticle_id: content._id,
  //                 _id: that.data.content._id
  //               }
  //             }),
              
  //             console.log("success")
  //             that.ShowComment()
  //             that.setData({
  //               comEdit: !that.data.comEdit
  //             })
  //           },
  //           fail: err => {
  //             console.error
  //             that.setData({
  //               comEdit: !that.data.comEdit
  //             })
  //           },
  //         })
  //         console.log();
          
  //       } else if (res.cancel) {
  //         console.log('用户点击取消')
  //         that.setData({
  //           ShowDelCom:1
  //         })
  //       }
  //     }
  //   })
  //   this.data.inIndex=-1
  // }
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
          console.log(that.data.CardID,that.data.username);
          wx.cloud.callFunction({
            name: 'CampusCircle',
            data: {
              _id: that.data.CardID,
              username : that.data.username,
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
              // beforePage_.onPullDownRefresh()
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
    console.log(res)
    if( res ) {
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
        "Reply":[],
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
          username : that.data.username,
          Time: that.data.content.Time,
          _id: that.data.content._id,
          type: 'writeComment'
        },
        success: res => {
          this.data.CommentList.push(add)
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
      this.setData({
        Input: ""
      })
      // 12-27新增：将评论以记录形式上传
      // 处理得到评论者信息
      let character = {
        userName:args.username,
        iconUrl:args.iconUrl,
        nickName:args.nickName
      }
      // 被评论者信息
      let be_character = {
        userName:this.data.content.username,    
        iconUrl:this.data.content.iconUrl,
        nickName:this.data.content.nickName
      }
      // 评论时间 
      let commentTime = new Date().getTime();
      // 如果想在后台看到具体的时间年月日，请用下面这句
      // let starTime = util.timeago(new Date().getTime(),'Y年M月D日');

      // 云函数增加一条评论记录
      console.log("e.detail.value.InputComment",e.detail.value.InputComment)
      wx.cloud.callFunction({
        name: "CampusCircle",
        data: {
          type: "CommentControlLogs",
          character: character,
          be_character:be_character,
          username : that.data.username,
          be_username: that.data.content.username,
          content: e.detail.value.InputComment,
          createTime:commentTime,
          arcticle:this.data.content,
          arcticle_id:this.data.content._id,
          _id: this.data.content._id
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
    let length = this.data.CommentList.length
    var copyList = JSON.parse(JSON.stringify(this.data.CommentList))
    console.log(this.data.CommentList)
    for (let i = 0; i < this.data.CommentList.length; i++) {
      if (copyList[i].Reply) {
        var replylen = copyList[i].Reply.length
      }
      var PreTime = this.data.CommentList[i].CommentTime
      console.log("PreTime", PreTime)
      var AftTime = util.timeago(PreTime, 'Y年M月D日')
      for (let j = 0; j < replylen; j++) {
        console.log("copyList[i].Reply[j].ReplyTime",copyList[i].Reply[j].ReplyTime)
        var PreTime2 = copyList[i].Reply[j].ReplyTime
        var AftTime2 = util.timeago(PreTime2, 'Y年M月D日')
        copyList[i].Reply[j].ReplyTime = AftTime2
      }
      // console.log(content);
      Show.push({
        InputContent: this.data.CommentList[i].InputComment,
        InputTime: AftTime,
        iconUser: this.data.CommentList[i].iconUser,
        nickName: this.data.CommentList[i].nickName,
        username:this.data.CommentList[i].username,
        Reply: copyList[i].Reply
      })
    }
    

    app.globalData.allList.forEach(e => {
      if(e){
        if (e._id === this.data.CardID) {
          e.CommentList = this.data.CommentList
        }
      }
    })
    this.setData({
      ShowList: Show,
      CommentNum: length,
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
    var that = this;
    var content = JSON.parse(options.content)  // 将JSON帖子信息转成对象
    var more=0
    that.setData({ content })
    console.log(content,"options");
    // 被评论者信息
    if(args.username===content.username){
      more=1
    }
    var Time = util.timeago(that.data.content.Time, 'Y年M月D日')
    that.data.username = args.username
    var openusername = {
      username:args.username,
      iconUrl:args.iconUrl,
      nickName:args.nickName
    }
    this.data.Star = content.Star
    this.data.ContentTime = content.Time
    this.data.CardID = content._id
    wx.cloud.callFunction({
      name: 'CampusCircle',
      data: {
        username : that.data.username,
        Time: content.Time,
        _id: content._id,
        type: 'readComment'
      },
      complete: res => {
        // this.data.Star = res
        this.data.CommentList = res.result.data[0].CommentList
        this.data.Star_User = res.result.data[0].Star_User
        this.data.Star_count = res.result.data[0].Star_count
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

    // 判空
    if (content.Star_User == undefined || !content.Star_User) {
      content.Star_User = []
      that.setData({
        content: content,
        openusername:openusername
      })
    }
    this.setData({
      iconUrl: args.iconUrl,
      openusername:openusername
    })
    for(var i = 0;i<content.Star_User.length;i++){
      // console.log("content.Star_User[i].username",content.Star_User[i].username)
      if(content.Star_User[i].username===openusername.username){
        that.setData({
          Starurl: "../../../../images/zan.png",
        })
      }
    }
    this.setData({
      Time: Time,
      more: more,
    })
    console.log(content)
  },
  //点赞
  get_Star() {
    
    var Star_User = this.data.content.Star_User
    var openusername = this.data.openusername

    let character = {                            // 处理得到点赞者信息
      userName:args.username,
      iconUrl:args.iconUrl,
      nickName:args.nickName
    }
    let be_character = {                         // 被点赞者信息
      userName:this.data.content.username,       // 学号来查找
      iconUrl:this.data.content.iconUrl,
      nickName:this.data.content.nickName
    }
    let starTime = new Date().getTime();          // 点赞时间
    // 如果想在后台看到具体的时间年月日，请用下面这句
    // let starTime = util.timeago(new Date().getTime(),'Y年M月D日');
    if (!Star_User) {
      Star_User = []
    }
    var that = this
    var Starif = false
    //判断是不是为点赞过的username
    for (var i = 0 ;i<Star_User.length;i++){
      if(Star_User[i].username===openusername.username){
        Starif = true
        Star_User.splice(Star_User.indexOf(openusername), 1)
        that.setData({
        Starurl: "../../../../images/zan1.png",
      })
      wx.cloud.callFunction({   // 云函数更改点赞状态
        name: "CampusCircle",
        data: {
          type: "StarControlLogs",
          username : that.data.username,
          be_username: that.data.content.username,
          Time: that.data.content.Time,
          _id: that.data.content._id,
          Star: Star_count,
          Star_User: Star_User,
          // 上面三条为迎合旧点赞函数
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
    }
    if (!Starif) {
      //push到username
      openusername.Star_time = new Date().getTime()
      Star_User.push(openusername)
        wx.showToast({
          title: '点赞成功',
          icon: "none"
        })
        that.setData({
          Starurl: "../../../../images/zan.png",
        })
        var Star_count = Star_User.length
        wx.cloud.callFunction({
          name: "CampusCircle",
          data: {
            username : that.data.username,
            be_username: that.data.content.username,
            type: "StarControlLogs",
            Time: that.data.content.Time,
            Star: Star_count,
            Star_User: Star_User,
            // 为迎合新云函数
            character: character,
            be_character:be_character,
            createTime:starTime,
            arcticle:this.data.content,
            arcticle_id:this.data.content._id,
            _id:this.data.content._id
          },
          success(res) {
            console.log(res)
          }
        })
    }
    // 更新全局
    app.globalData.allList.forEach(item => {
      item.forEach(e => {
        if (e._id === this.data.CardID) {
          e.Star_User = Star_User;
        }
      })
    })
    let pages = getCurrentPages();            //获取小程序页面栈
    let beforePage = pages[pages.length - 2]; //上个页面的实例对象
    let e = {
      detail: app.globalData.allList
    }
    beforePage.setAllList(e);
  },
  onShow: function () {
    this.ShowComment()
  },

})