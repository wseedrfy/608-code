// components/waterFlowCards/waterFlowCards.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        leftList: {
            type: Array,
            value: []
        },
        rightList: {
            type: Array,
            value: []
        },
        openusername: {
            type: Object,
            value: {}
        },
        // 用于滑动逻辑
        tabitem: {
            type: Array,
            value: []
        },
        // 判断是否有数据 - 进行边界处理
        DataNull: {
            type: Number,
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        // 控制标签切换,翻页
        startX:'',
        endX:'',
        moveFlag:true
    },
    lifetimes: {
        ready: function() {
            // console.log(this.properties.leftList,this.properties.rightList);
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
                //   that.selectComponent("#TabScroll").setData({ activeItem: index });        // 下划线动效需要
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
    }
})
