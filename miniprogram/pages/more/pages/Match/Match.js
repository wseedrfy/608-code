// pages/more/pages/Match/Match.js
let count = ''
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    html: 1,
    content: {},
    matchStatus: false,//false不能参与  true能参与
    time:Date.now()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let jsonStr = decodeURIComponent(options.content)
    var content = JSON.parse(jsonStr) // 将JSON帖子信息转成对象
    this.setData({ content })
    let args = wx.getStorageSync('args');
    count = args.username
    // 比赛状态
    this.judgeMatch(count, content._id)
    //查询点击状态
    wx.cloud.callFunction({
      name: "associationSend",
      data: {
        type: 4,
        username: count,
        _id: content._id
      }
    }).then(res => {
      // console.log(res);
    })
  },
  // 验证是否已经参三
  judgeMatch(count, _id) {
    db.collection("assoMatchPush").where({ match_id: _id, pusherCount: count }).get().then(res => {
      if (res.data.length == 0) {
        this.setData({ matchStatus: true })
      }
      else {
        this.setData({ matchStatus: false })
      }
    })
  },
  // 已参与
  matched() {
    wx.showToast({
      title: '您已参与',
      icon: 'none',
      image: '',
      duration: 1500,
      mask: false,
      success: (result) => {

      },
    });
  },
  // 弹窗
  //点击我显示底部弹出框
  clickme: function () {
    this.showModal();
  },
  // 已截止
  timeOut(){
    wx.showToast({
      title: '已截止',
      icon: 'none',
      image: '',
      duration: 1500,
      mask: false,
      success: (result)=>{
        
      },
    });
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
            html: 0
          })
          wx.hideLoading();
        },
      });
    }
  },
  // 提交答案
  subMatch(e) {
    let matchDetail = e.detail.value
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
              wx.cloud.callFunction({
                name: "associationSend",
                data: {
                  type: 5,
                  userMess: this.data.userMess,
                  matchDetail: matchDetail,
                  assoName: this.data.content.assoMess.association,
                  assoCount: this.data.content.assoMess.card,
                  pusherCount: count,
                  match_id: this.data.content._id
                }
              }).then(res => {
                console.log(res);
                wx.showToast({
                  title: '提交成功',
                  icon: 'none',
                  image: '',
                  duration: 1500,
                  mask: false,
                  success: (result) => {

                  },
                  fail: () => { },
                  complete: () => { }
                });
              })
            },
          });
        }
      },
    });
    // console.log(e);
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