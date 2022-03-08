// pages/more/pages/2-DetailContent/2-DetailContent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  EditComment: function (e) { // 12-27 重构本函数
    let outIndex = e.currentTarget.dataset.bigindex
    let inIndex = e.currentTarget.dataset.small
    let edit_style = this.data.edit_style;
    let ShowDelCom = 0;
    this.data.Commentindex = outIndex
    this.data.inIndex = inIndex
    // picker动画样式
    if (edit_style == undefined || edit_style == 'edit_hide') {
      edit_style = 'edit_show'
    } else {
      edit_style = 'edit_hide'
    }
    console.log(edit_style);
    this.setData({
      edit_style: edit_style
    })
    setTimeout(() => {
      this.setData({
        comEdit: !this.data.comEdit,
      })
    }, 200);
    if (outIndex != undefined) {
      if(inIndex === undefined){
        let nickName = this.data.CommentList[outIndex].nickName; // 该评论的评论者
        let username = this.data.CommentList[outIndex].username; // 该评论的评论者学号
        let CommentContent = this.data.CommentList[outIndex].InputComment
      }else{
        let nickName = this.data.CommentList[outIndex].Reply[inIndex].nickName; // 该评论的评论者
        let username = this.data.CommentList[outIndex].Reply[inIndex].username; // 该评论的评论者学号
        let CommentContent = this.data.CommentList[outIndex].Reply[inIndex].InputComment
      }
      // 判断是否本人的评论 -> 凭学号
      if (username === args.username) {
        ShowDelCom = 1;
      }
      this.setData({
        ShowDelCom,
        CommentName: nickName,
        CommentContent: this.data.CommentList[outIndex].InputComment,
        isChecked: true,
      })
    }
    // this.data.ShowDelCom = 0;    //初始化
    outIndex = 0
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