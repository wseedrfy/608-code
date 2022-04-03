const util = require("../../../../utils/util");
const args = wx.getStorageSync('args')

Page({
  data: {
    dataList: [],    // 放置返回数据的数组  
    oldDataList:[],  // 历史消息   -- ------- --- ------- -------暂时没用
    loadAll: false,  // “没有数据”的变量，默认false，隐藏  

    currentPage: 0,
    pageSize:10,
  },
  naviToDetail(e) {
    var jsonStr = JSON.stringify(e.currentTarget.dataset.content);
    // 对数据进行URI编码，防止数据被截断。少量数据没问题，如果对象较大则容易被截断，获取不到完整数据
    let data = encodeURIComponent(jsonStr);
    wx.navigateTo({
      url: `../DetailContent/DetailContent?content=${data}`,
    })
  },
  //页面显示的事件
  onShow() {
    
  },
  onLoad(){
    // 初始化
    this.data.currentPage = 0;
    this.data.pageSize = 10;
    this.data.dataList = [];
    // 获取数据
    this.getData()
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
    console.log("上拉触底事件");
    // 边界处理
    if(this.data.loadAll) {
      return ;
    }
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
        console.log(res.result.data);
        wx.hideLoading()
        if (res.result.data && res.result.data.length > 0) {
          that.data.currentPage++;
          // 处理每个数据的时间
          for(let i = 0; i < res.result.data.length;i++) {   
            res.result.data[i].createTime = util.timeago(res.result.data[i].createTime,'Y年M月D日');
          }
          // 拿新数据
          let list = that.data.dataList.concat(res.result.data);
          that.setData({
            dataList: list,
          });
          // 边界处理
          if(res.result.data.length < that.data.pageSize) {
            that.setData({
              loadAll: true, 
            });
          }
        } else {    // 没有数据时
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
          loadAll: true,
        });
      }
    })
    console.log(this.data.dataList);
  },
})