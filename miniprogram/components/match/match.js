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
    },
    type:{
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
        url: "../../pages/more/pages/DetailContent/DetailContent?content=" + content,
      })
      this.triggerEvent('ShowContent', e.currentTarget.dataset.index)
    },
    onLazyLoad(info) {
    },
  }
})