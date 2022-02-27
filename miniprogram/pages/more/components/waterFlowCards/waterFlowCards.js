
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
      // 当前组件需渲染的数据
      list: {             
        type: Array,
        value: []
      },
      // 当前组件的下标
      index: {            
        type: Number
      }
    },

  /**
   * 组件的初始数据
   */
  data: {
    windowHeight: getApp().globalData.windowHeight,
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
      // console.log(this.properties.list);
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
    testFnc(){
      console.log("eeeee");
      this.triggerEvent("testFnc")
    },
    onPullDownRefresh() {
      this.triggerEvent("onPullDownRefresh")
    },
    getData() {
      let e = {
        currentPage:this.data.currentPage,  // 本组件当前第几页
        index: this.properties.index        // 本组件索引 - 方便标签选择
      }
      this.triggerEvent("getData",e);
      console.log("getData");
    },
    //处理左右结构
    RightLeftSolution(empty = false) {
      if (empty) {
        this.setData({
          currentPage: 0,
          leftList: [],
          rightList: [],
          leftH: 0,
          rightH: 0,
          list: [],
        })
        return
      }

      let index = this.properties.index;
      let list = this.data.list;
      // console.log(list,"丢入瀑布流的数据");
      
      let allList = new Array(this.properties.tabitem.length);
      // console.log(allList);
      if(getApp().globalData.allList) {
        getApp().globalData.allList[index] = list;
      }else {
        getApp().globalData.allList = allList
      }
      // console.log(getApp().globalData.allList,"globalData的allList");
 

      for (let i = 0; i < list.length; i++) {
        // 边界判断: 如果该数据已存在，则continue
        if (this.data.leftList || this.data.rightList) {
          let leftListID = this.data.leftList.map(item => {
            return item._id
          })
          let rightListID = this.data.rightList.map(item => {
            return item._id
          })

          if (leftListID.includes(list[i]._id) || rightListID.includes(list[i]._id)) {
            continue
          }
        }

        if (this.data.leftList.includes(list[i]) || this.data.rightList.includes(list[i])) {
          console.log("continue");
          continue
        }

        //判断左右两侧当前的累计高度，来确定item应该放置在左边还是右边
        if (this.data.leftH <= this.data.rightH) { 
          this.data.leftList.push(list[i]);
          this.data.leftH += list[i].ShowHeight;
        } else {
          this.data.rightList.push(list[i]);
          this.data.rightH += list[i].ShowHeight;
        }
      }
      this.setData({
        leftList: this.data.leftList,
        rightList: this.data.rightList,
      })
      // console.log(this.data.leftList,this.data.rightList,"左右列表");
    },
  }
})
