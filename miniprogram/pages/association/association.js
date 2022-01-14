// pages/association/association.js
let school = ''
let db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        title: "联系人",
        placeholder: "负责人姓名",
        type: "text",
        value: "",
        id: "name",
      },
      {
        title: "联系方式",
        placeholder: "电话号码",
        type: "number",
        value: "",
        id: "phone"
      },
      {
        title: "社团/机构",
        placeholder: "输入名称",
        type: "text",
        value: "",
        id: "association"
      },
      {
        title: "学号",
        placeholder: "输入学号",
        type: "number",
        value: "",
        id: "card"
      },
    ],
    HtmlStatus: 0,//0为申请 1审核中 2审核通过
    assoMess: "",
    showModalStatus:false,
    photoStatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let res = wx.getStorageSync('args');
    let list = this.data.list
    let card = res.username
    school = res.school
    list[3].value = card
    this.setData({
      list: list
    })
    this.search(card)
  },
  // 查询用户状态
  search(card) {
    console.log(card);
    db.collection("associationApply").where({ count: card }).get().then(res => {
      console.log(res);
      if (res.data.length == 0) {
        this.setData({
          HtmlStatus: 0
        })
      }
      else {
        if (res.data[0].status == false) {
          this.setData({
            HtmlStatus: 1
          })
        }
        else {
          // 社团操作，发布
          let assoMess = [
            {
              name: "社团/机构",
              detail: res.data[0].hostMess.association
            },
            {
              name: "联系方式",
              detail: res.data[0].hostMess.phone
            },
            {
              name: "联系人",
              detail: res.data[0].hostMess.name
            },
            {
              name: "学号",
              detail: res.data[0].hostMess.card
            },
          ]
          this.setData({
            HtmlStatus: 2,
            assoMess: assoMess
          })
        }
      }
    })
  },
  formSubmit(e) {
    let data = e.detail.value
    if (data.association == "" || data.card == "" || data.name == "" || data.phone == "") {
      wx.showModal({
        title: '提示',
        content: '请输入完整信息',
        showCancel: false,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {
          }
        },
      });
    }
    else {
      wx.showModal({
        title: '提示',
        content: '确认提交',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {
            wx.showLoading({
              title: "提交中",
              mask: true,
              success: (result) => {
                db.collection("associationApply").add({
                  data: {
                    status: false,
                    hostMess: data,
                    count: Number(data.card)
                  }
                }).then(res => {
                  this.setData({
                    HtmlStatus:1
                  })
                  wx.hideLoading();
                })
              },
            });
          }
        },
      });
    }
  },
  // 发布信息弹窗
  clickme() {
    this.showModal();
  },
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
  // 选择图片
  add_img(){
    wx.chooseImage({
      count: 2,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: (res)=>{
        this.setData({
          photo:res.tempFilePaths,
          photoStatus:true
        })
      },
    });
  },
  // 发布
  confirm(e){
    console.log(e);
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