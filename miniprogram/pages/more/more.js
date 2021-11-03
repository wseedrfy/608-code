// pages/more/more.js
var app = getApp()  
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
   
    noramalData: [],
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
    chan: [],
    imageHeight:0,
    imageWidth:0,
    currentItemHeight:0,
    leftH:0,
    rightH:0
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
    var tempFilePaths=this.data.tempFilePaths
    var that = this; 
    if(tempFilePaths.length==0){
      wx.chooseImage({  
        count: 1,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
        success:  (res) =>{  
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
          that.setData({  
            tempFilePaths:res.tempFilePaths  
          })
          wx.getImageInfo({
            src: that.data.tempFilePaths[0],
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
    var tempFilePaths = that.data.tempFilePaths;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    if(tempFilePaths.length!=0){
      wx.showModal({
        title: '提示',
        content: '确定要删除此图片吗？',
        success: function (res) {
          if (res.confirm) {
            tempFilePaths.splice(index, 1);
          } 
          that.setData({
            tempFilePaths
          });
        }
      })
    }
  },
  PreviewImage: function (e) {
    let index = e.target.dataset.index;
    var imgs=this.data.tempFilePaths;
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
    //let chooseLabel=this.data.chooseLabel
    let chan = this.data.chan
    if (arry[index].type == 1) {
      arry[index].type = 0
      var row = chan.map(item => item.title).indexOf(title)
      console.log("row",row)
      chan.splice(row, 1);
    } else {
      if (chan.length == 1) {
        wx.showToast({
          title: '只能选一个',
          icon: "none"
        })
        return
      }
      chan.push({
        title: arry[index].title
      })
      arry[index].type = 1
    }
    this.setData({
      tabitem: arry,
      //chan: chan
    })
    console.log(this.data.chan)
    //console.log("chooseLabel",chooseLabel)
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
    }else if(!that.data.tempFilePaths){
      wx.showToast({
        title: '图片不能为空',
        icon:'none'
      })
    }else{
      var add={
        "Cover": that.data.tempFilePaths[0],
        "Title":formTitle,
        "Text":formText,
        "CoverHeight": that.data.imageHeight,
        "CoverWidth": that.data.imageWidth,
        "Label":this.data.chan
      }
      that.data.noramalData.push(add)
      that.CalculateImage()
      /*wx.cloud.callFunction({
        name: 'CampusCircle',
        data: {
          AddContent: JSON.stringify(add),
          type: 'write'
        },
        success: res => {
          wx.showToast({
            title: '添加成功',
            icon: 'none',
          })
          this.onLoad()
        },
        fail: err => {
          wx.showToast({
            title: '添加失败',
            icon: 'none',
          })
        },
        complete() {
          that.setData({
            formTitle:"",
            formText: "",
            tempFilePaths: "",
            showModel: !that.data.showModel,
          })
        }
      })*/
    }
  },

  CalculateImage:function(){
    var that = this;
    var allData = that.data.noramalData;
    for (let i = 0; i < allData.length; i++) {
      var height=parseInt(Math.round(allData[i].CoverHeight * 370 / allData[i].CoverWidth));
      if(height){
        var currentItemHeight = parseInt(Math.round(allData[i].CoverHeight * 370 / allData[i].CoverWidth));
        allData[i].ShowHeight=currentItemHeight
        if(currentItemHeight>500){
          currentItemHeight=500
        }
        allData[i].CoverHeight = currentItemHeight + "rpx";//因为xml文件中直接引用的该值作为高度，所以添加对应单位
        if (that.data.leftH == that.data.rightH || that.data.leftH < that.data.rightH) {//判断左右两侧当前的累计高度，来确定item应该放置在左边还是右边
          that.data.leftList.push(allData[i]);
          that.data.leftH += currentItemHeight;
        } else {
          that.data.rightList.push(allData[i]);
          that.data.rightH += currentItemHeight;
        }
        console.log("that.data.leftH",that.data.leftH)
        console.log("that.data.rightH",that.data.rightH)
      }
    }
    that.setData({
      leftList: that.data.leftList,
      rightList: that.data.rightList,
    })
  },

    //以本地数据为例，实际开发中数据整理以及加载更多等实现逻辑可根据实际需求进行实现   
  onLoad: function(options) {
    this.CalculateImage()
  },
})