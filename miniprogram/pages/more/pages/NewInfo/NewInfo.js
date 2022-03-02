const util = require("../../../../utils/util");
const args = wx.getStorageSync('args')

Page({
  data: {
    dataList: [],    // 放置返回数据的数组  
    oldDataList:[],  // 历史消息
    loadAll: false,  // “没有数据”的变量，默认false，隐藏  

    currentPage: 0,
    pageSize:10,
  },
  naviToDetail(e) {
    var content = JSON.stringify(e.currentTarget.dataset.content);
    wx.navigateTo({
      url: '../DetailContent/DetailContent?content='+content,
    })
  },
  //页面显示的事件
  onShow() {
    
  },
  onLoad(){
    this.getData()
    this.data.currentPage = 0;
    this.data.pageSize =10;
  },
  onPullDownRefresh(){
    wx.showLoading({
      title: '刷新中...',
    })
    this.onLoad();
    wx.hideLoading();
  },
  //页面上拉触底事件的处理函数
  onReachBottom: function() {
    console.log("上拉触底事件")
    this.getData()
  },

  //访问网络,请求数据  
  getData() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let that = this;
    wx.cloud.callFunction({
      name:'CampusCircle',
      data: {
        be_username: args.username,
        currentPage: that.data.currentPage,
        pageSize: that.data.pageSize,
        type:'ReadControlLogs'
      },
      success(res) {
        wx.hideLoading()
        if (res.result.data && res.result.data.length > 0) {
          that.data.currentPage++;
          // 1. 拿新List
          for(let i = 0; i < res.result.data.length;i++) {   // 处理每个数据的时间
            res.result.data[i].createTime = util.timeago(res.result.data[i].createTime,'Y年M月D日');
          }
          let list = that.data.dataList.concat(res.result.data)
          that.setData({
            dataList: list, //获取数据数组    
          });

          if(res.result.data.length < that.data.pageSize) {
            that.setData({
              loadAll: true, 
            });
          }
        } else {
          that.setData({
            loadAll: true, 
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
        });
      }
    })
    console.log(this.data.dataList);
  },
})