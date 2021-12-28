const util = require("../../../utils/util");

var currentPage = 0 // 当前第几页,0代表第一页 
var pageSize = 10 //每页显示多少数据 
Page({
  data: {
    dataList: [],    // 放置返回数据的数组  
    oldDataList:[],  // 历史消息
    loadMore: false, // "上拉加载"的变量，默认false，隐藏  
    loadAll: false   // “没有数据”的变量，默认false，隐藏  
  },
  naviToDetail(e) {
    let content = e.currentTarget.dataset.content
    wx.navigateTo({
      url: '../DetailContent/DetailContent',
      events: {
        acceptDataFromNewInfoPage: function (data) {
          console.log(data);
        }
      },
      success:(res) => {
        res.eventChannel.emit('acceptDataFromNewInfoPage', {data: content})
      }
    })
  },
  //页面显示的事件
  onShow() {
    this.getData()
  },
  onLoad(){
    currentPage =0;
    pageSize =10
  },
  //页面上拉触底事件的处理函数
  onReachBottom: function() {
    console.log("上拉触底事件")
    if (!this.data.loadMore) {
      this.setData({
        loadMore: true, //加载中  
        loadAll: false //是否加载完所有数据
      });
      this.getData()
    }
  },
  //访问网络,请求数据  
  getData() {
    let args = wx.getStorageSync('args')
    let be_character = {         // 用户自己
       iconUrl: args.iconUrl,
       nickName: args.nickName
    }
    let that = this;
    // 第一次加载数据
    if (currentPage == 1) {
      this.setData({
        loadMore: true, //把"上拉加载"的变量设为true，显示  
        loadAll: false //把“没有数据”设为false，隐藏  
      })
    }
    wx.cloud.callFunction({
      name:'CampusCircle',
      data: {
        be_character:be_character,
        currentPage:currentPage,
        pageSize:pageSize,
        type:'ReadControlLogs'
      },
      success(res) {
        if (res.result.data && res.result.data.length > 0) {
          console.log("请求成功", res.result.data)
          currentPage++
          // 2. 拿新List
          for(let i = 0; i < res.result.data.length;i++) {   // 处理每个数据的时间
             res.result.data[i].createTime = util.timeago(res.result.data[i].createTime,'Y年M月D日');
          }
          let list = that.data.dataList.concat(res.result.data)
          that.setData({
            dataList: list, //获取数据数组    
            loadMore: false //把"上拉加载"的变量设为false，显示  
          });
          console.log("第二步拿新List",that.data.dataList);

          // 5. 更新数据库数据状态
          if (res.result.data.length < pageSize) {
            that.setData({
              loadMore: false, //隐藏加载中。。
              loadAll: true //所有数据都加载完了
            });
          }
        } else {
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
      console.log(this.data.dataList);
  },
})