Component({
  properties: {
    List: {
      type: Array,
      value: [],
    },
    openusername: {
      type: String,
      value: ""
    }
  },
  methods: {
    ShowContent: function (e) {
      var index = e.currentTarget.dataset.index
      var content = JSON.stringify(this.properties.List[index])  // 该帖子的全部信息 JSON格式
      console.log(content,"现在打印content")
      wx.navigateTo({
        url: "../../pages/more/DetailContent/DetailContent?content=" + content,
      })
      this.triggerEvent('ShowContent', e.currentTarget.dataset.index)
    },
    onLazyLoad(info) {
    },
  }
})