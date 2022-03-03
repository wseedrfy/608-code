// pages/more/pages/Match/Match.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: {
      AllPhoto: [
        "cloud://cloud1-6gtqj1v4873bad50.636c-cloud1-6gtqj1v4873bad50-1307814679/association/1645710800239.jpg"
      ],
      Cover: "cloud://cloud1-6gtqj1v4873bad50.636c-cloud1-6gtqj1v4873bad50-1307814679/association/1645710800239.jpg",
      CoverHeight: "1792rpx",
      CoverWidth: 828,
      Label: "社团招新",
      School: "广东石油化工学院",
      ShowHeight: 1792,
      Title: "xxx招新啦",
      association: [
        {
          detial: "biubb创业实践社",
          name: "社团/机构"
        },
        {
          detial: "15916513671",
          name: "联系方式"
        },
        {
          detial: "张三",
          name: "联系人"
        },
        {
          detial: "20114340331",
          name: "学号"
        },
      ],
      endTime: "2022-05-07",
      assoMess:{
        "association":"biubb创业实践社",
        "card":"20114340331",
        "name":"张三",
        "phone":"19928272811"
      },
      question: [
        {
          "arr":['一','二','三','四'],
          "arrLen":"2",
          "id":"1",
          "title":"今天星期几",
          "type":"单选"
        },
        {
          "arr":['一','二'],
          "arrLen":"2",
          "id":"2",
          "title":"明天呢",
          "type":"单选"
        },
        {
          "arr":['男','女','中','大'],
          "arrLen":"4",
          "id":"3",
          "title":"性别",
          "type":"多选"
        },
        {
          "arr":[],
          "arrLen":"1",
          "id":"4",
          "title":"是否愿意值班",
          "type":"填空"
        }
      ]
    },
    showModalStatus: false,
    formMess: [
      {
        title: "姓名",
        placeholder: "输入姓名",
        name: "name"
      },
      {
        title: "学号",
        placeholder: "输入学号",
        name: "count"
      },
      {
        title: "性别",
        placeholder: "输入有效性别",
        name: "sex"
      },
      {
        title: "班级",
        placeholder: "如:生工20-3",
        name: "class"
      },
      {
        title: "校区",
        placeholder: "如无分校则不填",
        name: "campus"
      },
    ],
    items:[
      '一','二','三','四'
    ],
    html:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 弹窗
  //点击我显示底部弹出框
  clickme: function () {
    this.showModal();
  },

  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  // 提交表单
  submitMess(e) {
    // 效验信息-->保存信息
    let data = e.detail.value
    if (!data.class || !data.count || !data.name || !data.sex) {
      wx.showToast({
        title: '请检查信息完整',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result) => {

        },
      });
    }
    else {
      wx.showLoading({
        title: "加载中",
        mask: true,
        success: (result) => {
          this.hideModal()
          this.setData({
            userMess: data,
            html:0
          })
          wx.hideLoading();
        },
      });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})