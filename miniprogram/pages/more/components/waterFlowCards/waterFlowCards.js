
Component({
    /**
     * 组件的属性列表
     */
    properties: {
      openusername: {
        type: Object,
        value: {}
      },
      // 用于滑动逻辑
      tabitem: {
        type: Array,
        value: []
      },
      allList: {
        type: Array,
      }
    },

  /**
   * 组件的初始数据
   */
  data: {
    // 控制标签切换,翻页
    startX:0,
    endX: 0,
    moveFlag:true,

    currentPage: 0,   // 当前第几页,0代表第一页 
    loadAll: false,   // 状态标志 - 是否加载完所有内容
    Label: '全部',    // 当前标签

    leftList: [],     // 左列表
    rightList: [],    // 右列表
    leftH: 0,         // 当前左列表高度
    rightH: 0,        // 当前右列表高度

    

  },
  lifetimes: {
    ready: function() {
      console.log(this.properties.allList);
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    touchStart(e) {              // 滑动事件
        this.data.startX = e.touches[0].pageX;     // 获取触摸时的原点
        this.data.moveFlag = true;
      },
    touchMove(e) {
        this.data.endX = e.touches[0].pageX;       // 获取触摸时的原点
        if(this.data.moveFlag) {
          
          if(this.data.endX - this.data.startX > 50) {
            this.data.moveFlag = false;
            // 激活上一个标签
            let that = this;
            (function() {
              let tabItemType = that.properties.tabitem.map(item => {
                return item.type
              });
              let index = tabItemType.indexOf(1) - 1;
              // 处理边界，不得小于0
              if(index < 0) {                        
                index = 0;
                return;
              }
              // 更新数据
              // that.selectComponent("#TabScroll").setData({ activeItem: index });        // 下划线动效需要
            //   that.setTab(index);                                               // 请求得到数据，更新 leftList/ rightList再丢入瀑布流
            })()
          }
          if(this.data.startX - this.data.endX > 50) {
            this.data.moveFlag = false;
            // 激活下一个标签
            let that = this;
            (function() {
              let tabItemType = that.properties.tabitem.map(item => {
                return item.type
              });
              let index = tabItemType.indexOf(1) + 1;
              // 处理边界，不得大于tabitem长度
              if(index >= tabItemType.length) {        
                index = tabItemType.length - 1;
                return;
              }
              // 更新数据
            //   that.selectComponent("#TabScroll").setData({ activeItem: index });
            //   that.setTab(index);
            })()
          }
        }
      },
    touchEnd(e) {
        this.data.moveFlag = true;
    },

    // 2. 操作数据库
    getData() {             //分页加载数据
      let that = this;
      let args = wx.getStorageSync('args');
      //云数据的请求
      wx.cloud.callFunction({
        name: "CampusCircle",
        data: {
          type: "read",
          username: args.username,
          currentPage: that.data.currentPage,
          ShowId: that.data.Label,
          //游客模式校园圈初始化
          School: that.data.school == "游客登录" ? "广东石油化工学院" : that.data.school
        },
        success(res) {
          console.log(res)
          console.log(111)

          if (res.result && res.result.data.length > 0) {
            this.data.currentPage++;

            // 把新请求到的数据添加到allList里  
            let allList = that.properties.allList.concat(res.result.data);
            that.setData({ allList });
            // 数据少于一页
            if (res.result.data.length < 10) {
              that.setData({ loadAll: true });
            }

            that.RightLeftSolution()
          } else {
            if (that.data.leftH == 0 && that.data.rightH == 0) {
              that.setData({
                leftList: [],
                rightList: [],
              })
            } // 修改222
            that.setData({ loadAll: true });
          }
        },
        fail(res) {
          console.log("请求失败", res)
        }
      })
    },

    //处理左右结构
    RightLeftSolution(empty = false) {
      if (empty) {
        this.data.currentPage = 0;
        this.setData({
          leftList: [],
          rightList: [],
          leftH: 0,
          rightH: 0,
          allList: [],
          addAft: 0
        })
        return
      }
      var that = this;
      var allList = this.data.allList;
      getApp().globalData.allList = allList;

      for (let i = 0; i < allList.length; i++) {
        // 边界判断: 如果该数据已存在，则continue
        if (that.data.leftList || that.data.rightList) {
          let leftListID = that.data.leftList.map(item => {
            return item._id
          })
          let rightListID = that.data.rightList.map(item => {
            return item._id
          })

          if (leftListID.includes(allList[i]._id) || rightListID.includes(allList[i]._id)) {
            continue
          }
        }

        if (that.data.leftList.includes(allList[i]) || that.data.rightList.includes(allList[i])) {
          console.log("continue");
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

      // console.log(that.data.leftList,that.data.rightList);
    },
  }
})
