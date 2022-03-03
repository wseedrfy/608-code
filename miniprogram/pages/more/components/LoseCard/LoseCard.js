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
    currentTab: {         // 用于点赞逻辑
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
    
    onLazyLoad(info) {},
  }
})