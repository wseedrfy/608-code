let db = wx.cloud.database()
let count = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    freshman: [],
    showModalStatus: false,
    add_content: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let res = wx.getStorageSync("args");
    count = Number(res.username)
    let school = res.school
    let nickName = res.nickName
    db.collection("associationMess").where({ count: count }).get().then(res => {
      if (res.data.length == 0) {
        db.collection("associationMess").add({
          data: {
            count: count,
            school: school,
            nickName: nickName,
            freshman: []
          }
        }).then(res => {
          this.setData({
            freshman: []
          })
        })
      }
      else {
        db.collection("associationMess").where({ count: count }).get().then(res => {
          this.setData({
            freshman: res.data[0].freshman
          })
        })
      }
    })
  },
  // 弹窗
  clickme() {
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
  // 输入内容
  content(e) {
    this.setData({
      add_content:e.detail.value
    })
  },
  // 提交
  add_content() {
    let content = this.data.add_content
    let id = Date.parse(new Date())
    if (content == "") {
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result) => {

        },
        fail: () => { },
        complete: () => { }
      });
    }
    else {
      let freshman = this.data.freshman
      freshman.push({
        content: content,
        id: id
      })
      db.collection("associationMess").where({ count: count }).update({
        data: {
          freshman: freshman
        }
      }).then(res => {
        wx.showToast({
          title: '添加成功',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
          success: (result) => {
            this.setData({
              content: "",
              freshman: freshman
            })
            this.hideModal()
          },
        });
      })
    }
  },
  // 删除内容
  delete(e){
    let id=e.currentTarget.dataset.item.id
    let freshman=this.data.freshman
    let newFreshman=[]
    for(let i=0;i<freshman.length;i++){
      if(freshman[i].id!=id){
        newFreshman.push(freshman[i])
      }
    }
    this.setData({
      freshman:newFreshman
    })
    wx.showToast({
      title: '删除成功',
      icon: 'none',
      image: '',
      duration: 1500,
      mask: false,
      success: (result)=>{
        db.collection("associationMess").where({count:count}).update({
          data:{
            freshman:newFreshman
          }
        })
      },
    });
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