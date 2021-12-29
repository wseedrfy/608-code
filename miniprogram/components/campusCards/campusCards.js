var app = getApp()
Component({
  properties: {
    List: {
      type: Array,
      value: [],
    },
    openusername: {
      type: Object,
    },
    direction:{
      type:String,
      value:""
    }
    // data:{
    //   openusername:{}
    // }
  },
  methods: {
    ShowContent: function (e) {
      var index = e.currentTarget.dataset.index
      //对数据进行更新
      var content = JSON.stringify(this.data.List[index])
      wx.navigateTo({
        url: "../../pages/more/DetailContent/DetailContent?content=" + content,
      })
      this.triggerEvent('ShowContent', e.currentTarget.dataset.index)
    },
    //点击事件
    getStar_card(e) {
      var index = e.currentTarget.dataset.index //索引
      var content = this.properties.List[index] //点击页的数据
      var args = wx.getStorageSync('args')
      var Star_User = content.Star_User         //初始点赞用户
      var openusername = this.properties.openusername
      if (!Star_User) {                         //判断点赞人有没有在数组里面
        Star_User = []
      }
      var Starif = false
      //判断是不是为点赞过的usernameid
      for (var i = 0 ;i<Star_User.length;i++){
        if(Star_User[i].username == openusername.username){
          Starif = true
          // openusername
          // new Date().getTime()
          Star_User.splice(Star_User.indexOf(Star_User[i]), 1)  
          break
        }
      }
      if (!Starif) {
        openusername.Star_time = new Date().getTime()
        console.log(openusername,"要把它推进Star_User了")
        Star_User.push(openusername)
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
      this.properties.List[index]=content
      //更新后的数据本地刷新
      this.setData({
        List:this.properties.List
      })
      console.log("Star_count", Star_count)
      let character = {                            // 处理得到点赞者信息
        userName:args.username,
        iconUrl:args.iconUrl,
        nickName:args.nickName
      }
      let be_character = {                         // 被点赞者信息
        userName:content.username,   
        iconUrl:content.iconUrl,
        nickName:content.nickName
      }
      let starTime = new Date().getTime();         // 点赞时间
      //点赞后对数据库数据进行更新
      console.log("触发这个点赞函数");
      wx.cloud.callFunction({   // 云函数更改点赞状态
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
      }).then(console.log('触发云函数'))
      app.globalData.List = this.data.List
      //点赞数全局变量
      app.globalData.Star_count = Star_count
      //点赞数组全局变量
      app.globalData.Star_User = Star_User
    },
    onLazyLoad(info) {
    },
  }
})