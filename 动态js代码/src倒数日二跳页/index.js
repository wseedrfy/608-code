
Page({
  data: {
    isLoading: true,
    gapDays: "",
    Name: "",
    Date: ""
  },
  tapPrev:function(){
    wx.navigateBack({//返回
      delta: 1
    })
  },
  onLoad:function(options){                     //接收url传递的数据并渲染
    this.setData({
      Name:options.Name,
      Date:options.Date,
      gapDays:options.gapDays,
    })
  },
})