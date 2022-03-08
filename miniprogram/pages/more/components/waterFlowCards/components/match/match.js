var app = getApp()
Component({
  properties: {
    item: {
      type: Object,
      value: [],
    },
    List: {
      type: Array,
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
        character, be_character
      })
    },
    attached: function () {
    }
  },
  methods: {
    ShowContent: function (e) {
      //对数据进行更新
      // var assoMess = JSON.stringify(this.data.item.assoMess)
      // var Title = this.data.item.Title
      // var Text = this.data.item.Text
      let content = {
        assoMess: this.data.item.assoMess,
        Title: this.data.item.Title,
        Text: this.data.item.Text,
        borderArr: this.data.item.borderArr,
        question: this.data.item.question
      }
      wx.navigateTo({
        url: './pages/Match/Match?assoMess',
        success: (res) => {
          res.eventChannel.emit('setContentData', content)
        },
      });
      // try {
      //   // content = JSON.parse(content)
      //   // if (content.CommentList) {
      //   //   delete content.CommentList
      //   // }
      //   // content = JSON.stringify(content)
      // } catch { }
      // wx.navigateTo({

      //   url: "./pages/Match/Match?assoMess=" + assoMess + '&Title=' + Title + '&Text=' + Text,
      //   fail() {
      //     wx.navigateTo({
      //       url: "../../pages/Match/Match?assoMess=" + assoMess + '&Title=' + Title + '&Text=' + Text,

      //     })
      //   }
      // })
    },
    onLazyLoad(info) {
    },
  }
})