Page({
  data: {
      ismanage: false, //判别状态
      manage_text: "管理",

      before_IconList: [], //点击取消，还原之前的首页按钮数组
      before_other_iconList: [], //点击取消，还原之前的其余按钮数组
      iconList: [], //首页按钮
      other_iconList: [], //其余按钮
      inform: [],
  },

  //界面初始，读取首页按钮缓存、其余按钮缓存
  onShow: function (options) {
      //从缓存中或取iconList
      var that = this
      var other_btn = wx.getStorageSync('other_btn')
      that.setData({
        other_iconList: other_btn.other_iconList,
        iconList: other_btn.iconList
    })
  },

  //管理按钮，turn时触发移除、增加按钮；false时禁用
  Manage: function () {

      let init_other_iconList = JSON.parse(JSON.stringify(this.data.other_iconList))
      let init_iconList = JSON.parse(JSON.stringify(this.data.iconList))
      if (this.data.ismanage) {
          //
          // console.log('取消');
          this.setData({
              ismanage: false,
              manage_text: "管理",
              iconList: this.data._iconList,
              // iconList: this.data.before_IconList,
              other_iconList: this.data._other_iconList
              // iconList:init_iconList,
              // other_iconList:init_other_iconList
          })
      } else {
          this.setData({
              ismanage: true,
              manage_text: "取消",
              _iconList: init_iconList,
              _other_iconList: init_other_iconList
              // before_IconList: this.data.IconList,
              // iconList:init_iconList,
              // other_iconList:init_other_iconList
              // before_IconList: ,

              // before_other_iconList: this.data.other_iconList
          })
      }
  },

  //需求将obj这个对象拷贝出一个新对象修改新对象的值不会影响原对象的值
  //定义一个函数


  //移除按钮，把首页按键移除到其余按键
  remove_click: function (e) {
      var id = e.currentTarget.id
      var arr = JSON.parse(JSON.stringify(this.data.iconList)) //上图标
      var other_arr = JSON.parse(JSON.stringify(this.data.other_iconList)) //下图标
      // console.log(arr,other_arr);

      other_arr.push(arr[id])
      arr.splice(id, 1)
      // console.log(arr);

      this.setData({
          other_iconList: other_arr,
          iconList: arr
      })
      console.log(other_arr)
      console.log(arr)
  },

  //增加按钮,把其余按键添加到首页按键
  add_click: function (e) {
      var id = e.currentTarget.id
      var arr = JSON.parse(JSON.stringify(this.data.iconList))
      var other_arr = JSON.parse(JSON.stringify(this.data.other_iconList))

      arr.push(other_arr[id])
      other_arr.splice(id, 1)
    
      arr.forEach((e, index) => 
      {
          if(e.name === '更多'){
            arr[index] = arr.splice(arr.length - 1, 1, arr[index])[0];
          }
    
      })

      this.setData({
          other_iconList: other_arr,
          iconList: arr
      })
      console.log(other_arr)
      console.log(arr)
  },

  //保存排序，回到初始状态
  save: function () {
      var that = this
      //console.log(that.data.iconList)
      let bb = {
          other_iconList: that.data.other_iconList,
          iconList: that.data.iconList,
      }
      wx.setStorageSync('other_btn', bb)
      //回到初始状态
      that.setData({
          ismanage: false,
          manage_text: "管理"
      })
  }
})