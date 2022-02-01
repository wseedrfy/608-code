Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  data: {
    slideShow: 'false',
    slideWidth: '', //滑块宽
    slideLeft: 0, //滑块位置
  },
  properties: {
    iconList: {
      type: Array,
      value: []
    }
  },
  lifetimes: {

    ready: function() {
      this.setStorageData(this.data.iconList)

      // 在组件实例进入页面节点树时执行
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  methods: {
    setStorageData: function (iconList1) {

        var lll = iconList1
        var iconList = []
        var aa = []

        if (lll.length <= 8) {
          for (let i = 0; i < lll.length; i++)
            aa.push(lll[i])

          iconList.push(aa)
        } else {
          for (let i = 0; i < lll.length; i++) {
            aa.push(lll[i])
            // 前八个一组，后面所有为一组
            if (i == 7 || i == lll.length - 1) {
              iconList.push(aa)
              aa = []
            }
          }
        }

        this.setData({
          iconList: iconList, // indexData.iconList,
        });
        // 初始化scroll-view
        this.getRatio();
      

    },
    // 计算 scroll-view 滚条参数及滑动比例
    getRatio() {

      var self = this;
      if (self.data.iconList.length <= 1) {
        this.setData({
          slideShow: false
        })
      } else {
        // 与index.css中 .slide-bar{width}对应
        const barWidth = 90; // 固定长度是90rpx
        const iconWidth = 182.5; // 一个图标的宽度为182.5rpx

        var _totalIcon = Math.ceil(self.data.iconList[1].length / 2) + 4 // 总的横向个数
        var onelength = barWidth / _totalIcon // 一个图标 所占滚条的宽度
        var _showLength = barWidth - onelength * (_totalIcon - 4) // 红色滑条的长度(保留两位小数)

        // 一个图标 实际宽度:滚条所占宽度 （后面转化单位 px → rpx ）
        var _ratio = onelength / iconWidth * (750 / this.data.windowWidth)

        this.setData({
          slideWidth: _showLength,
          slidable: barWidth - _showLength, // barWidth / 2 - onelength,
          slideShow: true,
          slideRatio: _ratio
        })
      }
    },
    // 刷新滚条位置
    getleft(e) {
  
      // console.log(l, (e.detail.scrollLeft * this.data.slideRatio).toFixed(2), l * this.data.slideRatio)
      this.setData({
        slideLeft: (e.detail.scrollLeft * this.data.slideRatio).toFixed(2)
      })
    },
  }
})