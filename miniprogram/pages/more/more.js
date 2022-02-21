const args = wx.getStorageSync('args')
var app = getApp()
var currentPage = 0 // 当前第几页,0代表第一页 
// 控制标签切换,翻页
var startX,endX;
var moveFlag = true;
// 旋转初始化
const _ANIMATION_TIME = 400; // 动画播放一次的时长ms
var _animation = wx.createAnimation({
  duration: _ANIMATION_TIME,
  timingFunction: 'linear',
  delay: 0,
  transformOrigin: '50% 50% 0'
})
var _animationIndex = 0; // 动画执行次数index（当前执行了多少次）
var _animationIntervalId = -1; // 动画定时任务id，通过setInterval来达到无限旋转，记录id，用于结束定时任务

Page({
  data: {
    // 1. 配置性变量
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    rectHeight: getApp().globalData.rectHeight,
    tabitem: [        // 标签
      {
        title: "全部" ,
        type: 0,
      },{
        title: "开端👍",
        type: 0,
      },{
        title: "日常",
        type: 0,
      },{
        title: "晒出课表🤣",
        type: 0,
      },{
        title: "树洞👂",
        type: 0,
      },{
        title: "2022新年Flag🚩",
        type: 0,
      },{
        title: "2021回顾◀",
        type: 0,
      },{
        title: "三行情书❤️",
        type: 0,
      },{
        title: "故事屋⭐️",
        type: 0,
      }
    ],
    loadMore: false,  // "上拉加载"的变量，默认false，隐藏  
    loadAll: false,   // "没有数据"的变量，默认false，隐藏 

    allList: [],      // 列表的内容
    current: 0,       // 单个第x张照片
    hideHidden: true,
    leftList: [], // 左列表
    rightList: [], // 右列表

    formTitle: ' ', // 发布页面标题
    formText: ' ',// 发布页面内容
    showModel: false,
    Label: '全部',
    photo: [],
    fileIDs: [],

    imageHeight: 0,
    imageWidth: 0,
    currentItemHeight: 0,
    leftH: 0,
    rightH: 0,


    DataNull: 0, // 这个是状态，最后显示是否是全部数据
    addAft: 0,   // 这个是状态，防止用户发布内容回到第一页

    direction: " ",
    directionIndex: 0,

    showLoading: 0,
    animation: '',

    campus_account: false, // 封号状态
    describe: "",          // 封号简介
    content: {},           // 个人信息
    openusername: {},      //点赞人的对象
  },

  //处理左右结构
  RightLeftSolution(empty = false) {
    if(empty){
      currentPage =  0
      this.setData({
        leftList: [],
        rightList: [],
        leftH: 0,
        rightH: 0,
        allList : [],
        addAft : 0
      })
      return
    }
    var that = this;
    var allList =  this.data.allList;
    app.globalData.allList = allList;
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
    this.setData({
      leftList: that.data.leftList,
      rightList: that.data.rightList,
    })
  },

  // 获取新消息总数
  getNewInfo() {
    var that = this;
    // 被评论者信息

    wx.cloud.database().collection('New-Information').where({ //------------请求数据库
      be_character_username: args.username, //------------------被评论者学号
      status: 0 //-------------------三种状态：“0”：用户还没看消息列表；“1”：用户已经看到了消息列表；“-1”：取消点赞和评论
    }).count().then(res => {
      console.log("res.total", res.total) //----------------新消息提示数目
      that.setData({
        NewInfo: res.total
      })
    })
  },

  // 1. 跳转页面
  navigate(e) {
    let url = e.currentTarget.id;
    switch (url) {
      case 'myself':
        wx.switchTab({
          url: "../myself/myself",
        });
        break;
      default:
        wx.navigateTo({
          url: `pages/${url}/${url}`
        })
        break;
    }
  },

  // 2. 操作数据库
  getData() { // 2.1 提高网络性能，分页加载数据
    let that = this;
    // 第一次加载数据
    if (currentPage == 1) {
      this.setData({
        loadMore: true, //把"上拉加载"的变量设为true，显示  
        loadAll: false //把“没有数据”设为false，隐藏  
      })
    }
    //云数据的请求
    wx.cloud.callFunction({
      name: "CampusCircle",
      data: {
        type: "read",
        username: that.data.username,
        currentPage: currentPage,
        ShowId: that.data.Label,
        addAft: that.data.addAft,
        //游客模式校园圈初始化
        School: that.data.school == "游客登录" ? "广东石油化工学院" : that.data.school
      },
      success(res) {
        if (res.result && res.result.data.length > 0) {
          currentPage++;
          //把新请求到的数据添加到allList里  
          that.data.allList = that.data.allList.concat(res.result.data);
          that.setData({
            allList: that.data.allList, //获取数据数组    
            loadMore: false, //把"上拉加载"的变量设为false，显示  
            DataNull: 1,
            showLoading: 1
          });
          if (res.result.data.length < 10) {
            that.setData({
              loadMore: false, //隐藏加载中。。
              loadAll: true, //所有数据都加载完了
              DataNull: 0,
              showLoading: 1
            });
          }
          that.RightLeftSolution()
        } else {
          if (that.data.leftH == 0 && that.data.rightH == 0) {
            that.setData({
              leftList: [],
              rightList: [],
            })
          } // 修改222
          that.setData({
            loadAll: true, //把“没有数据”设为true，显示  
            loadMore: false, //把"上拉加载"的变量设为false，隐藏  
            DataNull: 0,
            showLoading: 1
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

  formSubmit(e) { // 2.2 添加与存储 (发布点击事件)
    let {
      formTitle,
      formText
    } = e.detail.value;

    if (!formTitle) {
      wx.showToast({
        title: '标题不能为空',
        icon: 'none'
      })
    } else if (!formText) {
      wx.showToast({
        title: '文字不能为空',
        icon: 'none'
      })
    } else if (this.data.photo.length == 0) {
      wx.showToast({
        title: '图片不能为空',
        icon: 'none'
      })
    } else if (!this.data.choosenLabel) {
      wx.showToast({
        title: '标签不能为空',
        icon: 'none'
      })
    } else if (!this.data.nickname && !this.data.iconUrl) {
      wx.showToast({
        title: '小主还没登录哟QwQ',
        icon: 'none'
      })
    } else {
      let add = {
        "Cover": this.data.photo[0],
        "AllPhoto": JSON.parse(JSON.stringify(this.data.photo)),
        "Title": formTitle,
        "Text": formText,
        "CoverHeight": this.data.imageHeight,
        "CoverWidth": this.data.imageWidth,
        "Label": this.data.choosenLabel,
        "Time": new Date().getTime(),
        "nickName": this.data.nickname,
        "School": this.data.school,
        "iconUrl": this.data.iconUrl
      }
      console.log("this.data.nickname-Input", this.data.nickname);
      this.data.allList.push(add);
      let NewData = this.data.allList.length - 1;
      this.CalculateImage();

      // 将本地图片上传到云存储，后续通过fileid进行图片展示
      let that = this;
      (function (NewData) {
        /**
         * 图片上传逻辑
         * 1. 判断条件，是否符合上传条件
         * 2. 自定义函数上传图片到云存储
         * 3. 将所有信息保存到数据库
         */
        wx.showLoading({
          title: '加载中',
          mask: true
        })
        var path = that.data.allList[NewData].AllPhoto
        console.log(path)
        var fileIDs = []
        for (var i = 0; i < path.length; i++) {
          wx.compressImage({
            src: path[i], // 图片路径
            quality: 20, // 压缩质量,
            success(res) {
              console.log(res)
              wx.cloud.uploadFile({
                cloudPath: 'CampusCircle_images/' + new Date().getTime() + Math.floor(Math.random() * 150) + '.png',
                filePath: res.tempFilePath,
              }).then(res => {
                fileIDs.push(res.fileID)
                console.log(fileIDs)
                that.uploadData(NewData, fileIDs)
              })
            }
          })
        }
      })(NewData)

    }
  },

  uploadData(NewData, fileIDs) { // 2.21 将数据上传到数据库 (发布文章)
    var that = this
    if (fileIDs.length == that.data.allList[NewData].AllPhoto.length) {
      console.log("NewData", NewData)
      console.log("that.data.allList[NewData].AllPhoto.length", that.data.allList[NewData].AllPhoto.length)
      console.log("fileIDs-Aft.length", fileIDs.length)
      wx.cloud.callFunction({
        name: 'CampusCircle',
        data: {
          Cover: fileIDs[0],
          AllPhoto: fileIDs,
          Title: that.data.allList[NewData].Title,
          Text: that.data.allList[NewData].Text,
          CoverHeight: that.data.allList[NewData].CoverHeight,
          CoverWidth: that.data.allList[NewData].CoverWidth,
          Label: that.data.allList[NewData].Label,
          Time: that.data.allList[NewData].Time,
          ShowHeight: that.data.allList[NewData].ShowHeight,
          School: that.data.allList[NewData].School,
          nickName: that.data.allList[NewData].nickName,
          username: that.data.username,
          iconUrl: that.data.allList[NewData].iconUrl,
          Star: 0,
          type: 'write'
        },
        success: res => {
          console.log("add", res)
          wx.showToast({
            duration: 4000,
            title: '添加成功'
          })
          that.onLoad()
          that.data.addAft = 1
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
            photo: [],
            Input_Title: "",
            Input_Text: "",
            choosenLabel: " ",
            showModel: !that.data.showModel,
          })
        }
      })
    }
  },

  // 3. 点击事件 
  clickMenu: function (e) { // 3.1 
    var that = this;
    // 获取当前的状态，是否隐藏的值
    var staues = that.data.hideHidden;
    console.log("111", staues);
    // 第几个状态
    that.setData({
      hideHidden: !staues,
    })
  },

  chooseTab: function (e) { // 3.2 “我的发布页面” 标签选择,仅 TabScroll 组件内调用
    let that = this;
    // 获取索引值
    let index = e.currentTarget.dataset.index;
    that.setData({
      choosenLabel: that.data.menu[index],
    })
  },

  search_Input: function (e) { // 3.3 搜索框逻辑
    var that = this
    if (e.detail.value) {
      wx.cloud.callFunction({
        name: "CampusCircle",
        data: {
          username: that.data.username,
          type: "search",
          searchKey: e.detail.value
        },
        success: res => {
          that.data.tabitem.forEach(e => {e.type = 0})
          that.data.tabitem[0].type = 1
          if (res.result.data.length != 0) {
            that.RightLeftSolution(true)
            that.setData({
              allList :res.result.data,
              tabitem: that.data.tabitem,
            });
            that.RightLeftSolution()
          } else {
            wx.showToast({
              icon: "none",
              title: "什么都找不到哟"
            })
            that.RightLeftSolution()
          }
        },
        fail: err => {
          console.error
        }
      })
    } else {
      that.RightLeftSolution(true) //
      for (let j = 0; j < this.data.tabitem.length; j++) {
        if (this.data.tabitem[j].title == this.data.Label) {
          this.data.tabitem[j].type = 1
          this.setData({
            tabitem: this.data.tabitem,
          })
          this.data.tabitem[j].type = 0
          break
        }
      }
    }
  },

  touchStart(e) {              // 滑动事件
    startX = e.touches[0].pageX;     // 获取触摸时的原点
    moveFlag = true;
    // console.log(1);
  },
  touchMove(e) {
    endX = e.touches[0].pageX;       // 获取触摸时的原点
    if(moveFlag) {
      if(endX - startX > 50) {
        moveFlag = false;
        // 激活上一个标签
        let tabItemType = this.data.tabitem.map(item => {
          return item.type
        });
        let index = tabItemType.indexOf(1) - 1;

        if(index < 0) {                        // 处理边界，不得小于0
          index = 0;
          return;
        }
        
        this.selectComponent("#TabScroll").setData({ activeItem: index });
        this.setTab(index);
      }
      if(startX - endX > 50) {
        moveFlag = false;
        // 激活下一个标签
        let tabItemType = this.data.tabitem.map(item => {
          return item.type
        });
        let index = tabItemType.indexOf(1) + 1;

        if(index >= tabItemType.length) {        // 处理边界，不得大于tabitem长度
          index = tabItemType.length - 1;
          return;
        }
        
        this.selectComponent("#TabScroll").setData({ activeItem: index });
        this.setTab(index);
      }
    }
  },
  touchEnd(e) {
    moveFlag = true;
  },
  // 4. 动效
  rotateAni: function (n) { // 4.1 实现image旋转动画，每次旋转 120*n度
    _animation.rotate(120 * (n)).step()
    this.setData({
      animation: _animation.export()
    })
  },
  startAnimationInterval: function () { // 4.2 开始旋转

    let that = this;
    that.rotateAni(++_animationIndex); // 进行一次旋转
    _animationIntervalId = setInterval(function () {
      that.rotateAni(++_animationIndex);
    }, _ANIMATION_TIME); // 每间隔_ANIMATION_TIME进行一次旋转
    console.log("begin旋转")
  },
  stopAnimationInterval: function () { // 4.3 停止旋转
    if (_animationIntervalId > 0) {
      clearInterval(_animationIntervalId);
      _animationIntervalId = 0;
      console.log("stop旋转")
    }
  },

  binderrorimg: function () {
    var errorImg = " "
    errorImg = "./Errimages.png" //我们构建一个对象
    this.setData(errorImg) //修改数据源对应的数据
  },
  /*添加内容图标按钮*/
  add() {
    var showModel = this.data.showModel
    var that = this
    if (showModel) {
      this.setData({
        add_style: "add_hide"
      })
      setTimeout(() => {
        that.setData({
          showModel: !showModel
        })
      }, 200);
    } else {
      this.setData({
        add_style: "add_show",
        showModel: !showModel
      })
    }
  },

  //-----------------------后期优化：两个list合并，用type进行区分(280-285)
  getBackData(e) {
    this.data.directionIndex = e.detail
    console.log("e.detail", e.detail)
  },

  chooseimage: function () {
    var that = this;
    if (that.data.photo.length == 0) {
      wx.chooseImage({
        count: 2,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
        success: (res) => {
          that.data.photo = res.tempFilePaths
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
          that.setData({
            photo: that.data.photo
          })
          wx.getImageInfo({
            src: that.data.photo[0],
            success: function (res) {
              that.data.imageHeight = res.height
              that.data.imageWidth = res.width
            }
          })
        }
      })
    }
  },
  deleteImage: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index; //获取当前长按图片下标
    if (that.data.photo.length != 0) {
      wx.showModal({
        title: '提示',
        content: '确定要删除此图片吗？',
        success: function (res) {
          if (res.confirm) {
            that.data.photo.splice(index, 1)
          }
          that.setData({
            photo: that.data.photo,
            current: 0
          });
          wx.getImageInfo({
            src: that.data.photo[0],
            success: function (res) {
              that.data.imageHeight = res.height
              that.data.imageWidth = res.width
            }
          })
        }
      })
    }
  },
  PreviewImage: function (e) {
    let index = e.currentTarget.dataset.index;
    var imgs = this.data.photo;
    if (imgs.length != 0) {
      wx.previewImage({
        current: imgs[index],
        urls: imgs,
      })
    }
  },

  setTab: function (e) {            // 该函数仅在组件中调用
    if(e.detail) {
      var index = e.detail.currentTarget.dataset.index
    }else {
      var index = e
    }

    this.data.Label = this.data.tabitem[index].title;
    // 初始化 - 全部置零
    this.data.tabitem.forEach(element => {
      element.type = 0
    });
    this.data.tabitem[index].type = 1;
    this.setData({
      tabitem: this.data.tabitem,
    })
    this.RightLeftSolution(true)
    this.getData();
  },

  CalculateImage: function () {
    var that = this;
    var allList = that.data.allList;
    for (let i = 0; i < allList.length; i++) {
      var height = parseInt(Math.round(allList[i].CoverHeight * 370 / allList[i].CoverWidth));
      if (height) {
        var currentItemHeight = parseInt(Math.round(allList[i].CoverHeight * 370 / allList[i].CoverWidth));
        allList[i].ShowHeight = currentItemHeight
        if (currentItemHeight > 500) {
          currentItemHeight = 500
          allList[i].ShowHeight = currentItemHeight
        }
        allList[i].CoverHeight = currentItemHeight + "rpx"; //因为xml文件中直接引用的该值作为高度，所以添加对应单位
      }
    }
  },

  //以本地数据为例，实际开发中数据整理以及加载更多等实现逻辑可根据实际需求进行实现   
  onLoad: function () {
    currentPage = 0
    app.loginState() //判断登录
    this.getNewInfo() // 获取新消息通知
    //加载缓存获得学校和用户名和头像
    this.data.tabitem = args.tabitem ? args.tabitem.map(e => {
      return {
        title: e,
        type: 0
      }
    }) : this.data.tabitem // that.data.tabitem是兜底数据
    // 默认选中第一个 “全部”
    this.data.tabitem[0].type = 1;

    // 封号
    var campus_account = args.campus_account ? args.campus_account : false
    var describe = args.describe ? args.describe : false
    //判断封号
    if (campus_account === true) {
      wx.showModal({
        title: "提示",
        content: describe,
        showCancel: false,
        success(res) {
          if (res.confirm) {
            wx.reLaunch({
              url: '/pages/index/index',
            })
          }
        }
      })
    }

    this.setData({
      school: args.schoolName,
      username: args.username,
      nickname: args.nickName,
      iconUrl: args.iconUrl,
      tabitem: this.data.tabitem,
      campus_account: campus_account,
      describe: describe,
      openusername: {
        username: args.username,
        iconUrl: args.iconUrl,
        nickName: args.nickName
      }
    })
    this.onPullDownRefresh()
  },

  onShow: function () {

    this.data.allList = app.globalData.allList || [];
    this.RightLeftSolution()
    this.getNewInfo()
  },

  onReady: function () {
    _animationIndex = 0;
    _animationIntervalId = -1;
    this.data.animation = '';
  },

  onPullDownRefresh() { // 下拉刷新
    //var showLoading=0 
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.setData({
      showLoading: 0
    })
    currentPage = 0
    this.startAnimationInterval()
    console.log("下拉刷新")
    this.data.addAft = 0
    this.getData()
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  onReachBottom() { // 上拉触底改变状态
    if (!this.data.loadMore) {
      this.setData({
        loadMore: true, // 加载中  
        loadAll: false // 是否加载完所有数据
      });
      wx.showLoading({
        title: '加载更多中',
      })
      this.getNewInfo(); // 上拉刷新，是否有新消息
      this.getData();
      wx.hideLoading();

    }
  },
  onShareAppMessage: function (res) {
    return {
      title: 'WE校园',
    }
  },

})