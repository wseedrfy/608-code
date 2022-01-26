// pages/association/match_detail/match_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    changeArr:[
      {
        src:"../img/dan_change.png",
        name:"单选",
      },
      {
        src:"../img/duo_change.png",
        name:"多选",
      },
      {
        src:"../img/dan_change.png",
        name:"填空",
      },
    ],
    title:"",
    detail:"",
    tempContent:[],
    content:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  clickme(){
    this.showModal()
  },
  // 弹窗
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
  // 详情页
  goAdd(e){
    let type=e.currentTarget.dataset.item.name
    wx.navigateTo({
      url: '/pages/association/add_question/add_question?type='+type,
    })
    this.setData({
      content:""
    })
  },
  title(e){
    this.setData({
      title:e.detail.value
    })
  },
  detail(e){
    this.setData({
      detail:e.detail.value
    })
  },
  // 删除
  delete(e){
    // console.log(e);
    let index=e.currentTarget.dataset.index
    this.data.tempContent.splice(index,1)
    this.setData({
      tempContent:this.data.tempContent
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 编辑
  toFixed(e){
    // console.log(e);
    let content=e.currentTarget.dataset.item
    let type=content.type
    wx.navigateTo({
      url: '/pages/association/add_question/add_question?type='+type+'&fiexed='+true+'&content='+JSON.stringify(content),
      success: (result)=>{
        this.setData({
          content:""
        })
      },
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log(this.data.tempContent);
    if(this.data.content){
      this.data.tempContent.push(this.data.content)
      this.setData({
        tempContent:this.data.tempContent
      })
    }
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