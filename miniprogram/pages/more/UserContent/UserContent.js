// pages/more/UserContent/UserContent.js
var util = require("../../../utils/util.js")
var app = getApp()
let currentPage = 0 // 当前第几页,0代表第一页 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftList:[],
    rightList:[],
    leftH:0,
    rightH:0,
    nickname:"",
    iconUrl:"",
    loadMore: false, //"上拉加载"的变量，默认false，隐藏  
    loadAll: false, //“没有数据”的变量，默认false，隐藏 
  },
  ShowContent:function(e){
    var content=JSON.stringify(e.currentTarget.dataset.index)
    var del=1
    console.log("content",content)
    wx.navigateTo({
      url: "../DetailContent/DetailContent?content=" + content + "&del=" + del, 
    })
  },
  onLazyLoad(info) {
    console.log(info)
  },
  getData:function() {
    let that = this;
    //第一次加载数据
    if (currentPage == 1) {
      this.setData({
        loadMore: true, //把"上拉加载"的变量设为true，显示  
        loadAll: false //把“没有数据”设为false，隐藏  
      })
    }
    //云数据的请求
    wx.cloud.callFunction({
      name:"CampusCircle",
      data:{
        type:"readUser",
        currentPage:currentPage,
        nickname:that.data.nickname,
        iconUrl:that.data.iconUrl          
      },
      success(res){
        console.log("res.result.data",res.result.data)
        that.data.resultLength=res.result.data.length
        if (res.result.data && res.result.data.length > 0) {
          console.log("请求成功", res.result.data)
          currentPage++
          //把新请求到的数据添加到noramalData里  
          var allData = res.result.data
          for (let i = 0; i < allData.length; i++) {
            if (that.data.leftH == that.data.rightH || that.data.leftH < that.data.rightH) {//判断左右两侧当前的累计高度，来确定item应该放置在左边还是右边
              that.data.leftList.push(allData[i]);
              that.data.leftH += allData[i].ShowHeight;
            } else {
              that.data.rightList.push(allData[i]);
              that.data.rightH += allData[i].ShowHeight;
            }
          }
          that.setData({
            leftList: that.data.leftList,
            rightList: that.data.rightList,
            leftH:that.data.leftH,
            right:that.data.rightH,
            loadMore: false //把"上拉加载"的变量设为false，显示  
          });
          if (res.result.data.length < 10) {
            that.setData({
              loadMore: false, //隐藏加载中。。
              loadAll: true //所有数据都加载完了
            });
          }
         } else {
          if(that.data.leftH==0 && that.data.rightH==0){
            that.setData({
              leftList: [],
              rightList: [],
            })
          }
          that.setData({
            loadAll: true, //把“没有数据”设为true，显示  
            loadMore: false //把"上拉加载"的变量设为false，隐藏  
          });
        }
      },
      fail(res) {
        console.log("请求失败", res)
        that.setData({
          loadAll: false,
          loadMore: false
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this 
    that.data.leftList=[],
    that.data.rightList=[],
    that.data.leftH=0,
    that.data.rightH=0,
    wx.getStorage({
      key:"data",
      success(res){
        console.log("JSON.parse(res.data)",JSON.parse(res.data))
        var data = JSON.parse(res.data)
        var school = data.school
        var nickname =data.nickName
        var iconUrl =data.iconUrl
        console.log(school)
        that.setData({
          school:school,
          nickname:nickname,
          iconUrl:iconUrl
        })
        currentPage=0
        that.getData()
      }
    })
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
  onReachBottom: function() {
    console.log("上拉触底事件")
    let that = this
    if (!that.data.loadMore) {
      that.setData({
        loadMore: true, //加载中  
        loadAll: false //是否加载完所有数据
      });
      wx.showLoading({
        title: '加载更多中',
      })
      that.getData()
      wx.hideLoading()
      //加载更多，这里做下延时加载

    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})