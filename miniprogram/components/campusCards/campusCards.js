Component({
  properties: {
    List: {
      type: Array,
      value: [],
      
    },
  },
  methods: {
    ShowContent: function (e) {
      var index=e.currentTarget.dataset.index
      var content=JSON.stringify(this.properties.List[index])
      console.log(content)
      wx.navigateTo({
        url: "../../pages/more/DetailContent/DetailContent?content=" + content,
      })
      this.triggerEvent('ShowContent',e.currentTarget.dataset.index)
    },
    onLazyLoad(info) {
      console.log(info)
    },
  }
})