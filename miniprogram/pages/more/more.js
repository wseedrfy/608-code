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
    tabitem: [ // 标签兜底
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
    allList: [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ], // 列表兜底
    currentTab: 0, // 当前 swiper-item
    // 控制动画
    showLoading: 0, // 动画显隐
    animation: '',

    // 发布
    showPopUps: false, // 弹窗显隐
    showModel: false, // 快速发布显隐
  },
  TimeOut: 1,
  showPopUps() {
    let showPopUps = !this.data.showPopUps;
    this.setData({ showPopUps });
  },
  show_PublishContent(e) {
    this.selectComponent('#PublishContent').add(); // 控制显隐
    this.setData({
      showPopUps: !this.data.showPopUps
    });
  },

  // 获取新消息总数
  getNewInfo() {
    var that = this;
    wx.cloud.database().collection('New-Information').where({
      'be_character.username': args.username,
      status: 0 //-------------------三种状态：“0”：用户还没看消息列表；“1”：用户已经看到了消息列表；“-1”：取消点赞和评论
    }).count().then(res => {
      // console.log("res.total", res.total) 
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
    let current = e.detail.current;
    this.setTab(current);
  },

  // 下面是未来修左右滑动动效用到的代码

  // waterTransition(e) {
  //   // dx 表示左右滑动 : dx < 0 表示滑到上一个标签
  //   const dx = e.detail.dx;
  //   // console.log(e.detail);
  //   const currentTab = this.data.currentTab;
  //   const underLine_left = this.selectComponent("#TabScroll").data.underLine_left;
  //   const underLine_width = this.selectComponent("#TabScroll").data.underLine_width;
  //   // 公式计算：滑动屏幕百分比 * 下一段偏移度
  //   console.log(dx/this.data.windowWidth);
  //   let offset,offset_width;
  //   if(dx/this.data.windowWidth > 0) {
  //     offset = (dx/this.data.windowWidth) * (underLine_left[currentTab+1] - underLine_left[currentTab]) + underLine_left[currentTab];

  //     offset_width = (dx/this.data.windowWidth) * (underLine_width[currentTab+1] - underLine_width[currentTab]) + underLine_width[currentTab];
  //   }else if( dx/this.data.windowWidth < 0) {
  //     offset = (dx/this.data.windowWidth) * (underLine_left[currentTab] - underLine_left[currentTab-1]) + underLine_left[currentTab];

  //     offset_width = (dx/this.data.windowWidth) * (underLine_width[currentTab] - underLine_width[currentTab-1]) + underLine_width[currentTab];
  //   }
  //   this.selectComponent("#TabScroll").setData({offset,offset_width})
  // },
  // waterAnimationFinish(e) {
  //   const {current:currentTab,source} = e.detail;
  //   console.log(e.detail,23333);
  //   this.setTab(currentTab);
  //   console.log(currentTab);
  //   // 更新标签组件里的下划线参数
  //   this.selectComponent("#TabScroll").setData({currentTab,offset:null,offset_width:null})
  // },

  // 2. 操作数据库
  getData(e) { //分页加载数据
    let args = wx.getStorageSync('args');
    let { currentPage, index } = e.detail;
    let ShowId = '全部';
    this.data.tabitem.forEach((item, index) => {
      if (item.type === 1) {
        ShowId = item.title
      }
    })
    console.log(ShowId)
    // 拉取数据
    let that = this;
    wx.cloud.callFunction({
      name: "NewCampusCircle",
      data: {
        type: "read",
        url: "Card",
        username: args.username,
        currentPage: currentPage,
        ShowId: ShowId,
        // 游客模式校园圈初始化
        School: args.schoolName == "游客登录" ? "广东石油化工学院" : args.schoolName
      },
      success(res) {
        const currComponent = that.selectComponent(`#waterFlowCards${index}`);
        // 数据存在时
        if (res.result && res.result.data.length > 0) {
          // 页数++
          currComponent.setData({ currentPage: ++currentPage });
          // 边界条件
          let allList = that.data.allList;
          if (!allList) {
            allList = new Array(that.data.tabitem.length)
          }
          if (!allList[index]) {
            allList[index] = []
          }
          // 添加新数据到 allList[index] 里 
          allList[index] = allList[index].concat(res.result.data);
          // 赋值全局变量
          app.globalData.allList = allList;
          console.log(allList[index], "list");
          that.setData({
            allList
          });
          // 数据少于一页时
          if (res.result.data.length < 10) {
            currComponent.setData({
              loadAll: true
            });
          }
          // 新数据进行左右处理
          currComponent.RightLeftSolution()
        } else { // 不存在数据时
          if (currComponent.data.leftH == 0 && currComponent.data.rightH == 0) {
            currComponent.setData({
              leftList: [],
              rightList: [],
            })
          }
          currComponent.setData({
            loadAll: true
          });
        }
      },
      fail(res) {
        console.log("请求失败", res)
      }
    })
  },

  // 3. 搜索框逻辑 
  search_Input: function (e) {
    var that = this;
    const waterComponent = that.selectComponent(`#waterFlowCards0`);
    let args = wx.getStorageSync('args');
    if (e.detail.value) {
      wx.cloud.callFunction({
        name: "NewCampusCircle",
        data: {
          url: "Card",
          username: args.username,
          type: "search",
          searchKey: e.detail.value
        },
        success: res => {
          // 回到“全部”标签
          that.setTab(0);
          // 搜索有结果时
          if (res.result.data.length != 0) {
            // 清空瀑布流数据
            waterComponent.RightLeftSolution(true);
            // 处理搜索结果
            let allList = that.data.allList;
            allList[0] = res.result.data;
            that.setData({
              allList,
              tabitem: that.data.tabitem,
            });
            waterComponent.RightLeftSolution()
          } else {
            wx.showToast({
              icon: "none",
              title: "什么都找不到哟"
            })
            waterComponent.RightLeftSolution()
          }
        },
        fail: err => {
          console.error
        }
      })
    } else { // 搜索框内容为空时
      // 清空瀑布流内容
      waterComponent.RightLeftSolution(true);
      // 重新加载数据
      that.onPullDownRefresh();
    }
  },

  // 4. 动效
  rotateAni: function (n) { // 实现image旋转动画，每次旋转 120*n度         
    _animation.rotate(120 * (n)).step()
    this.setData({
      animation: _animation.export()
    })
  },
  // 开始旋转
  startAnimationInterval: function () {
    let that = this;
    that.rotateAni(++_animationIndex); // 进行一次旋转

    _animationIntervalId = setInterval(function () {
      that.rotateAni(++_animationIndex);
    }, _ANIMATION_TIME); // 每间隔_ANIMATION_TIME进行一次旋转
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
      var currentTab = e.detail.currentTarget.dataset.index
    } else {    // 左右滑动时，传入 index
      var currentTab = e
    }
    // 初始化 - 全部置零
    this.data.tabitem.forEach((item, i) => {
      item.type = 0;
      if (i == index) {
        item.type = 1;
      }
    });
    this.setData({
      tabitem: this.data.tabitem,
      currentTab
    })
    this.selectComponent(`#TabScroll`).setData({ currentTab });
    // 新页面获取数据 - 没有东西时才获取数据
    if (app.globalData.allList[currentTab]) {
      return;
    } else {
      this.selectComponent(`#waterFlowCards${currentTab}`).getData();
    }
  },
  //以本地数据为例，实际开发中数据整理以及加载更多等实现逻辑可根据实际需求进行实现   
  onLoad: function () {
    // 判断登录
    app.loginState();
    // 初始化标签
    this.data.tabitem = args.tabitem ? args.tabitem.map((e, index) => {
      // 默认选中第一个 “全部”
      if (index == 0) {
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
    // 判断封号
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
    // 初始化 allList
    let allList = app.globalData.allList || this.data.tabitem.map((item, index) => {
      let allList = [];
      return allList[index] = []
    });
    console.log(allList);
    this.setData({
      showPopUps: false,
      tabitem: this.data.tabitem,
      campus_account: campus_account,
      allList
    })
    this.onPullDownRefresh()
  },
  onShow: function () {

    let currentTab = this.data.currentTab;
    let windowWidth = wx.getWindowInfo().windowWidth;
    this.setData({
      windowWidth,
      tabitem: this.data.tabitem,
    })
    this.selectComponent(`#waterFlowCards${currentTab}`).RightLeftSolution();
    this.getNewInfo();
  },
  onReady: function () {
    _animationIndex = 0;
    _animationIntervalId = -1;
    this.data.animation = '';
  },

  // 下拉刷新
  onPullDownRefresh() {
    // 在标题栏中显示加载
    wx.showNavigationBarLoading();
    clearTimeout(this.TimeOut);
    // 将
    let allList = new Array(this.data.tabitem.length)
    this.setData({
      showLoading: 0,
      allList
    })
    // 重置组件内的 currentPage 和 loadAll
    let currentTab = this.data.currentTab;
    this.selectComponent(`#waterFlowCards${currentTab}`).setData({ currentPage: 0 });
    this.selectComponent(`#waterFlowCards${currentTab}`).setData({ loadAll: false });
    // 加载动画
    this.startAnimationInterval();

    this.TimeOut = setTimeout(() => {
      console.log("下拉刷新")
      this.selectComponent(`#waterFlowCards${currentTab}`).RightLeftSolution(true)
      this.selectComponent(`#waterFlowCards${currentTab}`).getData()

      wx.hideNavigationBarLoading() // 完成停止加载
      this.setData({ // 隐藏转圈圈
        showLoading: 1
      })
      wx.stopPullDownRefresh() // 停止下拉刷新
    }, 1000)

  },

  // 上拉触底改变状态
  onReachBottom() {
    console.log(123);
    wx.showLoading({
      title: '加载更多中',
      mask: true
    })
    // 得到当前组件索引
    let currentTab = this.data.currentTab;
    this.selectComponent(`#waterFlowCards${currentTab}`).getData();
    wx.hideLoading();
  },

  onShareAppMessage: function (res) {
    return {
      title: 'WE校园',
    }
  },
})