// pages/new_association/new_association.js
let db = wx.cloud.database()
let type = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newType: [
      {
        name: "我是社团负责人",
        type: 0
      },
      {
        name: "我是机构负责人",
        type: 1
      }
    ],
    handleArr: [
      {
        id: 0,
        name: "姓名",
        placeholder: "负责人真实姓名"
      },
      {
        id: 1,
        name: "电话",
        placeholder: "负责人电话"
      },
      {
        id: 2,
        name: "名称",
        placeholder: "社团/机构名称"
      },
    ],
    htmlType: 0,//0为注册  1审核中  2为审核通过（管理员）
    showModle: false,
    userObj: "",
    showModalStatus:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getStor()
  },
  // 获取缓存信息
  getStor() {
    wx.getStorage({
      key: 'args',
      success: (res) => {
        let userObj = {
          username: res.data.username,
          school: res.data.school
        }
        this.setData({
          userObj: userObj
        })
        // 获取用户申请状态
        db.collection("applied_association").where({ userObj: userObj }).get().then(res => {
          console.log(res);
          if (res.data.length == 0) {
            this.setData({
              htmlType: 0
            })
          }
          else if (res.data[0].status == "审核中") {
            this.setData({
              htmlType: 1
            })
          }
          else if (res.data[0].status == "审核通过") {
            this.setData({
              htmlType: 2
            })
          }
        })
      },
    });
  },
  // 注册
  logon(e) {
    //0为社团  1为机构
    console.log(e);
    type = e.currentTarget.dataset.item.type
    this.setData({
      showModle: true,
    })
  },
  // 提交表单
  formSubmit(e) {
    // console.log(e);
    let arr = e.detail.value
    if (arr[0] == "" || arr[1] == "" || arr[2] == "") {
      wx.showToast({
        title: '请完善信息',
        icon: 'none',
        image: '',
        duration: 2000,
        mask: false,
        success: (result) => {

        },
      });
    }
    else {
      wx.showLoading({
        title: "提交中",
        mask: true,
        success: (result) => {
          let assoDetail = {
            name: arr[0],
            phone: arr[1],
            association: arr[2]
          }
          db.collection("applied_association").add({
            data: {
              userObj: this.data.userObj,
              assoDetail: assoDetail,
              type: type,
              status: "审核中"
            }
          }).then(res => {
            // console.log(res);
            wx.hideLoading();
            this.setData({
              showModle: false,
              htmlType: 1
            })
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