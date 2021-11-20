// pages/more/more.js
var app = getApp()  
var util = require("../../utils/util")
let currentPage = 0 // 当前第几页,0代表第一页 
let pageSize = 10 //每页显示多少数据 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    rectHeight: getApp().globalData.rectHeight,
    noramalData: [],
    current:0,
    tabitem:[{
        id:0,
        title:"日常",
        type:0
      },
      {
        id:1,
        title:"情墙",
        type:0
      },
      {
        id:2,
        title:"悄悄话",
        type:0
      },
      {
        id:3,
        title:"地点",
        type:0
      },
      {
        id:4,
        title:"二手",
        type:0
      },
      {
        id:5,
        title:"社团",
        type:0
      },
      {
        id:6,
        title:"拾领",
        type:0
      },
      {
        id:7,
        title:"活动",
        type:0
      },
      {
        id:8,
        title:"吐槽",
        type:0
      }
    ],

    info: {
      licensePicUrls: [],
    },
    imgShow:false,

    leftList: [],
    rightList: [],
    formTitle:' ',
    formText:' ',
    showModel:false,
    tempFilePaths: '',
    Label:'',
    LabelId:0,
    imageHeight:0,
    imageWidth:0,
    currentItemHeight:0,
    leftH:0,
    rightH:0,
    photo:[],

    loadMore: false, //"上拉加载"的变量，默认false，隐藏  
    loadAll: false //“没有数据”的变量，默认false，隐藏 
  },
  
  search_Input:function(e){
    this.animate('.search', [{
      opacity: '1',
      width: '90rpx',
    }, {
      opacity: '1',
      width: '270rpx',
    }],1000)
  },
  /*添加内容图标按钮*/
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
  ShowContent:function(e){
    var content=JSON.stringify(e.currentTarget.dataset.index)
    console.log("content",content)
    wx.navigateTo({
      url: "DetailContent/DetailContent?content=" + content,
    })
  },
  chooseimage: function () {  
    var that = this; 
    if(that.data.photo.length==0){
      wx.chooseImage({  
        count: 2,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
        success:  (res) =>{  
          that.data.photo=res.tempFilePaths
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
          that.setData({  
            photo:that.data.photo
          })
          wx.getImageInfo({
            src: that.data.photo[0],
            success: function (res) {
              that.data.imageHeight=res.height
              that.data.imageWidth=res.width
            }
          })
        }  
      })  
    }
  }, 
  deleteImage: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    if(that.data.photo.length!=0){
      wx.showModal({
        title: '提示',
        content: '确定要删除此图片吗？',
        success: function (res) {
          if (res.confirm) {
            that.data.photo.splice(index,1)
          } 
          that.setData({
            photo:that.data.photo,
            current:0
          });
          wx.getImageInfo({
            src: that.data.photo[0],
            success: function (res) {
              that.data.imageHeight=res.height
              that.data.imageWidth=res.width
            }
          })
        }
      })
    }
  },
  PreviewImage: function (e) {
    let index = e.currentTarget.dataset.index;
    var imgs=this.data.photo;
    if(imgs.length!=0){
      wx.previewImage({
        current: imgs[index],
        urls: imgs,
      })
    }
  },
  setTab: function(e) {
    let arry = this.data.tabitem
    let index = e.currentTarget.dataset.index
    let title = e.currentTarget.dataset.title
    this.data.Label=arry[index].title
    this.data.LabelId=arry[index].id
    arry[index].type=1
    this.setData({
      tabitem: arry,
    })
    arry[index].type=0
  },

  formSubmit:function(e){     //添加与存储
    let{formTitle, formText}=e.detail.value
    var that=this
    if(!formTitle){
      wx.showToast({
        title: '标题不能为空',
        icon:'none'
      })
    }else if(!formText){
      wx.showToast({
        title: '文字不能为空',
        icon:'none'
      })
    }else if(that.data.photo.length==0){
      wx.showToast({
        title: '图片不能为空',
        icon:'none'
      })
    }else if(!that.data.Label){
      wx.showToast({
        title: '标签不能为空',
        icon:'none'
      })
    }else{
      var add={
        "Cover": that.data.photo[0],
        "AllPhoto":JSON.parse(JSON.stringify(that.data.photo)),
        "Title":formTitle,
        "Text":formText,
        "CoverHeight": that.data.imageHeight,
        "CoverWidth": that.data.imageWidth,
        "Label":that.data.Label,
        "LabelId":that.data.LabelId,
        "Time":new Date().getTime()
      }
      console.log("add",add)
      that.data.noramalData.push(add)
      console.log(that.data.noramalData)
      that.CalculateImage()
      var NewData=that.data.noramalData.length-1
      that.uploadimg(NewData)
    }
  },

  CalculateImage:function(){
    var that = this;
    var allData = that.data.noramalData;
    console.log("233.allData",allData)
    console.log("allData",allData)
    for (let i = 0; i < allData.length; i++) {
      var height=parseInt(Math.round(allData[i].CoverHeight * 370 / allData[i].CoverWidth));
      if(height){
        var currentItemHeight = parseInt(Math.round(allData[i].CoverHeight * 370 / allData[i].CoverWidth));
        allData[i].ShowHeight=currentItemHeight
        if(currentItemHeight>500){
          currentItemHeight=500
          allData[i].ShowHeight=currentItemHeight
        }
        allData[i].CoverHeight = currentItemHeight + "rpx";//因为xml文件中直接引用的该值作为高度，所以添加对应单位
        if (that.data.leftH == that.data.rightH || that.data.leftH < that.data.rightH) {//判断左右两侧当前的累计高度，来确定item应该放置在左边还是右边
          that.data.leftList.push(allData[i]);
          that.data.leftH += currentItemHeight;
          console.log("that.data.leftH",that.data.leftH)
        } else {
          that.data.rightList.push(allData[i]);
          that.data.rightH += currentItemHeight;
          console.log("that.data.rightH",that.data.rightH)
        }
      }
    }
    that.setData({
      leftList: that.data.leftList,
      rightList: that.data.rightList,
    })
  },

    //以本地数据为例，实际开发中数据整理以及加载更多等实现逻辑可根据实际需求进行实现   
  onLoad: function(options) {
    this.getData()
    // var that = this;
    
    // wx.cloud.callFunction({
    //   name: 'CampusCircle',
    //   data: {
    //     type: 'read'
    //   },
    //   complete: res => {
    //     console.log("res.result.data",res.result.data)
    //     that.data.noramalData=res.result.data
    //     var allData = that.data.noramalData;
    //     for (let i = 0; i < allData.length; i++) {
    //       if (that.data.leftH == that.data.rightH || that.data.leftH < that.data.rightH) {//判断左右两侧当前的累计高度，来确定item应该放置在左边还是右边
    //         that.data.leftList.push(allData[i]);
    //         that.data.leftH += allData[i].ShowHeight;
    //         console.log("Bef-that.data.leftH",that.data.leftH)
    //       } else {
    //         that.data.rightList.push(allData[i]);
    //         that.data.rightH += allData[i].ShowHeight;
    //         console.log("bef-that.data.rightH",that.data.rightH)
    //       }
    //     }
    //     that.setData({
    //       leftList: that.data.leftList,
    //       rightList: that.data.rightList,
    //     })
    //   }
    // });
  },
  //将数据上传到数据库
  uploadData:function(NewData,fileIDs){
    var that = this
    console.log(NewData)
    console.log(that.data.noramalData[NewData])
    wx.cloud.callFunction({
      name: 'CampusCircle',
      data: {
        Cover: fileIDs[0],
        AllPhoto: fileIDs,
        Title: that.data.noramalData[NewData].Title,
        Text: that.data.noramalData[NewData].Text,
        CoverHeight: that.data.noramalData[NewData].CoverHeight,
        CoverWidth: that.data.noramalData[NewData].CoverWidth,
        Label: that.data.noramalData[NewData].Label,
        LabelId: that.data.noramalData[NewData].LabelId,
        Time: that.data.noramalData[NewData].Time,
        ShowHeight: that.data.noramalData[NewData].ShowHeight,
        type: 'write'
      }, success: res => {
        wx.showToast({
          duration:4000,
          title: '添加成功'
        })
 
      }, 
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '出错啦！请稍后重试'
        })
        console.error
      },
      complete() {
        that.setData({
          photo:[ ],
          Input_Title: "",
          Input_Text: "",
          showModel: !that.data.showModel,
        })
      }
    })
  },
  //将本地图片上传到云存储进行存储，后续通过fileid进行图片展示
  // 图片上传逻辑
// 1.判断条件，是否符合上传条件
// 2.自定义函数上传图片到云存储
// 3.将所有信息保存到数据库
  uploadimg:function(NewData){
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    var path=this.data.noramalData[NewData].AllPhoto
    console.log(path)
    var fileIDs=[]
    var that =this
    for(var i=0;i<path.length;i++){
       wx.cloud.uploadFile({
        cloudPath:'CampusCircle_images/' + new Date().getTime() + Math.floor(Math.random() * 150) + '.png',
        filePath:path[i],
      }).then(res=>{
        fileIDs.push(res.fileID)
        console.log(fileIDs)
        that.uploadData(NewData,fileIDs)
        wx.hideLoading()
      })
      }
  },
  //下拉触底改变状态
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
  //提高网络性能，分页加载数据
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
        type:"read",
        currentPage:currentPage,
        pageSize:pageSize
      },
      success(res){
        if (res.result.data && res.result.data.length > 0) {
          console.log("请求成功", res.result.data)
          currentPage++
          //把新请求到的数据添加到noramalData里  
          let Batch_Data = that.data.noramalData.concat(res.result.data)
          var allData = res.result.data
          console.log(Batch_Data)
          console.log(allData)
          for (let i = 0; i < allData.length; i++) {
            if (that.data.leftH == that.data.rightH || that.data.leftH < that.data.rightH) {//判断左右两侧当前的累计高度，来确定item应该放置在左边还是右边
              that.data.leftList.push(allData[i]);
              that.data.leftH += allData[i].ShowHeight;
              console.log("Bef-that.data.leftH",that.data.leftH)
            } else {
              that.data.rightList.push(allData[i]);
              that.data.rightH += allData[i].ShowHeight;
              console.log("bef-that.data.rightH",that.data.rightH)
            }
            that.setData({
              leftList: that.data.leftList,
              rightList: that.data.rightList,
            })
          }
          that.setData({
            noramalData: Batch_Data, //获取数据数组    
            loadMore: false //把"上拉加载"的变量设为false，显示  
          });
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
  },
})




