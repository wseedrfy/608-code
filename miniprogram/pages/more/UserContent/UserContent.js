// pages/more/UserContent/UserContent.js
var util = require("../../../utils/util.js")
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
  // ShowContent:function(e){
  //   var content=JSON.stringify(e.currentTarget.dataset.index)
  //   var del=1
  //   console.log("content",content)
  //   wx.navigateTo({
  //     url: "../DetailContent/DetailContent?content=" + content + "&del=" + del, 
  //   })
  // },
  getStar_left_card:function(e){
    this.data.direction="Left"
    var index = e.currentTarget.dataset.index //索引
    var List  = this.data.leftList
    this.get_Star(index,List)
  },
  getStar_right_card:function(e){
    this.data.direction="right"
    var index = e.currentTarget.dataset.index //索引
    var List  = this.data.rightList
    this.get_Star(index,List)
  },
  get_Star:function(index,List) {
    var content = List[index] //点击页的数据
    var Star_User = content.Star_User //初始点赞用户
    var openusername = this.data.openusername
    if (!Star_User) {
      Star_User = []
    }
    var Starif = false
    //判断是不是为点赞过的usernameid
    for (var i = 0 ;i<Star_User.length;i++){
      if(Star_User[i].username===openusername.username){
        Starif = true
        Star_User.splice(Star_User.indexOf(openusername), 1)
      }
    }
    if (!Starif) {
      openusername.Star_time = new Date().getTime()
      //push到usernameid
      Star_User.push(openusername)
      wx.showToast({
        title: '点赞成功',
        icon: "none"
      })
      console.log(Star_User)
    }
    var Star_count = Star_User.length
    //点赞后对本地数据进行更新

    //点赞用户更新
    content.Star_User = Star_User
    //点赞用户数更新
    content.Star = Star_count
    console.log(content, 244)
    if( this.data.direction==="Left"){
          //更新后的数据本地刷新
      this.setData({
        leftList:List
      })
    }
    else if (this.data.direction==="right"){
      this.setData({
        rightList:List
      })
    }
    console.log("Star_count", Star_count)
    //点赞后对数据库数据进行更新
    wx.cloud.callFunction({
      name: "CampusCircle",
      data: {
        type: "starCount",
        username: that.data.username,
        _id: content._id,
        Star: Star_count,
        Star_User: Star_User
      },
      success(res) {
        console.log(res)
      }
    })
    //点赞数
    app.globalData.Star_count = Star_count
    //点赞数组
    app.globalData.Star_User = Star_User
  },
  ShowContentLeft:function(e){
    this.data.direction="Left"
    var index=e.currentTarget.dataset.index
    var del=1
    this.data.directionIndex=index
    var content=JSON.stringify(this.data.leftList[index])
     wx.navigateTo({
       url: "../DetailContent/DetailContent?content=" + content + "&del=" + del,
     })
  },
  ShowContentRight: function (e) {
    this.data.direction = "Right"
    var index = e.currentTarget.dataset.index
    var del = 1
    this.data.directionIndex = index
    var content = JSON.stringify(this.data.rightList[index])
    wx.navigateTo({
      url: "../DetailContent/DetailContent?content=" + content + "&del=" + del,
    })
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
    // console.log(currentPage);
    // console.log(that.data.nickname);
    // console.log(that.data.iconUrl);
    //云数据的请求
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.cloud.callFunction({
      name: "CampusCircle",
      data: {
        type: "readUser",
        currentPage: currentPage,
        nickname: that.data.nickname,
        iconUrl: that.data.iconUrl,
        username: that.data.username
      },
      success(res) {
        wx.hideLoading()
        that.data.resultLength = res.result.data.length
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
              leftList: [],
              rightList: [],
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
    var that =this 
    var i=0
    that.data.leftList=[],
    that.data.rightList=[],
    that.data.leftH=0,
    that.data.rightH=0
    var school = args.school
    var nickname =args.nickName
    var iconUrl =args.iconUrl
    console.log(school)
    if(school && nickname && iconUrl){
      that.setData({
        school:school,
        nickname:nickname,
        username: args.username,
        iconUrl:iconUrl,
        // openusername:username
        openusername:{
          username: args.username,
          iconUrl: args.iconUrl,
          nickName: args.nickName
        }
      })
      console.log(that.data.openusername)
      if(i==0){
        currentPage=0
        that.getData()
        i++
      }
    }else{
      that.setData({
        DataNull: 0,
      })
      wx.showModal({
        title: '提示',
        content: '小主还没登录哟QwQ',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }, fail(res) {
          that.setData({
            DataNull: 0,
          })
          wx.showModal({
            title: '提示',
            content: '小主还没登录哟QwQ',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      })
    }
  },
    

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //  currentPage=0
    //  this.getData()
    // console.log(app.globalData.Comment)
    if(this.data.direction=="Left"){
      var index=this.data.directionIndex
      this.data.leftList[index].CommentList=app.globalData.Comment
      console.log("this.data.leftList[index]",this.data.leftList[index])
      this.setData({
        leftList: this.data.leftList,
        rightList: this.data.rightList
      })
    } else if (this.data.direction == "Right") {
      var index = this.data.directionIndex
      this.data.rightList[index].CommentList = app.globalData.Comment
      console.log("this.data.rightList[index]", this.data.rightList[index])
      this.setData({
        leftList: this.data.leftList,
        rightList: this.data.rightList
      })
    }
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