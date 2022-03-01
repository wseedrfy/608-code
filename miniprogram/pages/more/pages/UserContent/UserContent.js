// pages/more/UserContent/UserContent.js
var util = require("../../../../utils/util.js")
var app = getApp()
let currentPage = 0 // 当前第几页,0代表第一页 
const args = wx.getStorageSync('args')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftList: [],
    rightList: [],
    List:[],
    leftH: 0,
    rightH: 0,
    nickname: "",
    iconUrl: "",
    loadMore: false, //"上拉加载"的变量，默认false，隐藏  
    loadAll: false, //“没有数据”的变量，默认false，隐藏 
    direction:" ",
    directionIndex:0,
    openusername:{}
  },
 
  onLazyLoad(info) {
    console.log(info)
  },
  getData: function () {
    let that = this;
    //第一次加载数据
    if (currentPage == 1) {
      this.setData({
        loadMore: true, //把"上拉加载"的变量设为true，显示  
        loadAll: false //把“没有数据”设为false，隐藏  
      })
    }
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.cloud.callFunction({
      name: "CampusCircle",
      data: {
        type: "readUser",
        currentPage: currentPage,
        username: that.data.username
      },
      success(res) {
        wx.hideLoading();
        that.data.resultLength = res.result.data.length;
        if (res.result.data && res.result.data.length > 0) {
          console.log("请求成功", res.result.data);
          currentPage++;
          //把新请求到的数据添加到 noramalData 里  
          var allList =   res.result.data;
          for (let i = 0; i < allList.length; i++) {
            if(that.data.leftList.includes(allList[i]) ||that.data.rightList.includes(allList[i]) ){
              continue
            }
            if (that.data.leftH <= that.data.rightH) { //判断左右两侧当前的累计高度，来确定item应该放置在左边还是右边
              that.data.leftList.push(allList[i]);
              that.data.leftH += allList[i].ShowHeight;
            } else {
              that.data.rightList.push(allList[i]);
              that.data.rightH += allList[i].ShowHeight;
            }
          }
          that.setData({
            leftList: that.data.leftList,
            rightList: that.data.rightList,
            leftH: that.data.leftH,
            right: that.data.rightH,
            loadMore: false, //把"上拉加载"的变量设为false，显示  
            DataNull: 1,
          });
          if (res.result.data.length < 10) {
            that.setData({
              loadMore: false, //隐藏加载中。。
              loadAll: true, //所有数据都加载完了
              DataNull: 0,
            });
          }
        } else {
          if (that.data.leftH == 0 && that.data.rightH == 0) {
            that.setData({
              List:[],
            })
          }
          that.setData({
            loadAll: true, //把“没有数据”设为true，显示  
            loadMore: false, //把"上拉加载"的变量设为false，隐藏  
            DataNull: 0,
          });
        }
      },
      fail(res) {
        wx.showToast({
          title: '请求失败',
          icon: 'none',
        })
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
    let that =this 
    let i=0
    that.data.List = [];
    that.data.leftH = 0;
    that.data.rightH = 0;
    const args = wx.getStorageSync('args')
    if(args.username){
      that.setData({
        school:args.school,
        nickname:args.nickname,
        username: args.username,
        iconUrl:args.iconUrl,
        // openusername:username
        openusername:{
          username: args.username,
          iconUrl: args.iconUrl,
          nickName: args.nickName
        }
      })
      if(i == 0){
        currentPage = 0;
        // that.getData();
        i++;
      }
    }else{
      that.setData({
        DataNull: 0,
      })
      wx.showModal({
        title: '提示',
        content: '小主还没登录哟QwQ',
      })
    }
  },
    

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      leftList : [],
      rightList: [],
      List:[],
      leftH: 0,
      rightH: 0,
    })
    currentPage = 0
    this.getData();
  },

  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
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