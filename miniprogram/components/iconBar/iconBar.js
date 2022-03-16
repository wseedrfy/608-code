Component({
  properties: {
    iconList: {
      type: Array,
      value: [],
      observer:'_onRefresh'
    }
  },
  methods: {
    _onRefresh(newVal, oldVal){  //这里只要父级值改变，就会执行
      var iconList = this.properties.iconList
      console.log(iconList)
      if(iconList.length >= 16){
        iconList[14].name = '更多'
        this.setData({iconList: iconList.splice(0,15)})
      }else{
        return
      }

    }
  }

})