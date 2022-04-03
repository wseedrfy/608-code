// pages/more/pages/saveBureau/saveBureau.js
var app = getApp()
var util = require("../../../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    rectHeight: getApp().globalData.rectHeight,
    windowHeight: getApp().globalData.windowHeight,
    arry:[{
      name:"自习",
      type:0
    },{
      name:"电影",
      type:0
    },{
      name:"聚餐",
      type:0
    },{
      name:"拼车",
      type:0
    },{
      name:"拼单",
      type:0
    },{
      name:"运动",
      type:0
    },{
      name:"游戏",
      type:0
    },{
      name:"其他",
      type:0
    }],
    cardList:[],
    currentPage:0,
    label:null,
    contentIndex:0
  },
  toSavepublish(){
    wx.navigateTo({
      url: '../saveBureau/publishBureau/publishBureau',
    })
  },
  chooseLabel(e){
    var index = e.currentTarget.id
    var getIndex=this.data.arry.findIndex(item => item.type===1)    //---判断arry数组里面有没有标签已被选择，没有则getIndex=-1，有则返回已选择的标签索引
    this.data.currentPage=0     //----切换标签对页面进行初始化
    this.data.cardList=[]       //----切换标签对页面进行初始化
    if(getIndex!=-1){     //----将前面已选择的标签取消“选择”样式
      this.animate('.circle'+getIndex, [{
        width: '100%',
      },{
        width: '52rpx',
      }], 200)
      this.data.arry[getIndex].type = 0
      this.data.label=null
      if(getIndex===parseInt(index)){
        this.readData()
        return
      }
    }
    this.animate('.circle'+index, [{      //----给选定标签“选择”样式
      width: '52rpx',
    }, {
      width: '100%',
    }], 200)
    this.data.arry[index].type = 1
    this.data.label=this.data.arry[index].name
    this.readData()
  },

  transformTime(){
    var copyList = JSON.parse(JSON.stringify(this.data.cardList))
    copyList.forEach(item => {
      if (!!item) {
        item.time = util.timeago(item.time, 'Y年M月D日')
      }
    })
    copyList.map(item => {
      var hh=item.label
      item.showLabel = encodeURI(hh).replace(/%/g, "")
    })
    this.setData({
      copyList,
      length:copyList.length,
    })
  },

  readData(){
    const args = wx.getStorageSync('args')
    console.log("this.data.label",this.data.label);
    wx.cloud.callFunction({
      name: 'saveBureau',
      data: {
        type: "readCard",
        school: args.school,
        currentPage:this.data.currentPage,
        label:this.data.label
      },
      success: res => {
        wx.hideLoading();
        console.log(res);
        if(res.result){
          console.log(res);
          this.data.cardList=this.data.cardList.concat(res.result.data)
          this.data.currentPage++
          this.transformTime()
        }
        if(!res.result || res.result.data.length<10){
          this.setData({
            none:true,
            loading:false
          })
        }
      },
      fail: err => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
        })
        console.error
      }
    })
  },
  toLookcontent(e){
    var index=e.currentTarget.id
    wx.setStorage({
      key:"content",
      data:this.data.cardList[index],
      success:res => {
        this.setData({
          contentIndex:index
        })
        wx.navigateTo({
          url: '../saveBureau/bureauContent/bureauContent',
        })
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      arry:this.data.arry,
    })
    this.readData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var index=this.data.contentIndex
    if(this.data.manNum || this.data.womanNum){
      this.data.cardList[index].manNum=this.data.manNum
      this.data.cardList[index].womanNum=this.data.womanNum
      this.data.cardList[index].commentList=this.data.commentList
    }
    if(this.data.addData){
      this.data.addData._id=this.data.res
      this.data.cardList.push(this.data.addData)
    }
    this.data.addData=null
    this.transformTime()
    
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      loading:true,
      none:false
    })
    this.readData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})