var app = getApp()
class cardFunction {

}
Component({

  properties: {
    item: {
      type: Object,
      value: [],
    },
    openusername: {
      type: Object,
    },
    direction: {
      type: String,
      value: ""
    },
    type: {
      type: String,
      value: ""
    }
    // data:{
    //   openusername:{}
    // }
  },

  methods: {

    ShowContent: function (e) {
      //对数据进行更新
      var content = JSON.stringify(this.data.item)
      wx.navigateTo({
        url: "../../pages/more/pages/DetailContent/DetailContent?content=" + content,
      })
    },
    //点击事件
    getStar_card(e) { //--------------------Starif：false:未点赞；true：已点赞
      var content = this.data.item
      var args = wx.getStorageSync('args')
      var Star_User = content.Star_User //初始点赞用户
      var openusername = this.properties.openusername
      if (!Star_User) { //判断点赞人有没有在数组里面
        Star_User = []
      }
      var Starif = false
      //判断是不是为点赞过的usernameid
      ///--------------------------------------取消点赞（48-54）
      for (var i = 0; i < Star_User.length; i++) {
        if (Star_User[i].username == openusername.username) {
          Starif = true
          Star_User.splice(Star_User.indexOf(Star_User[i]), 1) //改变了 Star_User  --> content.Star_User
          break
        }
      }
      if (!Starif) {
        openusername.Star_time = new Date().getTime()
        Star_User.push(openusername) // 改变了 Star_User  
        wx.showToast({
          title: '点赞成功',
          icon: "none"
        })
      }
      var Star_count = Star_User.length
      //点赞后对本地数据进行更新
      //点赞用户更新
      content.Star_User = Star_User

      //点赞用户数更新
      content.Star = Star_count

      let character = { // 处理得到点赞者信息
        userName: args.username,
        iconUrl: args.iconUrl,
        nickName: args.nickName
      }
      let be_character = { // 被点赞者信息
        userName: content.username,
        iconUrl: content.iconUrl,
        nickName: content.nickName
      }
      let starTime = new Date().getTime(); // 点赞时间

      app.globalData.allList.forEach(e => {
        if (e._id === content._id) {
          e.Star_count = Star_count
          e.Star_User = Star_User
        }
      })
      var that = this
      //点赞后对数据库数据进行更新
      wx.cloud.callFunction({ // 云函数更改点赞状态
        name: "CampusCircle",
        data: {
          type: "StarControlLogs",
          Time: content.Time,
          Star: Star_count,
          Star_User: Star_User,
          character: character,
          username: args.username,
          be_character: be_character,
          be_username: content.username,
          createTime: starTime,
          arcticle: content,
          arcticle_id: content._id,
          _id: content._id,
          username: args.username
        }
      }).then( )
      that.setData({
        item : {
          ...that.data.item,
          Star: Star_count,
        },
        Star_User: Star_User,
      })

      // app.globalData.List = this.data.List
    },
    onLazyLoad(info) {},
  }
})