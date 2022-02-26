let args = wx.getStorageSync('args')
var app = getApp()

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
    // 配置
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    rectHeight: getApp().globalData.rectHeight,
    windowHeight: getApp().globalData.windowHeight,
    windowWidth: 0,
    
    tabitem: [        // 标签兜底
      {
        title: "全部",
        type: 0,
      }, {
        title: "日常",
        type: 0,
      }, {
        title: "晒出课表🤣",
        type: 0,
      }, {
        title: "树洞👂",
        type: 0,
      }, {
        title: "2022新年Flag🚩",
        type: 0,
      }, {
        title: "2021回顾◀",
        type: 0,
      }, {
        title: "三行情书❤️",
        type: 0,
      }, {
        title: "故事屋⭐️",
        type: 0,
      }
    ],
    allList: [ [],[],[],[],[],[],[],[] ],      // 列表兜底
    activeItem: 0,       // 当前 swiper-item
    // 控制动画
    showLoading: 0,   // 动画显隐
    animation: '',
    // 封号
    campus_account: false, // 封号状态
    describe: "",          // 封号简介
    content: {},           // 个人信息
    openusername: {},      // 点赞人的对象
    // 发布
    showPopUps: false,   // 弹窗显隐
    showModel: false,    // 快速发布显隐
  },
  TimeOut: 1,
  showPopUps(){
    this.setData({ showPopUps: !this.data.showPopUps });
    // console.log(this.data.showPopUps);
  },
  show_PublishContent(e){
    this.selectComponent('#PublishContent').add();    // 控制显隐
    this.setData({ showPopUps: !this.data.showPopUps });
  },
  

  // 获取新消息总数
  getNewInfo() {
    var that = this;

    wx.cloud.database().collection('New-Information').where({ //------------请求数据库
      be_character_username: args.username, //------------------被评论者学号
      status: 0 //-------------------三种状态：“0”：用户还没看消息列表；“1”：用户已经看到了消息列表；“-1”：取消点赞和评论
    }).count().then(res => {
      // console.log("res.total", res.total) //----------------新消息提示数目
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
  waterChange(e) {
    
  },
  waterTransition(e) {
    // dx 表示左右滑动 : dx < 0 表示滑到上一个标签
    const dx = e.detail.dx;
    // console.log(e.detail);
    const activeItem = this.data.activeItem;
    const underLine_left = this.selectComponent("#TabScroll").data.underLine_left;
    const underLine_width = this.selectComponent("#TabScroll").data.underLine_width;
    // 公式计算：滑动屏幕百分比 * 下一段偏移度
    console.log(dx/this.data.windowWidth);
    let offset,offset_width;
    if(dx/this.data.windowWidth > 0) {
      offset = (dx/this.data.windowWidth) * (underLine_left[activeItem+1] - underLine_left[activeItem]) + underLine_left[activeItem];

      offset_width = (dx/this.data.windowWidth) * (underLine_width[activeItem+1] - underLine_width[activeItem]) + underLine_width[activeItem];
    }else if( dx/this.data.windowWidth < 0) {
      offset = (dx/this.data.windowWidth) * (underLine_left[activeItem] - underLine_left[activeItem-1]) + underLine_left[activeItem];

      offset_width = (dx/this.data.windowWidth) * (underLine_width[activeItem] - underLine_width[activeItem-1]) + underLine_width[activeItem];
    }
    this.selectComponent("#TabScroll").setData({offset,offset_width})
  },
  waterAnimationFinish(e) {
    const {current:activeItem,source} = e.detail;
    console.log(e.detail,23333);
    this.setTab(activeItem);
    console.log(activeItem);
    // 更新标签组件里的下划线参数
    this.selectComponent("#TabScroll").setData({activeItem,offset:null,offset_width:null})
  },

  // 2. 操作数据库
  getData(e) {             //分页加载数据
    let that = this;
    let args = wx.getStorageSync('args');

    let {detail:{currentPage, index} } = e;      // 解构赋值
    console.log(currentPage, index);
    let ShowId = this.data.tabitem.filter(item => {
      if(item.type == 1) {
        return item.title
      }
    })[0].title
    // 拉取数据
    wx.cloud.callFunction({
      name: "CampusCircle",
      data: {
        type: "read",
        username: args.username,
        currentPage: currentPage,
        ShowId: ShowId,
        //游客模式校园圈初始化
        School: that.data.school == "游客登录" ? "广东石油化工学院" : that.data.school
      },
      success(res) {
        const currComponent = that.selectComponent(`#waterFlowCards${index}`);
        // 存在数据时
        if (res.result && res.result.data.length > 0) {
          // 页数++
          currComponent.setData({ currentPage: ++currentPage});
          // 添加新数据到 allList[index] 里  
          let allList = that.data.allList;
          allList[index] = allList[index].concat(res.result.data);
          that.setData({ allList });
          // 数据少于一页时
          if (res.result.data.length < 10) {
            currComponent.setData({ loadAll: true });
          }
          // 新数据进行左右处理
          currComponent.RightLeftSolution()
        } else {    // 不存在数据时
          if (currComponent.data.leftH == 0 && currComponent.data.rightH == 0) {
            currComponent.setData({
              leftList: [],
              rightList: [],
            })
          }
          currComponent.setData({ loadAll: true });
        }
      },
      fail(res) {
        console.log("请求失败", res)
      }
    })
  },

  // 3. 点击事件 
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
          that.data.tabitem.forEach(e => {
            e.type = 0
          })
          that.data.tabitem[0].type = 1
          if (res.result.data.length != 0) {
            that.RightLeftSolution(true)
            that.setData({
              allList: res.result.data,
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

  // 4. 动效
  rotateAni: function (n) {    // 实现image旋转动画，每次旋转 120*n度         
    _animation.rotate(120 * (n)).step()
    this.setData({
      animation: _animation.export()
    })
  },
  // 开始旋转
  startAnimationInterval: function () { 
    let that = this;
    that.rotateAni(++_animationIndex);  // 进行一次旋转

    _animationIntervalId = setInterval(function () {
      that.rotateAni(++_animationIndex);
    }, _ANIMATION_TIME);                // 每间隔_ANIMATION_TIME进行一次旋转
    console.log("begin旋转")
  },
  // 停止旋转
  stopAnimationInterval: function () { 
    if (_animationIntervalId > 0) {
      clearInterval(_animationIntervalId);
      _animationIntervalId = 0;
      console.log("stop旋转")
    }
  },

  binderrorimg: function () {
    var errorImg = " "
    errorImg = "./images/Errimages.png" //我们构建一个对象
    this.setData(errorImg) //修改数据源对应的数据
  },
  
  // 选择标签
  setTab: function (e) { // 该函数仅在组件中调用
    // 获取索引值
    if (e.detail) {
      var index = e.detail.currentTarget.dataset.index
    } else {    // 左右滑动时，传入 index
      var index = e
    }
    console.log(index);
    this.data.Label = this.data.tabitem[index].title;
    // 初始化 - 全部置零
    this.data.tabitem.forEach((item,i) => {
      item.type = 0;
      if(i == index) {
        item.type = 1;
      }
    });
    this.setData({
      tabitem: this.data.tabitem,
    })
    this.selectComponent(`#waterFlowCards${index}`).getData();
    this.setData({ activeItem:index })
  },
  // 获取当前标签的索引值
  getIndex() { 
    let index = 0;
    for(let i = 0; i < this.data.tabitem.length; i++) {
      if(this.data.tabitem[i].type == 1) {
        index = i;
        break;
      }
    }
    return index
  },
  //以本地数据为例，实际开发中数据整理以及加载更多等实现逻辑可根据实际需求进行实现   
  onLoad: function () {
    // 判断登录
    app.loginState();  
    // 初始化标签
    this.data.tabitem = args.tabitem ? args.tabitem.map((e,index) => { 
      // 默认选中第一个 “全部”
      if(index == 0) {
        return {
          title: e,
          type: 1
        }
      }

      return {
        title: e,
        type: 0
      }
    }) : this.data.tabitem; // 兜底数据
    // 封号
    var campus_account = args.campus_account ? args.campus_account : false
    var describe = args.describe ? args.describe : false

    if (campus_account === true) { // 判断封号
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
      showPopUps: false,
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
    let windowWidth = wx.getWindowInfo().windowWidth;
    
    // 初始化 allList
    this.data.allList = app.globalData.allList || this.data.tabitem.map((item,index) => {
      let allList = [];
      return allList[index] = []
    });
    // 初始化index
    let index = this.getIndex();

    this.setData({
      windowWidth,
      school: args.schoolName,
      username: args.username,
      nickname: args.nickName,
      iconUrl: args.iconUrl,
      tabitem: this.data.tabitem,
      openusername: {
        username: args.username,
        iconUrl: args.iconUrl,
        nickName: args.nickName
      }
    })
    this.selectComponent("#waterFlowCards" + index).RightLeftSolution();
    this.getNewInfo();
  },
  onReady: function () {
    _animationIndex = 0;
    _animationIntervalId = -1;
    this.data.animation = '';
  },

  // 下拉刷新
  onPullDownRefresh() { 
    clearTimeout(this.TimeOut);
    wx.showNavigationBarLoading() // 在标题栏中显示加载

    this.setData({
      showLoading: 0
    })
    // 重置组件内的 currentPage
    let index = this.getIndex();
    this.selectComponent("#waterFlowCards" + index).setData({currentPage: 0});

    // 加载动画
    this.startAnimationInterval();

    this.TimeOut = setTimeout(()=>{
      console.log("下拉刷新")
      this.selectComponent("#waterFlowCards" + index).RightLeftSolution(true)
      this.selectComponent("#waterFlowCards" + index).getData()
      
      wx.hideNavigationBarLoading() // 完成停止加载
      this.setData({                // 隐藏转圈圈
        showLoading: 1
      })
      wx.stopPullDownRefresh()      // 停止下拉刷新
    }, 1000)
   
  },

  // 上拉触底改变状态
  onReachBottom() { 
    wx.showLoading({
      title: '加载更多中',
    })
    // 得到当前组件索引
    let index = this.getIndex();
    this.selectComponent("#waterFlowCards" + index).getData();
    wx.hideLoading();
  },

  onShareAppMessage: function (res) {
    return {
      title: 'WE校园',
    }
  },
})