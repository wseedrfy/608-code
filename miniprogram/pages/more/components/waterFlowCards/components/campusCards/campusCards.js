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
    },
    // 当前标签下标
    currentTab: {
      type: Number,
    }
  },
  data: {
    character: {},
    be_character: {},
  },
  
  lifetimes: {
    ready() {
      let content = this.data.item;
      console.log(content);
      let args = wx.getStorageSync('args');
      let character = {
        userName: args.username,
        iconUrl: args.iconUrl,
        nickName: args.nickName
      };
      let be_character = {
        userName: content.username,
        iconUrl: content.iconUrl,
        nickName: content.nickName
      }
      // console.log(content);
      this.setData({
        character,be_character
      })
    },
  },
  methods: {

    ShowContent: function (e) {
      //对数据进行更新
      var content = JSON.stringify(this.data.item)
      try{
        content = JSON.parse(JSON.stringify(this.data.item))
        if(content.CommentList){
          delete content.CommentList
        }
        content = JSON.stringify(content)
      }catch{}
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
    getStar_card(e) {
      var content = this.data.item;
      var args = wx.getStorageSync('args');
      // 边界处理 - 初始化数组
      content.Star_User ? '' : content.Star_User = [];
      // 标志用户点赞状态   false:未点赞；true：已点赞
      var Starif = false;
      // 判断该用户是否已点过赞
      for (var i = 0; i < content.Star_User.length; i++) {
        if (content.Star_User[i].username == args.username) {
          Starif = true;
          content.Star_User.splice(content.Star_User.indexOf(content.Star_User[i]), 1);
          break
        }
      }
      // 若用户是未点赞状态，则 content.Star_User 新增该用户
      if (!Starif) {
        let openusername = {
          username: args.username,
          iconUrl: args.iconUrl,
          nickName: args.nickName,
          Star_time: new Date().getTime()
        };
        content.Star_User.push(openusername);
        wx.showToast({
          title: '点赞成功',
          icon: "none"
        })
      }
      
      var that = this;
      let starTime = new Date().getTime(); // 点赞时间
      // 对数据库数据进行更新
      wx.cloud.callFunction({ // 云函数更改点赞状态
        name: "CampusCircle",
        data: {
          type: "StarControlLogs",
          Star_User: content.Star_User,       // 旧云函数 starCount 要用到
          character: that.data.character,
          be_character: that.data.be_character,
          createTime: starTime,
          arcticle: content,
        }
      }).then()
      // 赋值并重渲染本组件
      this.setData({
        item : content,
      })
      // 变更全局数据 - 在当前页面中渲染出来
      let allList = app.globalData.allList;
      allList.forEach(item => {
        item.forEach(e => {
          if(e._id === content._id) {
            e.Star_User = content.Star_User;
          }
        })
      })
      this.triggerEvent("setAllList", allList)
      console.log(allList);
    },
    onLazyLoad(info) {},
  }
})