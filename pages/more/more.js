// pages/more/more.js
var app = getApp()  
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
   
    noramalData: [{
        "Cover": "http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190306144842/1001.png",
        "Title":"标题标题标题标题标题标题",
        "Text":"文字文字文字文字文字文字",
        "CoverHeight": 340,
        "CoverWidth": 270
      },
      {
        "Cover": "http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190313090409/完美9.png",
        "Title":"标题标题标题标题标题标题",
        "Text":"文字文字文字文字文字文字",
        "CoverHeight": 871,
        "CoverWidth": 672
      },
      {
        "Cover": "http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190313090409/完美9.png",
        "Title":"标题标题标题标题标题标题",
        "Text":"文字文字文字文字文字文字",
        "CoverHeight": 871,
        "CoverWidth": 672
      },
      {
        "Cover": "https://img.zcool.cn/community/01743a594097d3a8012193a3aa31eb.jpg@1280w_1l_2o_100sh.jpg",
        "Title":"标题标题标题标题标题标题",
        "Text":"文字文字文字文字文字文字",
        "CoverHeight": 930,
        "CoverWidth": 672
      },
      {
        "Cover": "https://img.zcool.cn/community/01e2525c235064a8012029ac7836fa.jpg@1280w_1l_2o_100sh.jpg",
        "Title":"标题标题标题标题标题标题",
        "Text":"文字文字文字文字文字文字",
        "CoverHeight": 571,
        "CoverWidth": 672
      }
    ],
   
    leftList: [],
    rightList: [],
    Title:' ',
    Text:' ',
    showModel:false,
    tempFilePaths: ''
  },

  add(){
    var showModel=this.data.showModel
    var that=this
    if(showModel){
      this.setData({
        add_style:"add_hide"
      })
      setTimeout(() => {
        that.setData({
          showModel: !showModel
        })
      }, 200);
    }else{
      this.setData({
        add_style:"add_show",
        showModel:!showModel
      })
    }
  },

  chooseimage: function () {  
   
    wx.chooseImage({  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success:  (res) =>{  
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        this.setData({  
          tempFilePaths:res.tempFilePaths  
        })  
      }  
    })  
  }, 


    //以本地数据为例，实际开发中数据整理以及加载更多等实现逻辑可根据实际需求进行实现   
  onLoad: function(options) {
    var that = this;
    var allData = that.data.noramalData;
    //定义两个临时的变量来记录左右两栏的高度，避免频繁调用setData方法
    var leftH = 0;
    var rightH = 0;
    var leftData = [];
    var rightData = [];
    for (let i = 0; i < allData.length; i++) {
      var currentItemHeight = parseInt(Math.round(allData[i].CoverHeight * 370 / allData[i].CoverWidth));
      console.log("currentItemHeight233",currentItemHeight)
      console.log("leftH",leftH)
      console.log("rightH",rightH)
      allData[i].CoverHeight = currentItemHeight + "rpx";//因为xml文件中直接引用的该值作为高度，所以添加对应单位
      console.log("allData[i].CoverHeight",allData[i].CoverHeight)
      if (leftH == rightH || leftH < rightH) {//判断左右两侧当前的累计高度，来确定item应该放置在左边还是右边
        leftData.push(allData[i]);
        leftH += currentItemHeight;
      } else {
        rightData.push(allData[i]);
        rightH += currentItemHeight;
      }
    }
    //更新左右两栏的数据以及累计高度
    that.setData({
      leftList: leftData,
      rightList: rightData,
      Title:'标题标题标题标题标题标题',
      Text:'文字文字文字文字文字文字'
    })
  },})