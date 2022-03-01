var app = getApp()
class cardFunction {

}
Component({

  properties: {
    item: {
      type: Object,
      value: [],
    },
    type: {
      type: String,
      value: ""
    }
  },
  data: {
    character: {},
    be_character: {},
  },
  lifetimes: {
    ready() {
      let content = this.data.item;
      let args = wx.getStorageSync('args');
      let character = {
        username: args.username,
        iconUrl: args.iconUrl,
        nickName: args.nickName
      };
      let be_character = {
        userName: content.username,
        iconUrl: content.iconUrl,
        nickName: content.nickName
      }
      console.log(character,be_character);
      this.setData({
        character,be_character
      })
    },
  },
  methods: {

    ShowContent: function (e) {
      //对数据进行更新
      var content = JSON.stringify(this.data.item)
 
      wx.navigateTo({
    
        url: "./pages/DetailContent/DetailContent?content=" + content,
        fail(){
          wx.navigateTo({
            url: "../../pages/DetailContent/DetailContent?content=" + content,
  
          })
        }
      })
    },
    //点击事件
    getStar_card(e) {  //--------------------Starif：false:未点赞；true：已点赞
      var content = this.data.item;
      var Star_User = content.Star_User;
      var args = wx.getStorageSync('args');

      // 边界处理 - 初始点赞用户
      if (!Star_User) { 
        Star_User = []
      }
      var Starif = false;
      // 判断该用户是否已点过赞 - 取消点赞逻辑
      for (var i = 0; i < Star_User.length; i++) {
        if (Star_User[i].username == args.username) {
          Starif = true;
          Star_User.splice(Star_User.indexOf(Star_User[i]), 1) //改变了 Star_User  --> content.Star_User
          break
        }
      }
      if (!Starif) {
        let openusername = this.data.character;
        openusername.Star_time = new Date().getTime()
        Star_User.push(openusername) // 改变了 Star_User  
        wx.showToast({
          title: '点赞成功',
          icon: "none"
        })
      }
      //点赞后对本地数据进行更新
      //点赞用户更新
      content.Star_User = Star_User;


      let starTime = new Date().getTime(); // 点赞时间
      app.globalData.allList.forEach(e => {
        if (e._id === content._id) {
          e.Star_User = Star_User
        }
      })
      var that = this
      //点赞后对数据库数据进行更新
      wx.cloud.callFunction({ // 云函数更改点赞状态
        name: "CampusCircle",
        data: {
          type: "StarControlLogs",
          Star_User: Star_User,       // 旧云函数 starCount 要用到
          character: that.data.character,
          be_character: that.data.be_character,
          createTime: starTime,
          arcticle: content,          
        }
      }).then()
      that.setData({
        item : {
          ...that.data.item,
        },
        Star_User: Star_User,
      })
    },
    onLazyLoad(info) {},
  }
})